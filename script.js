// Simulasi penyimpanan data (localStorage untuk persistensi)
let userData = JSON.parse(localStorage.getItem('userData')) || {};
let currentRoom = localStorage.getItem('currentRoom') || '';
let messages = JSON.parse(localStorage.getItem('messages')) || {}; // Simulasi pesan per room

// Fungsi untuk menyimpan data diri
function saveData() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const hobby = document.getElementById('hobby').value;
    const workSchool = document.getElementById('work-school').value;
    if (name && age && hobby && workSchool) {
        userData = { name, age, hobby, workSchool };
        localStorage.setItem('userData', JSON.stringify(userData));
        document.getElementById('data-form').classList.add('hidden');
        document.getElementById('creator-greet').classList.remove('hidden');
    } else {
        alert('Please fill all fields!');
    }
}

// Fungsi untuk lanjut ke kode room
function nextToRoom() {
    document.getElementById('creator-greet').classList.add('hidden');
    document.getElementById('room-code').classList.remove('hidden');
}

// Fungsi untuk masuk chat
function enterChat() {
    const roomCode = document.getElementById('room-code-input').value;
    if (roomCode) {
        currentRoom = roomCode;
        localStorage.setItem('currentRoom', currentRoom);
        if (!messages[currentRoom]) messages[currentRoom] = [];
        localStorage.setItem('messages', JSON.stringify(messages));
        document.getElementById('current-room').textContent = currentRoom;
        document.getElementById('room-code').classList.add('hidden');
        document.getElementById('chat-room').classList.remove('hidden');
        loadMessages();
    } else {
        alert('Please enter a room code!');
    }
}

// Fungsi untuk mengirim pesan
function sendMessage() {
    const messageText = document.getElementById('message-input').value;
    if (messageText && currentRoom) {
        const message = {
            sender: userData.name,
            text: messageText,
            timestamp: new Date().toLocaleTimeString()
        };
        messages[currentRoom].push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
        document.getElementById('message-input').value = '';
        loadMessages();
        // Simulasi notifikasi (dalam real app, ini akan dikirim ke server untuk real-time)
        alert('Message sent! (In real app, this would notify other users)');
    }
}

// Fungsi untuk memuat pesan
function loadMessages() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    if (messages[currentRoom]) {
        messages[currentRoom].forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message');
            msgDiv.textContent = `${msg.sender} (${msg.timestamp}): ${msg.text}`;
            messagesDiv.appendChild(msgDiv);
        });
    }
}

// Fungsi logout
function logout() {
    localStorage.clear();
    location.reload(); // Reload untuk reset
}

// Inisialisasi: Jika data sudah ada, langsung ke chat jika room ada
if (userData.name && currentRoom) {
    document.getElementById('data-form').classList.add('hidden');
    document.getElementById('creator-greet').classList.add('hidden');
    document.getElementById('room-code').classList.add('hidden');
    document.getElementById('chat-room').classList.remove('hidden');
    document.getElementById('current-room').textContent = currentRoom;
    loadMessages();
} else if (userData.name) {
    document.getElementById('data-form').classList.add('hidden');
    document.getElementById('creator-greet').classList.remove('hidden');
}
