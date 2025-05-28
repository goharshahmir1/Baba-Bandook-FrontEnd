// Handle adding products
document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the product name and price from the input fields
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;

    // Get the table body where products are listed
    const productTableBody = document.getElementById('productTableBody');

    // Create a new row for the product
    const newRow = document.createElement('tr');
    const productId = productTableBody.children.length + 1; // Simple ID generation
    newRow.innerHTML = `
        <td>${productId}</td>
        <td>${productName}</td>
        <td>$${parseFloat(productPrice).toFixed(2)}</td>
        <td><button class="delete-button">Delete</button></td>
    `;

    // Append the new row to the table
    productTableBody.appendChild(newRow);

    // Clear the input fields
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';

    // Add delete functionality to the new row's delete button
    newRow.querySelector('.delete-button').addEventListener('click', function() {
        productTableBody.removeChild(newRow);
    });
});

// Handle adding users
document.getElementById('addUser Form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the user name and email from the input fields
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;

    // Get the table body where users are listed
    const userTableBody = document.getElementById('userTableBody');

    // Create a new row for the user
    const newRow = document.createElement('tr');
    const userId = userTableBody.children.length + 1; // Simple ID generation
    newRow.innerHTML = `
        <td>${userId}</td>
        <td>${userName}</td>
        <td>${userEmail}</td>
        <td><button class="delete-button">Delete</button></td>
    `;

    // Append the new row to the table
    userTableBody.appendChild(newRow);

    // Clear the input fields
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';

    // Add delete functionality to the new row's delete button
    newRow.querySelector('.delete-button').addEventListener('click', function() {
        userTableBody.removeChild(newRow);
    });
});

// Add delete functionality to existing product rows
document.querySelectorAll('#productTableBody .delete-button').forEach(button => {
    button.addEventListener('click', function() {
        const row = button.closest('tr');
        row.parentNode.removeChild(row);
    });
});

// Add delete functionality to existing user rows
document.querySelectorAll('#userTableBody .delete-button').forEach(button => {
    button.addEventListener('click', function() {
        const row = button.closest('tr');
        row.parentNode.removeChild(row);
    });
});