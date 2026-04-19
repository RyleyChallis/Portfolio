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