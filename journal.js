document.addEventListener("DOMContentLoaded", displayEntries);

function saveEntry() {
    const text = document.getElementById("journalInput").value;
    if (text.trim() === "") return alert("please enter your journal !");

    const date = new Date().toLocaleString();
    const entry = { text, date };

    let entries = JSON.parse(localStorage.getItem("myJournal")) || [];
    entries.unshift(entry);
    localStorage.setItem("myJournal", JSON.stringify(entries));

    document.getElementById("journalInput").value = "";
    displayEntries();
}

function displayEntries() {
    const container = document.getElementById("entriesContainer");
    const entries = JSON.parse(localStorage.getItem("myJournal")) || [];
    container.innerHTML = "";

    entries.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("entry-item");
        div.innerHTML = `
            <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
            <div class="entry-date">${item.date}</div>
            <div class="entry-text">${item.text}</div>
        `;
        container.appendChild(div);
    });
}

// DELETE Function
function deleteEntry(index) {
    if (confirm("Tumi ki eti delete korte chao?")) {
        let entries = JSON.parse(localStorage.getItem("myJournal")) || [];
        entries.splice(index, 1);
        localStorage.setItem("myJournal", JSON.stringify(entries));
        displayEntries();
    }
}

// SEARCH Function
function searchEntries() {
    const term = document.getElementById("searchInput").value.toLowerCase();
    const items = document.querySelectorAll(".entry-item");

    items.forEach(item => {
        const content = item.innerText.toLowerCase();
        if (content.includes(term)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}






// image save 


async function saveEntry() {
    const text = document.getElementById("journalInput").value;
    const imgFile = document.getElementById("imageInput").files[0];
    if (text.trim() === "" && !imgFile) return alert("please enter text and image!");

    let imgData = "";
    if (imgFile) {
        imgData = await toBase64(imgFile);
    }

    const date = new Date().toLocaleString();
    const entry = { text, date, img: imgData };

    let entries = JSON.parse(localStorage.getItem("myJournal")) || [];
    entries.unshift(entry);
    localStorage.setItem("myJournal", JSON.stringify(entries));

    document.getElementById("journalInput").value = "";
    document.getElementById("imageInput").value = ""; // Clear file input
    displayEntries();
}

// Image View Function
function viewImage(src) {
    document.getElementById("imgModal").style.display = "flex";
    document.getElementById("modalImg").src = src;
}

// Convert image to String to save in LocalStorage
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function displayEntries() {
    const container = document.getElementById("entriesContainer");
    const entries = JSON.parse(localStorage.getItem("myJournal")) || [];
    container.innerHTML = "";

    entries.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("entry-item");
        div.innerHTML = `
            <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
            <div class="entry-date">${item.date}</div>
            <div class="entry-text">${item.text}</div>
            ${item.img ? `<img src="${item.img}" class="entry-img" onclick="viewImage('${item.img}')">` : ''}
        `;
        container.appendChild(div);
    });
}





