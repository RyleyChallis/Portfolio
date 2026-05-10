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
  form.addEventListener('submit', e => {
      e.preventDefault(); 
      openPopup(); 
  });

  function sendDataToSheet() {
      const submitBtn = document.getElementById('final-confirm-btn');
      submitBtn.innerText = "Sending...";
      submitBtn.disabled = true;

      const formData = new FormData(form);

      fetch(scriptURL, { method: 'POST', body: formData })
          .then(response => {
        submitBtn.innerText = "Success!";
        submitBtn.style.backgroundColor = "#28a745"; // Success green
        submitBtn.style.color = "#ffffff";
        submitBtn.style.borderColor = "#28a745";

        setTimeout(() => {
            closePopup();
            form.reset();
            
            submitBtn.innerText = "Confirm and Send";
            submitBtn.style.backgroundColor = "";
            submitBtn.style.color = "";
            submitBtn.style.borderColor = "";
            submitBtn.disabled = false;
        }, 2000); 
    })
  }
}