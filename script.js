let isTransferring = false;
const mainBtn = document.getElementById('mainBtn');
const msgTxt = document.getElementById('msg-txt');
const safetySlider = document.getElementById('safety-slider');
const limitDisplay = document.getElementById('limit-display');

// ১. ব্যাটারি মনিটর ইন্টিগ্রেশন
navigator.getBattery().then(battery => {
    
    function updateUI() {
        const level = (battery.level * 100).toFixed(0);
        document.getElementById('level-txt').innerText = level + "%";
        document.getElementById('charge-fill').style.height = level + "%";
        
        // ২. অটোমেটিক সেফটি শাটডাউন (সবচেয়ে গুরুত্বপূর্ণ)
        const safetyLimit = parseInt(safetySlider.value);
        if (isTransferring && level <= safetyLimit) {
            stopTransfer("Low Battery Safety Limit Reached");
        }
    }

    updateUI();
    battery.addEventListener('levelchange', updateUI);

    // ৩. ট্রান্সফার শুরু করার লজিক
    mainBtn.addEventListener('click', () => {
        if (!isTransferring) {
            startTransfer();
        } else {
            stopTransfer("Stopped by User");
        }
    });

    function startTransfer() {
        if (battery.level * 100 <= parseInt(safetySlider.value)) {
            alert("Current battery too low for safe transfer!");
            return;
        }
        
        isTransferring = true;
        mainBtn.innerText = "STOP TRANSFER";
        mainBtn.style.background = "#ff5252";
        msgTxt.innerText = "Secure Transfer Active...";
        msgTxt.style.color = "#00e676";
        
        // কাল্পনিক টেম্পারেচার মনিটর (সফটওয়্যার প্রোটোটাইপ হিসেবে)
        document.getElementById('temp-val').innerText = "31°C";
    }

    function stopTransfer(reason) {
        isTransferring = false;
        mainBtn.innerText = "INITIATE SECURE TRANSFER";
        mainBtn.style.background = "#38bdf8";
        msgTxt.innerText = reason;
        msgTxt.style.color = "white";
        document.getElementById('temp-val').innerText = "Normal";
    }
});

// লিমিট স্লাইডার আপডেট
safetySlider.oninput = function() {
    limitDisplay.innerText = this.value;
}
