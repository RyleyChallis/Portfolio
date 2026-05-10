function openPopup() {
    const popup = document.getElementById('project-popup');
    if (popup) {
        popup.style.display = 'flex'; // Must be flex to center the content
        console.log("Popup should now be flex");
    } else {
        console.error("Could not find element with ID project-popup");
    }
}

function closePopup() {
  document.getElementById('project-popup').style.display = 'none';
}

window.onclick = function(event) {
  let modal = document.getElementById('project-popup');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openNav() {
    document.getElementById("mySidebar").style.width = "350px";
    
    const overlay = document.getElementById("sidebarOverlay");
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto"; 
    
    document.body.style.overflow = "hidden"; 
    document.body.style.userSelect = "none";
}

function closeNav() {
    // 1. Close the sidebar
    document.getElementById("mySidebar").style.width = "0";
    
    // 2. Hide overlay and make it "transparent" to clicks
    const overlay = document.getElementById("sidebarOverlay");
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    
    // 3. Unlock the background
    document.body.style.overflow = "auto";
    document.body.style.userSelect = "auto";
}

const faqItems = document.querySelectorAll('.faq-card');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
});

function toggleDropdown(event) {
    event.stopPropagation();
    
    const dropdown = document.getElementById("sidebarDropdown");
    const arrow = event.currentTarget.querySelector('i');

    dropdown.classList.toggle("show");

    if (dropdown.classList.contains("show")) {
        arrow.style.transform = "rotate(90deg)";
    } else {
        arrow.style.transform = "rotate(0deg)";
    }
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbz1XmnObFAQP-H9R0Dy8NvcshK8uQLMNfatyky6jFk5HgTCZ5KMYkIbV3gvZpo5iYJR/exec';
const form = document.getElementById('booking-form');

if (!form) {
    console.error("CRITICAL: The browser cannot find an element with id='booking-form'");
} else {
  // 1. The Main Listener on the 'Send Inquiry' Button
form.addEventListener('submit', e => {
    e.preventDefault();

    // 2. VALIDATION CHECK
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let firstInvalidInput = null;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            if (!firstInvalidInput) firstInvalidInput = input;
            input.style.borderColor = "red";
        } else {
            input.style.borderColor = "";
        }
    });

    if (firstInvalidInput) {
        firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidInput.focus();
        return; // Stop here if form is incomplete
    }

    // 3. SENDING DATA
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            // 4. SUCCESS ACTIONS
            submitBtn.innerText = "Success!";
            submitBtn.style.backgroundColor = "#28a745";

            // Open the Success Popup
            openPopup();

            setTimeout(() => {
                closePopup();
                form.reset();
                
                // Reset button for next time
                submitBtn.innerText = "Send Inquiry";
                submitBtn.style.backgroundColor = "";
                submitBtn.disabled = false;
            }, 10000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            submitBtn.innerText = "Try Again";
            submitBtn.disabled = false;
        });
});
}