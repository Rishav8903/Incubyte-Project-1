let sweets = [];
let editId = null;
let loggedInUser = null;

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginForm = document.getElementById('loginForm');
const welcomeMsg = document.getElementById('welcomeMsg');
const sweetForm = document.getElementById('sweetForm');
const sweetsTable = document.getElementById('sweetsTable');

function updateAuthUI() {
  if (loggedInUser) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = '';
    loginForm.style.display = 'none';
    welcomeMsg.style.display = '';
    welcomeMsg.textContent = `Welcome, ${loggedInUser}!`;
    sweetForm.style.display = '';
    sweetsTable.style.display = '';
  } else {
    loginBtn.style.display = '';
    logoutBtn.style.display = 'none';
    loginForm.style.display = 'none';
    welcomeMsg.style.display = 'none';
    sweetForm.style.display = 'none';
    sweetsTable.style.display = 'none';
  }
}

loginBtn.onclick = () => {
  loginForm.style.display = '';
  loginBtn.style.display = 'none';
};

logoutBtn.onclick = () => {
  loggedInUser = null;
  updateAuthUI();
};

loginForm.onsubmit = function(e) {
  e.preventDefault();
  // Simple demo: username "admin", password "sweet"
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username === 'admin' && password === 'sweet') {
    loggedInUser = username;
    loginForm.reset();
    updateAuthUI();
  } else {
    alert('Invalid credentials!');
  }
};

function renderTable() {
  const tbody = document.getElementById('sweetsTable').getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
  sweets.forEach((sweet, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${sweet.name}</td>
      <td>${sweet.category}</td>
      <td>${sweet.price}</td>
      <td>${sweet.quantity}</td>
      <td>
        <button onclick="editSweet(${i})">Edit</button>
        <button onclick="purchaseSweet(${i})">Purchase</button>
        <button onclick="deleteSweet(${i})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById('sweetForm').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const price = Number(document.getElementById('price').value);
  const quantity = Number(document.getElementById('quantity').value);

  if (editId !== null) {
    sweets[editId] = { name, category, price, quantity };
    editId = null;
  } else {
    sweets.push({ name, category, price, quantity });
  }

  this.reset();
  renderTable();
};

window.editSweet = function(index) {
  const sweet = sweets[index];
  document.getElementById('name').value = sweet.name;
  document.getElementById('category').value = sweet.category;
  document.getElementById('price').value = sweet.price;
  document.getElementById('quantity').value = sweet.quantity;
  editId = index;
};

window.purchaseSweet = function(index) {
  if (sweets[index].quantity > 0) {
    sweets[index].quantity -= 1;
    alert(`Purchased 1 ${sweets[index].name}.`);
  } else {
    alert('Out of stock!');
  }
  renderTable();
};

window.deleteSweet = function(index) {
  if (confirm('Delete this sweet?')) {
    sweets.splice(index, 1);
    renderTable();
  }
};

renderTable();

window.deleteSweet = function(index) {
  if (confirm('Delete this sweet?')) {
    sweets.splice(index, 1);
    renderTable();
  }
};

updateAuthUI();
renderTable();

