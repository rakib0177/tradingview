// Firebase Configuration
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

// ১. লগইন বাটন ক্লিক (Redirect Method - এটি মোবাইল ও গিটহাবের জন্য বেস্ট)
const loginBtn = document.getElementById('google-login-btn');
if (loginBtn) {
    loginBtn.onclick = () => {
        console.log("Login button clicked...");
        auth.signInWithRedirect(provider);
    };
}

// ২. লগআউট বাটন ক্লিক
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.onclick = () => {
        auth.signOut().then(() => {
            window.location.reload();
        });
    };
}

// ৩. লগইন স্টেট চেক (এই একটি ফাংশনই সব হ্যান্ডেল করবে)
auth.onAuthStateChanged((user) => {
    const loginPage = document.getElementById('login-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const navBar = document.getElementById('nav-bar');

    if (user) {
        console.log("User Logged In:", user.displayName);
        if(loginPage) loginPage.classList.add('hidden');
        if(dashboardPage) dashboardPage.classList.remove('hidden');
        if(navBar) navBar.classList.remove('hidden');

        document.getElementById('welcome-text').innerText = "Hi, " + user.displayName;
        document.getElementById('user-photo').src = user.photoURL;
    } else {
        console.log("No User Logged In.");
        if(loginPage) loginPage.classList.remove('hidden');
        if(dashboardPage) dashboardPage.classList.add('hidden');
        if(navBar) navBar.classList.add('hidden');
    }
});




