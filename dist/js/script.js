// Typing effect class
class TypeWriter {
  constructor(textElement, words, wait = 3000) {
    this.textElement = textElement;
    this.words = words;
    this.text = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const currentIndex = this.wordIndex % this.words.length;
    const fullText = this.words[currentIndex];
    // Remove char if deleting, add char if not
    if (this.isDeleting) {
      this.text = fullText.substring(0, this.text.length - 1);
    } else {
      this.text = fullText.substring(0, this.text.length + 1);
    }
    this.textElement.innerHTML = `<span class='text'>${this.text}</span`;
    let typeSpeed = 300;
    if (this.isDeleting) {
      // if deleting - increase speed
      typeSpeed /= 3;
    }
    if (!this.isDeleting && this.text === fullText) {
      // if word is complete - wait + then set deleting to true
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === '') {
      // if deletion is done - set deleting to false + switch to next word + decrease speed
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }
    // start over after going through all words
    if (this.wordIndex === this.words.length) {
      this.wordIndex = 0;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

window.addEventListener('load', init);
// document.addEventListener('DOMContentLoaded', init);
function init() {
  const textElement = document.querySelector('.text-type');
  const words = JSON.parse(textElement.getAttribute('data-words'));
  const wait = textElement.getAttribute('data-wait');
  new TypeWriter(textElement, words, wait);
}

//Light/Dark Switch
const toggle = document.querySelector('.toggle');
const knob = document.querySelector('.knob');
const icon = document.querySelector('.icon');
const body = document.body;

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');

  if (toggle.classList.contains('active')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
});

// Menu changes on scroll
window.addEventListener('scroll', function () {
  if (this.window.scrollY > 150) {
    this.document.querySelector('#main-nav').classList.add('scrolled');
  } else {
    this.document.querySelector('#main-nav').classList.remove('scrolled');
  }
});

// Style navbar item on click
document.querySelectorAll('#nav-bar a').forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.add('drop');
    setTimeout(() => {
      item.classList.remove('drop');
    }, 1500);
  });
});
