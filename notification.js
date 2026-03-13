// UI NOTIFICATION SYSTEM
const UI_MODS = {
    showToast: function(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
            background: #22c55e; color: #000; padding: 12px 30px; border-radius: 50px;
            font-weight: 800; z-index: 100000; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        `;
        toast.innerText = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },

    showLoader: function() {
        const loader = document.createElement('div');
        loader.id = "global-loader";
        loader.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); z-index: 999999; display: flex;
            justify-content: center; align-items: center; color: #22c55e;
        `;
        loader.innerHTML = '<i class="fas fa-spinner fa-spin fa-3x"></i>';
        document.body.appendChild(loader);
    },

    hideLoader: function() {
        const loader = document.getElementById('global-loader');
        if(loader) loader.remove();
    }
};

window.UI_MODS = UI_MODS;
