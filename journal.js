// ১. ফায়ারবেস ডেটাবেস (Firestore) ইনিশিয়ালাইজ করা
const db = firebase.firestore();

// ২. জার্নাল সেভ করার ফাংশন
async function saveEntry() {
    const user = firebase.auth().currentUser;
    if (!user) return alert("দয়া করে আগে লগইন করুন!");

    const text = document.getElementById("journalInput").value;
    const imgFile = document.getElementById("imageInput").files[0];

    if (text.trim() === "" && !imgFile) return alert("কিছু লিখুন অথবা ছবি দিন!");

    let imgData = "";
    if (imgFile) {
        // ইমেজকে টেক্সটে (Base64) রূপান্তর করা
        imgData = await toBase64(imgFile);
    }

    const entry = {
        userId: user.uid, // ইউজারের ইউনিক আইডি যাতে ডাটা আলাদা থাকে
        text: text,
        date: new Date().toLocaleString(),
        img: imgData,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // সময় অনুযায়ী সাজানোর জন্য
    };

    try {
        // 'journals' নামে কালেকশনে ডাটা সেভ করা
        await db.collection("journals").add(entry);
        document.getElementById("journalInput").value = "";
        document.getElementById("imageInput").value = "";
        alert("জার্নাল সেভ হয়েছে!");
        displayEntries(); // নতুন তালিকা দেখানো
    } catch (error) {
        console.error("Error saving entry: ", error);
        alert("সেভ করতে সমস্যা হয়েছে!");
    }
}

// ৩. ডাটা দেখানোর ফাংশন (Firestore থেকে অনলাইনে আসবে)
function displayEntries() {
    const user = firebase.auth().currentUser;
    if (!user) return;

    const container = document.getElementById("entriesContainer");

    // শুধু বর্তমান ইউজারের ডাটা ফিল্টার করে আনা
    db.collection("journals")
        .where("userId", "==", user.uid)
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
            container.innerHTML = "";
            querySnapshot.forEach((doc) => {
                const item = doc.data();
                const docId = doc.id; // ডিলিট করার জন্য ইউনিক আইডি

                const div = document.createElement("div");
                div.classList.add("entry-item");
                div.innerHTML = `
                    <button class="delete-btn" onclick="deleteEntry('${docId}')">Delete</button>
                    <div class="entry-date">${item.date}</div>
                    <div class="entry-text">${item.text}</div>
                    ${item.img ? `<img src="${item.img}" class="entry-img" onclick="viewImage('${item.img}')">` : ''}
                `;
                container.appendChild(div);
            });
        })
        .catch((error) => {
            console.error("Error getting entries: ", error);
        });
}

// ৪. ডিলিট ফাংশন
async function deleteEntry(docId) {
    if (confirm("আপনি কি এটি ডিলিট করতে চান?")) {
        try {
            await db.collection("journals").doc(docId).delete();
            displayEntries();
        } catch (error) {
            alert("ডিলিট করতে সমস্যা হয়েছে!");
        }
    }
}

// ৫. ইমেজ কনভার্টার (Base64)
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

// ৬. পেজ লোড হলে বা লগইন থাকলে ডাটা দেখাও
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        displayEntries();
    } else {
        const container = document.getElementById("entriesContainer");
        if (container) container.innerHTML = "লগইন করুন আপনার জার্নাল দেখতে।";
    }
});






