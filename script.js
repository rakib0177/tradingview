 

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
    // পপ-আপের বদলে রিডাইরেক্ট মেথড ব্যবহার
    auth.signInWithRedirect(provider);
});

       auth.getRedirectResult()
    .then((result) => {
        if (result.user) {
            console.log("Redirect Login Success:", result.user.displayName);
            showDashboard(result.user);
        }
    })
    .catch((error) => {
        if (error.code !== 'auth/none') {
            console.error("Login Error:", error.message);
            alert("লগইন করতে সমস্যা হয়েছে: " + error.message);
        }
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
        // ইউজার লগইন থাকলে ড্যাশবোর্ড দেখাবে
        loginPage.classList.add('hidden');
        dashboardPage.classList.remove('hidden');
        if(navBar) navBar.classList.remove('hidden');

        document.getElementById('welcome-text').innerText = "Hi, " + user.displayName;
        document.getElementById('user-photo').src = user.photoURL;
    } else {
        // ইউজার লগআউট থাকলে
       loginPage.classList.remove('hidden');
        dashboardPage.classList.add('hidden');
        if(navBar) navBar.classList.add('hidden');
    }
});
// লগআউট বাটন ক্লিক ইভেন্ট
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        alert("Logged out successfully!");
        window.location.reload(); 
    });
});

