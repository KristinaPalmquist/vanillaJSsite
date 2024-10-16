// Hero typing effect
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
    // this.firstTime = true;
  }
  // Type Method
  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text  current word
    const fullTxt = this.words[current];
    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into Element
    this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span`;

    // Initial Type Speed
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 3;
    }

    // Check if word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }
    if (this.wordIndex === this.words.length) {
      this.wordIndex = 1;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);
// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init Typewriter
  new TypeWriter(txtElement, words, wait);
}

// Sticky menu background
window.addEventListener('scroll', function () {
  if (this.window.scrollY > 150) {
    this.document.querySelector('#main-nav').style.backgroundColor =
      'rgba(0,0,0,.7)';
  } else {
    this.document.querySelector('#main-nav').style.backgroundColor =
      'transparent';
  }
});

// Smooth scrolling on anchor tag click
$('#main-nav a').on('click', function (event) {
  if (this.hash !== '') {
    event.preventDefault();
    const hash = this.hash;

    console.log(event.currentTarget);
    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 120,
      },
      1000
    );
  }
});

// style navbar item on click
const navbarItems = document.querySelectorAll('#nav-content li');

navbarItems.forEach((item) => {
  item.addEventListener('click', () => {
    // navbarItems.forEach((item) => item.classList.remove('drop'));
    item.classList.add('drop');
    setTimeout(() => {
      item.classList.remove('drop');
    }, 1500);
  });
});
