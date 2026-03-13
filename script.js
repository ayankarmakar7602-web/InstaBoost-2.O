// Global State
let selectedPlan = null;

// Plans Load করার ফাংশন
function showPlans(category) {
    document.getElementById('category-menu').style.display = 'none';
    document.getElementById('plans-view').style.display = 'block';
    
    const renderArea = document.getElementById('plans-render-area');
    renderArea.innerHTML = "";
    
    // SMM_DATA আসবে services.js থেকে
    const items = SMM_DATA[category];
    
    items.forEach(item => {
        renderArea.innerHTML += `
            <div class="plan-item" onclick="openOrderModal('${item.name}', ${item.price})">
                <div class="plan-info">
                    <h4>${item.name}</h4>
                    <small style="color:#666">Instant Completion</small>
                </div>
                <div class="plan-price">₹${item.price}</div>
            </div>
        `;
    });
}

function closePlans() {
    document.getElementById('category-menu').style.display = 'grid';
    document.getElementById('plans-view').style.display = 'none';
}

function openOrderModal(name, price) {
    selectedPlan = { name, price };
    document.getElementById('modal-plan-name').innerText = name;
    document.getElementById('modal-price').innerText = price;
    document.getElementById('order-modal').style.display = 'flex';
}

function closeOrderModal() {
    document.getElementById('order-modal').style.display = 'none';
    document.getElementById('payment-zone').style.display = 'none';
    document.getElementById('next-btn').style.display = 'block';
    document.getElementById('target-link').value = "";
}

function proceedToPay() {
    const link = document.getElementById('target-link').value;
    if(link.length < 5) {
        alert("Please enter a valid Instagram link!");
        return;
    }
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('payment-zone').style.display = 'block';
}

function startPayment() {
    const link = document.getElementById('target-link').value;
    // Engine আসবে utils.js থেকে
    if(window.Engine) {
        Engine.processPayment(selectedPlan.name, selectedPlan.price, link);
    } else {
        alert("Payment System Loading... Try again!");
    }
}

function openHelp() {
    window.location.href = "https://ig.me/m/insta.boost._in";
}
