// Function to generate a random unique ID
function generateUniqueId() {
    return Math.floor(Math.random() * 1000000000);
}

// Function to update the total records count
function updateTotalRecords() {
    const totalRecords = document.getElementById('totalRecords');
    const cardRecords = document.getElementById('cardRecords');
    totalRecords.textContent = cardRecords.childElementCount;
}

// Function to deactivate a card
function deactivateCard(cardId) {
    const card = document.getElementById(cardId);
    const statusElement = card.querySelector('.card-info p span.installed');
    statusElement.textContent = 'Deactivated';
    statusElement.style.color = 'red';

    // Change the button to "Activate"
    const deactivateButton = card.querySelector('.card-actions button:first-child');
    deactivateButton.textContent = 'Activate';
    deactivateButton.onclick = function() {
        activateCard(cardId);
    };
}

// Function to activate a card
function activateCard(cardId) {
    const card = document.getElementById(cardId);
    const statusElement = card.querySelector('.card-info p span.installed');
    statusElement.textContent = 'Installed';
    statusElement.style.color = 'green';

    // Change the button back to "Deactivate"
    const activateButton = card.querySelector('.card-actions button:first-child');
    activateButton.textContent = 'Deactivate';
    activateButton.onclick = function() {
        deactivateCard(cardId);
    };
}

// Function to delete a card
function deleteCard(cardId) {
    const card = document.getElementById(cardId);
    card.remove();
    updateTotalRecords();
}

// Function to add a new card
function addCard(name, department, role, expiration) {
    const cardRecords = document.getElementById('cardRecords');
    
    const uniqueId = generateUniqueId();
    const newCardId = `card${uniqueId}`;

    const cardHTML = `
        <div class="card" id="${newCardId}">
            <img src="https://via.placeholder.com/50" alt="${name}">
            <div class="card-info">
                <p><strong>${name}</strong></p>
                <p>${department} | ${role}</p>
                <p>Unique ID: <span class="unique-id">${uniqueId}</span></p>
                <p>Status: <span class="installed">Installed</span></p>
                <p>Expiration: <span contenteditable="true" class="editable">${expiration}</span></p>
                <p>Last Updated: <span class="last-updated">${new Date().toLocaleString()}</span></p>
            </div>
            <div class="card-actions">
                <button onclick="deactivateCard('${newCardId}')">Deactivate</button>
                <button onclick="editCard('${newCardId}')">Edit</button>
                <button onclick="deleteCard('${newCardId}')">Delete</button>
            </div>
        </div>
    `;

    cardRecords.insertAdjacentHTML('beforeend', cardHTML);
    updateTotalRecords();
}

// Modal handling
const modal = document.getElementById('addCardModal');
const addCardBtn = document.getElementById('addCardBtn');
const closeModalBtn = document.querySelector('.close');
const saveCardBtn = document.getElementById('saveCardBtn');

addCardBtn.onclick = function() {
    modal.style.display = 'block';
}

closeModalBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Save new card
saveCardBtn.onclick = function() {
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const role = document.getElementById('role').value;
    const expiration = document.getElementById('expiration').value;

    if (name && department && role && expiration) {
        addCard(name, department, role, expiration);
        modal.style.display = 'none';
        document.getElementById('name').value = '';
        document.getElementById('department').value = '';
        document.getElementById('role').value = '';
        document.getElementById('expiration').value = '';
    } else {
        alert('Please fill out all fields.');
    }
}

// Live Search functionality
document.querySelector('.search-bar input').oninput = function() {
    const searchTerm = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const name = card.querySelector('.card-info p strong').textContent.toLowerCase();
        const uniqueId = card.querySelector('.unique-id').textContent.toLowerCase();

        if (name.includes(searchTerm) || uniqueId.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });

    // Show all cards if search term is empty
    if (!searchTerm) {
        cards.forEach(card => {
            card.style.display = 'flex';
        });
    }
}

// Function to edit a card
function editCard(cardId) {
    const card = document.getElementById(cardId);
    const name = prompt("Enter new name:", card.querySelector('.card-info p strong').textContent);
    const department = prompt("Enter new department:", card.querySelector('.card-info p:nth-child(2)').textContent.split(" | ")[0]);
    const role = prompt("Enter new role:", card.querySelector('.card-info p:nth-child(2)').textContent.split(" | ")[1]);
    const expiration = prompt("Enter new expiration date:", card.querySelector('.editable').textContent);

    if (name && department && role && expiration) {
        card.querySelector('.card-info p strong').textContent = name;
        card.querySelector('.card-info p:nth-child(2)').textContent = `${department} | ${role}`;
        card.querySelector('.editable').textContent = expiration;
        card.querySelector('.last-updated').textContent = new Date().toLocaleString();
    }
}
