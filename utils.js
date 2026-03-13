// CORE PAYMENT & ORDER ENGINE
const Engine = {
    processPayment: function(name, price, link) {
        UI_MODS.showLoader();
        
        // একটা ইউনিক অর্ডার আইডি বানানো হচ্ছে
        const orderID = "IB" + Math.floor(Math.random() * 899999 + 100000);
        
        // তোর মেইলে অর্ডারের খবর পাঠানোর জন্য FormSubmit AJAX
        const formData = {
            OrderID: orderID,
            Service: name,
            Amount: "INR " + price,
            Target_Link: link,
            Time: new Date().toLocaleString()
        };

        fetch(`https://formsubmit.co/ajax/${CONFIG.adminEmail}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(() => {
            UI_MODS.hideLoader();
            UI_MODS.showToast("Opening UPI Apps...");
            
            // সরাসরি UPI পেমেন্ট লিঙ্ক
            const upiUrl = `upi://pay?pa=${CONFIG.adminUPI}&am=${price}&cu=INR&tn=Order_${orderID}_${name}`;
            
            // পেমেন্ট অ্যাপ ওপেন করা
            window.location.href = upiUrl;
        })
        .catch(err => {
            UI_MODS.hideLoader();
            alert("Connection Error! Please try again.");
        });
    }
};

window.Engine = Engine;
