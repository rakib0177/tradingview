const firebaseConfig = {
    apiKey: "AIzaSyCvW1eM0TD2afTBDWWqmSHksQbm3Esjl2I",
    authDomain: "tradingviews-77.firebaseapp.com",
    projectId: "tradingviews-77",
    storageBucket: "tradingviews-77.firebasestorage.app",
    messagingSenderId: "277785483742",
    appId: "1:277785483742:web:eea123b02bf1d2f987e54f",
    measurementId: "G-BTR2FS9EY5"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// ১. লগইন বাটন ক্লিক ইভেন্ট (Popup মেথড গিটহাবের জন্য সহজে কাজ করে)
const loginBtn = document.getElementById('google-login-btn');
if (loginBtn) {
    loginBtn.onclick = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                console.log("Login Successful:", result.user.displayName);
                // আলাদা করে রিডাইরেক্ট করার দরকার নেই, onAuthStateChanged এটি হ্যান্ডেল করবে
            })
            .catch((error) => {
                console.error("Login Error:", error.message);
                alert("লগইন সমস্যা: " + error.message);
            });
    };
}

// ২. লগআউট বাটন ইভেন্ট
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.onclick = () => {
        auth.signOut().then(() => {
            console.log("Logged out");
        });
    };
}

// ৩. মেইন ফাংশন: ইউজারের অবস্থার পরিবর্তন পর্যবেক্ষণ করা
auth.onAuthStateChanged((user) => {
    const loginPage = document.getElementById('login-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const navBar = document.getElementById('nav-bar');

    if (user) {
        // ইউজার লগইন থাকলে
        loginPage.classList.add('hidden');
        dashboardPage.classList.remove('hidden');
        if (navBar) navBar.classList.remove('hidden');

        document.getElementById('welcome-text').innerText = "Hi, " + user.displayName;
        document.getElementById('user-photo').src = user.photoURL;
    } else {
        // ইউজার লগআউট থাকলে
        loginPage.classList.remove('hidden');
        dashboardPage.classList.add('hidden');
        if (navBar) navBar.classList.add('hidden');
    }
});





