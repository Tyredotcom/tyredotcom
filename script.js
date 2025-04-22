// script.js (excluding auth)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue, push } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { app } from "./firebase.js";

const db = getDatabase(app);

// Feedback and comments
const feedback = document.getElementById('feedback-form');
if (feedback) {
  feedback.addEventListener('submit', function (event) {
    event.preventDefault();

    const feedbackMessage = document.getElementById('feedback-message').value.trim();
    if (feedbackMessage === "") {
      alert("Please enter your comment before submitting.");
      return;
    }

    const commentSection = document.getElementById('comments-section');
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <p>${feedbackMessage}</p>
        <span class="comment-time">${new Date().toLocaleString()}</span>
      `;

    commentSection.appendChild(newComment);
    document.getElementById('feedback-message').value = "";

    const newCommentRef = push(ref(db, 'comments'));
    set(newCommentRef, {
      text: feedbackMessage,
      timestamp: Date.now()
    });
  });
}

// Load comments
const commentSection = document.getElementById('comments-section');
onValue(ref(db, 'comments'), (snapshot) => {
  if (!commentSection) return;
  commentSection.innerHTML = "";
  snapshot.forEach(childSnapshot => {
    const comment = childSnapshot.val();
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
      <p>${comment.text}</p>
      <span class="comment-time">${new Date(comment.timestamp).toLocaleString()}</span>
    `;
    commentSection.appendChild(newComment);
  });
});

// Navbar toggle
const hamburger = document.getElementById('hamburger');
const navUl = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav ul li a');

if (hamburger && navUl) {
  hamburger.addEventListener('click', () => {
    navUl.classList.toggle('show');
  });
}

if (navLinks.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navUl) navUl.classList.remove('show');
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
  const nav = document.querySelector('nav');
  const hamburger = document.getElementById('hamburger');
  const navUl = document.querySelector('nav ul');
  const isClickInsideNav = nav && nav.contains(event.target);
  const isClickOnHamburger = hamburger && hamburger.contains(event.target);
  if (!isClickInsideNav && !isClickOnHamburger && navUl?.classList.contains('show')) {
    navUl.classList.remove('show');
  }
});