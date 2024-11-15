const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type Method
TypeWriter.prototype.type = function () {
  // Current index of word
  const current = this.wordIndex % this.words.length;
  // Get full text och current word
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
    typeSpeed /= 2;
  }

  // Check if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make paus at end
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

  setTimeout(() => this.type(), typeSpeed);
};

// // Typing effect as class
// class TypeWriter {
//   constructor(textElement, words, wait = 3000) {
//     this.textElement = textElement;
//     this.words = words;
//     this.txt = '';
//     this.wordIndex = 0;
//     this.wait = parseInt(wait, 10);
//     this.type();
//     this.isDeleting = false;
//   }
//   type() {
//     console.log('type');
//     const currentIndex = this.wordIndex % this.words.length;
//     console.log(currentIndex);
//     const fullText = this.words[currentIndex];
//     console.log(fullText);
//     console.log(this.isDeleting);
//     // Remove char when deleting, add char if not
//     if (this.isDeleting) {
//       this.text = fullText.substring(0, this.text.length - 1);
//     } else {
//       this.text = fullText.substring(0, this.text.length + 1);
//     }
//     this.textElement.innerHTML = `<span class='text'>${this.text}</span`;
//     let typeSpeed = 300;
//     // increase speed when deleting
//     if (this.isDeleting) {
//       typeSpeed /= 3;
//     }
//     // if word is complete, wait and then set deleting to true
//     if (!this.isDeleting && this.text === fullText) {
//       typeSpeed = this.wait;
//       this.isDeleting = true;
//       // if deletion is done, set deleting to false and switch to next word + decrease speed
//     } else if (this.isDeleting && this.text === '') {
//       this.isDeleting = false;
//       this.wordIndex++;
//       typeSpeed = 500;
//     }
//     // start over after going through all words
//     if (this.wordIndex === this.words.length) {
//       this.wordIndex = 0;
//     }
//     setTimeout(() => this.type(), typeSpeed);
//   }
// }

document.addEventListener('DOMContentLoaded', init);
function init() {
  const textElement = document.querySelector('.text-type');
  const words = JSON.parse(textElement.getAttribute('data-words'));
  const wait = textElement.getAttribute('data-wait');
  new TypeWriter(textElement, words, wait);
}

// // Typing effect as function
// function typeWriter(textElement, words, wait = 3000) {
//   let text = '';
//   let wordIndex = 0;
//   let isDeleting = false;

//   function type() {
//     const currentWord = words[wordIndex % words.length];

//     if (isDeleting) {
//       text = currentWord.substring(0, text.length - 1);
//     } else {
//       text = currentWord.substring(0, text.length + 1);
//     }

//     textElement.innerHTML = `<span class='text'>${text}</span>`;

//     let typeSpeed = 300;
//     if (isDeleting) {
//       typeSpeed /= 3;
//     }

//     if (!isDeleting && text === currentWord) {
//       typeSpeed = wait;
//       isDeleting = true;
//     } else if (isDeleting && text === '') {
//       isDeleting = false;
//       wordIndex++;
//       typeSpeed = 500;
//     }

//     if (wordIndex === words.length) {
//       wordIndex = 1;
//     }
//     console.log(words[0])

//     setTimeout(type(), typeSpeed);
//   }

//   type();
// }

// // document.querySelector('body').addEventListener('onload', () => {
// document.addEventListener('DOMContentLoaded', () => {
//   console.log('hej');
//   const textElement = document.querySelector('.text-type');
//   const words = JSON.parse(textElement.getAttribute('data-words'));
//   const wait = textElement.getAttribute('data-wait');
//   console.log(textElement);

//   typeWriter(textElement, words, wait);
// });

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

// Sticky menu background
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
