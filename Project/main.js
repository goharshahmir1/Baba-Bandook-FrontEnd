// Initialize users array from localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

function handleSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const gallery = document.getElementById('gallery');
    const productCards = gallery.querySelectorAll('.product-card');
  
    productCards.forEach(card => {
      const productName = card.querySelector('.card-title').textContent.toLowerCase();
      if (productName.includes(searchInput)) {
        card.parentElement.style.display = ''; // Show the card
      } else {
        card.parentElement.style.display = 'none'; // Hide the card
      }
    });
  
    if (!searchInput) {
      alert('Please enter a product name to search.');
    }
  }
// Handle Registration
function handleRegistration(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const password = form.querySelector('input[name="password"]').value;
  const confirmPassword = form.querySelector('input[name="confirmPassword"]').value;

  // Validation
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return false;
  }

  if (users.find(user => user.email === email)) {
    alert('Email already registered!');
    return false;
  }

  // Add new user
  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  // Success message
  alert('Registration successful! Please login.');

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
  modal.hide();
  form.reset();

  return false;
}

// Handle Login
function handleLogin(event) {
  event.preventDefault();

  const form = event.target;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert(`Welcome back, ${user.name}!`);
    updateUI(true, user.name);

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide();
    form.reset();
  } else {
    alert('Invalid email or password!');
  }

  return false;
}
function updateUI(isLoggedIn, userName = '') {
    const navButtons = document.querySelector('.d-flex');
  
    if (isLoggedIn) {
      // Add the welcome message and logout button while keeping existing content
      navButtons.innerHTML = `
        <span class="text-light me-3">Welcome, ${userName}</span>
        <button onclick="handleLogout()" class="btn btn-outline-light">Logout</button>
      `;
  
      // Ensure the search bar remains visible
      const searchContainer = document.getElementById('searchContainer');
      if (searchContainer) {
        searchContainer.style.display = 'block';
      }
    } else {
      // Reset to login/register buttons
      navButtons.innerHTML = `
        <button class="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
        <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
      `;
    }
  }

// Handle Logout
function handleLogout() {
  localStorage.removeItem('currentUser');
  location.reload();
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    updateUI(true, currentUser.name);
  }

  // Load some sample products with descriptions
  const products = [
    { name: 'Glock 19', price: '$99.99', rating :'4.9 ' , image: './img3.png', description: 'A reliable and popular semi-automatic pistol.' },
    { name: 'AK-47', price: '$149.99',rating :'4.3 ' , image: './img2.png', description: 'A highly customizable assault rifle.' },
    { name: ' Tank', price: '$199.99',rating :'4.5 ' ,  image: './img1.png', description: 'A powerful and heavily armored  battle tank.' }
  ];

  const gallery = document.getElementById('gallery');
  products.forEach(product => {
    gallery.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card product-card"> 
          <img src="${product.image}" 
             class="product-image" 
             alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price}</p>
            <p class="card-text">${product.rating}</p> 
            <p class="card-text">${product.description}</p> 
          </div>
        </div>
      </div>
    `;
  });
});