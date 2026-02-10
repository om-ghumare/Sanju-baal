document.addEventListener('DOMContentLoaded', function() {
    const loveButton = document.getElementById('loveButton');
    const loveMessage = document.getElementById('loveMessage');

    const messages = [
        "You make my heart skip a beat! 💓",
        "I'm so lucky to have you in my life! 🌹",
        "Every moment with you is magical! ✨",
        "You are my everything! 💕",
        "Happy Valentine's Day, my love! 💖",
        "You light up my world! 🌟",
        "Forever and always yours! 💑",
        "You are the best thing that ever happened to me! 🎉"
    ];

    loveButton.addEventListener('click', function() {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        loveMessage.textContent = randomMessage;
        loveMessage.classList.remove('hidden');

        // Create floating hearts
        for (let i = 0; i < 5; i++) {
            createFloatingHeart();
        }
    });

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(heart);

        // Remove the heart after animation
        setTimeout(() => {
            document.body.removeChild(heart);
        }, 3000);
    }
});