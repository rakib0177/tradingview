const firebaseConfig = {
    apiKey: "AIzaSyCvW1eM0TD2afTBDWWqmSHksQbm3Esjl2I",
    authDomain: "tradingviews-77.firebaseapp.com",
    projectId: "tradingviews-77",
    storageBucket: "tradingviews-77.firebasestorage.app",
    messagingSenderId: "277785483742",
    appId: "1:277785483742:web:eea123b02bf1d2f987e54f",
    measurementId: "G-BTR2FS9EY5"
};

// Initialize Firebase once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// ১. লগইন বাটন ক্লিক
document.getElementById('google-login-btn').addEventListener('click', () => {
    // Redirect পদ্ধতি সবচেয়ে নিরাপদ
    auth.signInWithRedirect(provider);
});

// ২. রিডাইরেক্ট হওয়ার পর ইউজারের তথ্য চেক করা
auth.getRedirectResult().then((result) => {
    if (result.user) {
        console.log("User logged in after redirect");
    }
}).catch((error) => {
    console.error("Redirect Login Error:", error.message);
});

// ৩. লগআউট বাটন
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.reload(); 
    });
});

// ৪. ইউজারের স্টেট পরিবর্তন হ্যান্ডেল করা (Main Dashboard Control)
auth.onAuthStateChanged((user) => {
    const loginPage = document.getElementById('login-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const navBar = document.getElementById('nav-bar');

    if (user) {
        // লগইন থাকলে
        loginPage.classList.add('hidden');
        dashboardPage.classList.remove('hidden');
        if (navBar) navBar.classList.remove('hidden');

        document.getElementById('welcome-text').innerText = "Hi, " + user.displayName;
        document.getElementById('user-photo').src = user.photoURL;
    } else {
        // লগআউট থাকলে
        loginPage.classList.remove('hidden');
        dashboardPage.classList.add('hidden');
        if (navBar) navBar.classList.add('hidden');
    }
});



