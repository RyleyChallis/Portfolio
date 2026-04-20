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
  document.getElementById("sidebarOverlay").style.display = "block";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("sidebarOverlay").style.display = "none";
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

  function toggleDropdown() {
    const dropdown = document.getElementById("sidebarDropdown");
    const btn = document.querySelector(".dropdown-btn");
    
    dropdown.classList.toggle("show");
    btn.classList.toggle("active");
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbxWdex5jNFpv5MCpyCMaXreI9-VIZs4QcyxVBO82aWEr1haMoqWWqflRldKXWpS_NJpPA/exec';
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
                if (text.includes("Success")) {
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