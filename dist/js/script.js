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

// Typing effect
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span`;
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 3;
    }
    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }
    if (this.wordIndex === this.words.length) {
      this.wordIndex = 1;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener('DOMContentLoaded', init);
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  new TypeWriter(txtElement, words, wait);
}

// Sticky menu background
window.addEventListener('scroll', function () {
  if (this.window.scrollY > 150) {
    this.document.querySelector('#main-nav').classList.add('scrolled');
  } else {
    this.document.querySelector('#main-nav').classList.remove('scrolled');
  }
});

// Smooth scrolling on anchor tag click
$('#main-nav a').on('click', function (event) {
  if (this.hash !== '') {
    event.preventDefault();
    const hash = this.hash;
    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 150,
      },
      1000
    );
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
