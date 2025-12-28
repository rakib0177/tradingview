// Firebase Configuration (Apnar nijer Firebase console theke copy kore ekhane boshun)
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_ID",
//     appId: "YOUR_APP_ID"
// };
// const firebaseConfig = {
//     apiKey: "AIzaSyCvW1eM0TD2afTBDWWqmSHksQbm3Esjl2I",
//     authDomain: "tradingviews-77.firebaseapp.com",
//     projectId: "tradingviews-77",
//     storageBucket: "tradingviews-77.firebasestorage.app",
//     messagingSenderId: "277785483742",
//     appId: "1:277785483742:web:eea123b02bf1d2f987e54f",
//     measurementId: "G-BTR2FS9EY5"
// };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

// DOM Elements
// const loginPage = document.getElementById('login-page');
// const dashboardPage = document.getElementById('dashboard-page');
// const navBar = document.getElementById('nav-bar');
// const welcomeText = document.getElementById('welcome-text');
// const userPhoto = document.getElementById('user-photo');

// Login Function
// document.getElementById('google-login-btn').addEventListener('click', () => {
//     auth.signInWithPopup(provider).then((result) => {
//         const user = result.user;
//         showDashboard(user);
//     }).catch((error) => {
//         console.error(error);
//         alert("Login Failed!");
//     });
// });

// function showDashboard(user) {
//     loginPage.classList.add('hidden');
//     dashboardPage.classList.remove('hidden');
//     navBar.classList.remove('hidden');

// আপনার Firebase Config এখানে বসান (Firebase Console থেকে পাবেন)
const firebaseConfig = {
    apiKey: "AIzaSyCvW1eM0TD2afTBDWWqmSHksQbm3Esjl2I",
    authDomain: "tradingviews-77.firebaseapp.com",
    projectId: "tradingviews-77",
    storageBucket: "tradingviews-77.firebasestorage.app",
    messagingSenderId: "277785483742",
    appId: "1:277785483742:web:eea123b02bf1d2f987e54f",
    measurementId: "G-BTR2FS9EY5"
};

// Firebase Initialize
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// লগইন বাটন ক্লিক ইভেন্ট
document.getElementById('google-login-btn').addEventListener('click', () => {
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log("Logged in as:", user.displayName);
            showDashboard(user);
        }).catch((error) => {
            console.error("Login Failed:", error.message);
            alert("লগইন করতে সমস্যা হয়েছে: " + error.message);
        });
});

// লগ আউট ফাংশন
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        location.reload(); // পেজ রিলোড করে লগইন স্ক্রিনে ফিরিয়ে নেবে
    });
});

// ড্যাশবোর্ড দেখানোর ফাংশন
function showDashboard(user) {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('dashboard-page').classList.remove('hidden');
    document.getElementById('nav-bar').classList.remove('hidden');

    // ইউজারের তথ্য আপডেট করা
    document.getElementById('welcome-text').innerText = "Hi, " + user.displayName;
    document.getElementById('user-photo').src = user.photoURL;
}

// ইউজার আগে থেকেই লগইন আছে কিনা চেক করা
auth.onAuthStateChanged((user) => {
    if (user) {
        showDashboard(user);
    }
});









// Gmail theke name ebong photo set kora
// welcomeText.innerText = `WELL COME, ${user.displayName}!`;
// userPhoto.src = user.photoURL;
// }

// Check if user is already logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        showDashboard(user);
    }
});


// ইউজারের স্টেট চেক করা (লগইন আছে কি না)
auth.onAuthStateChanged((user) => {
    const loginPage = document.getElementById('login-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const navBar = document.getElementById('nav-bar');

    if (user) {
        // ইউজার লগইন থাকলে
        loginPage.classList.add('hidden');
        dashboardPage.classList.remove('hidden');
        navBar.classList.remove('hidden');

        document.getElementById('welcome-text').innerText = "Hi, " + user.displayName;
        document.getElementById('user-photo').src = user.photoURL;
    } else {
        // ইউজার লগআউট থাকলে
        loginPage.classList.remove('hidden');
        dashboardPage.classList.add('hidden');
        navBar.classList.add('hidden');
    }
});
// লগআউট বাটন ক্লিক ইভেন্ট
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        alert("Logged out successfully!");
    });
});
