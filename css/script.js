function openPopup() {
  document.getElementById('project-popup').style.display = 'flex';
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
    // 1. Open the sidebar
    document.getElementById("mySidebar").style.width = "350px";
    
    // 2. Make overlay visible and "solid" to clicks
    const overlay = document.getElementById("sidebarOverlay");
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto"; 
    
    // 3. Lock the background (prevents scrolling and highlighting)
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
    form.addEventListener('submit', e => {
        e.preventDefault();
        const honeypot = document.getElementById('honeypot').value;
            if (honeypot !== "") {
                console.warn("Bot detected.");
                return;
            }
        console.log("Button clicked! Attempting to send data...");
        
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        const formData = new FormData(form);
        console.log("Data being sent:", Object.fromEntries(formData));
    console.log("SENDING THESE KEYS:", Array.from(new FormData(form).keys()));

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                console.log("Server responded!");
                return response.text();
            })
            .then(text => {
                if (true) {
                    submitBtn.innerText = "Sent! I'll be in touch.";
                    submitBtn.style.backgroundColor = "#2ecc71";
                    submitBtn.style.borderColor = "#2ecc71";

                    form.reset(); 

                    setTimeout(() => { 
                        submitBtn.innerText = "Send Inquiry & Book Call";
                        submitBtn.style.backgroundColor = "";
                        submitBtn.style.borderColor = "";
                        submitBtn.disabled = false;
                    }, 5000);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                submitBtn.innerText = "Error. Try again.";
                submitBtn.disabled = false;
            });
    });
}