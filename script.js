let isLoggedIn = false;
let currentUser = null;

// Load questions from localStorage
const stored = JSON.parse(localStorage.getItem('questions') || '[]');
const questions = stored;

function saveQuestions() {
  localStorage.setItem('questions', JSON.stringify(questions));
}

function renderQuestions(filter = 'all') {
  const container = document.getElementById('question-list');
  container.innerHTML = '';
  let list = questions;

  // Apply filters
  if (filter === 'unanswered') {
    list = list.filter(q => q.answers.length === 0);
  } else if (filter === 'newest') {
    list = [...list].reverse(); // Show latest first
  }

  if (list.length === 0) {
    container.innerHTML = '<p style="color: gray;">No questions found.</p>';
    return;
  }

  list.forEach(q => {
    const div = document.createElement('div');
    div.className = 'question';

    // 🆕 Update: Wrap question in clickable link
    div.innerHTML = `
      <a href="question-detail.html?id=${questions.indexOf(q)}" style="text-decoration: none; color: inherit; display: block;">
        <h3>${q.title}</h3>
        <div>${q.description}</div>
        <p><strong>${q.user}</strong> — ${q.answers.length} answers</p>
        <p><small>Tags: ${q.tags?.join(', ')}</small></p>
      </a>
    `;

    container.appendChild(div);
  });
}

// Modal close
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// Login/Register Modals
document.getElementById('openLogin').onclick = () => {
  document.getElementById('loginModal').classList.remove('hidden');
};

document.getElementById('openRegister').onclick = () => {
  document.getElementById('registerModal').classList.remove('hidden');
};

// Register
document.getElementById('submitRegister').onclick = () => {
  const user = {
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    gender: document.getElementById('gender').value,
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    password: document.getElementById('password').value
  };
  const confirm = document.getElementById('confirmPassword').value;

  if (!user.firstName || !user.lastName || !user.gender || !user.email || !user.phone || !user.password || !confirm) {
    return alert('Please fill all fields.');
  }

  if (user.password !== confirm) {
    return alert('Passwords do not match.');
  }

  currentUser = user;
  loginUser(user);
  closeModal('registerModal');
};

// Login
document.getElementById('submitLogin').onclick = () => {
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPassword').value;

  if (!currentUser || currentUser.email !== email || currentUser.password !== pass) {
    return alert('Invalid credentials.');
  }

  loginUser(currentUser);
  closeModal('loginModal');
};

// Set user as logged in
function loginUser(user) {
  isLoggedIn = true;

  // Show avatar
  document.getElementById('userAvatar').style.display = 'block';
  document.getElementById('userAvatar').innerText = user.gender === 'male' ? '👨‍💼' : '👩‍💼';

  // Enable Ask Question button
  const askBtn = document.getElementById('askBtn');
  askBtn.classList.remove('disabled');

  // Re-render questions (if needed)
  renderQuestions();
}

// Filter buttons (newest, unanswered, more)
document.querySelectorAll('.filter-btn').forEach(btn =>
  btn.onclick = () => renderQuestions(btn.dataset.filter)
);

// Initial load
renderQuestions();
