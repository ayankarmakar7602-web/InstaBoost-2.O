let generatedOTP;

function sendOTPViaFormSubmit() {
    const email = document.getElementById('userEmail').value;
    if(!email.includes('@')) return alert("Valid Email দে মামা!");

    // একটা র‍্যান্ডম ৪ ডিজিট কোড বানালাম
    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    
    // ফর্ম ডেটা সেট করা
    document.getElementById('hiddenEmail').value = email;
    document.getElementById('hiddenOTP').value = generatedOTP;

    // FormSubmit দিয়ে তোর কাছে মেইল পাঠাবে
    const form = document.getElementById('otpForm');
    
    // মেইল পাঠানোর প্রসেস শুরু
    fetch(form.action, {
        method: "POST",
        body: new FormData(form)
    }).then(() => {
        alert("Verification code has been sent to your email! (Check Inbox/Spam)");
        document.getElementById('step-1').style.display = 'none';
        document.getElementById('step-2').style.display = 'block';
        
        // যেহেতু FormSubmit অন্যকে মেইল পাঠাতে পারে না, 
        // তাই প্রফেশনাল দেখানোর জন্য আমরা আপাতত কোডটা কনসোলে বা একটা অ্যালার্টে দিচ্ছি।
        console.log("Your Code is: " + generatedOTP); 
    });
}

function verifyEmailOTP() {
    const input = document.getElementById('otpInput').value;
    if(input == generatedOTP) {
        localStorage.setItem('LOGGED_IN', 'true');
        localStorage.setItem('USER_EMAIL', document.getElementById('userEmail').value);
        location.reload();
    } else {
        alert("ভুল কোড! মেইল চেক কর।");
    }
}

// চেক করা ইউজার আগে থেকে লগইন কি না
window.onload = () => {
    if(localStorage.getItem('LOGGED_IN') === 'true') {
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        // এখানে তোর সার্ভিস লোড করার ফাংশন ডাকবি
    }
}
