// Countdown Timer Function
function startCountdown() {
    // Set the target date - 16th May of this year
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(currentYear, 4, 16, 0, 0, 0).getTime(); // May is month 4 (0-indexed)
    
    // If the date has already passed this year, set it to next year
    if (new Date().getTime() > targetDate) {
        const nextYearDate = new Date(currentYear + 1, 4, 16, 0, 0, 0).getTime();
        updateCountdown(nextYearDate);
    } else {
        updateCountdown(targetDate);
    }
    
    // Update countdown every second
    setInterval(() => {
        const currentDate = new Date().getTime();
        
        // Check if we need to update to next year
        if (currentDate > targetDate) {
            const nextYearDate = new Date(currentYear + 1, 4, 16, 0, 0, 0).getTime();
            updateCountdown(nextYearDate);
        } else {
            updateCountdown(targetDate);
        }
    }, 1000);
}

function updateCountdown(targetDate) {
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update DOM
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
    
    // If countdown is finished
    if (difference < 0) {
        document.getElementById('days').innerText = '0';
        document.getElementById('hours').innerText = '0';
        document.getElementById('minutes').innerText = '0';
        document.getElementById('seconds').innerText = '0';
        
        // Optional: Show birthday message
        showBirthdayMessage();
    }
}

// Show birthday message when countdown reaches zero
function showBirthdayMessage() {
    const countdownSection = document.querySelector('.countdown-section');
    const message = document.createElement('div');
    message.style.marginTop = '20px';
    message.style.fontSize = '1.5em';
    message.style.color = '#ff1493';
    message.style.fontWeight = 'bold';
    message.style.animation = 'pulse 1s infinite';
    message.innerText = '🎉 Happy Birthday Sara! 🎉';
    
    if (!countdownSection.querySelector('.birthday-message')) {
        message.className = 'birthday-message';
        countdownSection.appendChild(message);
    }
}

// Generate QR Code
function generateQRCode() {
    // Get the current page URL
    const pageUrl = window.location.href;
    
    // Create QR code
    const qrContainer = document.getElementById('qrcode');
    
    // Clear any existing QR code
    qrContainer.innerHTML = '';
    
    // Generate new QR code
    new QRCode(qrContainer, {
        text: pageUrl,
        width: 250,
        height: 250,
        colorDark: '#ff1493',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Smooth scroll for navigation
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add confetti effect (optional enhancement)
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = ['#ff1493', '#ff69b4', '#c71585', '#ffc0cb'][Math.floor(Math.random() * 4)];
    confetti.style.borderRadius = '50%';
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    let top = 0;
    let opacity = 1;
    
    const fall = setInterval(() => {
        top += Math.random() * 3 + 2;
        opacity -= 0.01;
        confetti.style.top = top + 'px';
        confetti.style.opacity = opacity;
        
        if (top > window.innerHeight) {
            clearInterval(fall);
            confetti.remove();
        }
    }, 30);
}

// Trigger confetti on page load
function triggerConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(createConfetti, i * 30);
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded! Starting countdown...');
    
    // Start countdown
    startCountdown();
    
    // Generate QR code
    generateQRCode();
    
    // Trigger confetti effect on load
    setTimeout(triggerConfetti, 500);
    
    // Add click handlers for smooth scrolling (if you add navigation links)
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });
    
    console.log('All ready! Sara\'s birthday website is live! 🎉');
});

// Regenerate QR code when window is resized (for responsiveness)
window.addEventListener('resize', function() {
    generateQRCode();
});
