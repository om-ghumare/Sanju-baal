const contentArea = document.getElementById("contentArea");

let step = 0;
let holdTimer = null;
let holdTriggered = false;
let clickCount = 0;

const SECRET_CLICK_THRESHOLD = 15;

const steps = [
  { type: "text", text: "Why did you tap so confidently? 😏 I respect that." },
  { type: "text", text: "If you're smiling right now, good. That was kind of the plan." },
  { type: "video", text: "This smile right here? Yeah. This one.", src: "happy.mp4" },
  { type: "teddy", text: "You don't need big gestures to know you're important." },
  { type: "photo", text: "This version of us? I like this one.", src: "us.jpeg" },
  { type: "text", text: "You're kind of unfairly cute sometimes." },
  { type: "photo", text: "Okay but this one? Don’t get mad 😌", src: "cute.jpeg" },
  { type: "text", text: "Being with you feels natural. Teasing you just makes it better 😏" },
  { type: "text", text: "Happy Valentine’s Day, My Sunshine 🤍" }
];



contentArea.addEventListener("click", () => {

  const onLastSlide = step >= steps.length;

  // 🔒 Secret logic ONLY after last slide
  if (onLastSlide && !holdTriggered) {
    clickCount++;

    popSingleHeart(); // one heart on last slide

    if (clickCount >= SECRET_CLICK_THRESHOLD) {
      triggerSecret();
      holdTriggered = true;
    }
    return;
  }

  // Normal slide progression
  if (step < steps.length) {
    popMultipleHearts(); // many hearts on normal slides
    render(steps[step]);
    step++;
  }
});

/* =======================
   AUDIO SYSTEM
======================= */
let musicStarted = false;
const bgMusic = document.getElementById("bgMusic");

document.body.addEventListener("click", () => {
  if (!musicStarted) {
    bgMusic.volume = 0.5; // Set reasonable volume
    bgMusic.play().catch(e => console.log("Audio play failed:", e));
    musicStarted = true;
  }
}, { once: true }); // Only runs once

function render(item) {
  contentArea.style.opacity = 0;

  setTimeout(() => {
    contentArea.innerHTML = "";

    if (item.type === "text") {
      contentArea.innerHTML = `<p class="message">${item.text}</p>`;
    }

    if (item.type === "teddy") {
      contentArea.innerHTML = `
        <div class="emoji">🧸</div>
        <p class="message">${item.text}</p>
      `;
    }

    if (item.type === "photo") {
      contentArea.innerHTML = `
        <p class="message">${item.text}</p>
        <div class="media-container">
          <img src="${item.src}" class="photo" />
        </div>
      `;
    }

    if (item.type === "video") {
      contentArea.innerHTML = `
        <p class="message">${item.text}</p>
        <div class="media-container">
          <video class="photo" autoplay muted loop playsinline>
            <source src="${item.src}" type="video/mp4">
          </video>
        </div>
      `;
    }

    contentArea.style.opacity = 1;
  }, 120);
}

/* =======================
   HEART SYSTEM
======================= */

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💗";
  heart.style.left = Math.random() * 90 + "%";
  heart.style.fontSize = (Math.random() * 10 + 18) + "px";
  // Append to card so it can overflow out of content area
  document.querySelector(".card").appendChild(heart);

  setTimeout(() => heart.remove(), 1200);
}

function popMultipleHearts() {
  for (let i = 0; i < 7; i++) {
    setTimeout(() => createHeart(), i * 60);
  }

  subtlePulse();
}

function popSingleHeart() {
  createHeart();
  subtlePulse();
}

function subtlePulse() {
  const card = document.querySelector(".card");
  card.style.transform = "scale(0.98)";
  setTimeout(() => {
    card.style.transform = "scale(1)";
  }, 100);
}

/* =======================
   HOLD FOR 3 SECONDS
   Only on last slide
======================= */

contentArea.addEventListener("touchstart", startHold);
contentArea.addEventListener("mousedown", startHold);
contentArea.addEventListener("touchend", cancelHold);
contentArea.addEventListener("mouseup", cancelHold);
contentArea.addEventListener("mouseleave", cancelHold);

function startHold() {
  const onLastSlide = step >= steps.length;
  if (!onLastSlide || holdTriggered) return;

  holdTimer = setTimeout(() => {
    triggerSecret();
    holdTriggered = true;
  }, 3000);
}

function cancelHold() {
  clearTimeout(holdTimer);
}

/* =======================
   SECRET REVEAL
======================= */

function triggerSecret() {

  document.body.style.background =
    "linear-gradient(135deg, #ff8ecf, #ffc1e3)";

  // MASSIVE heart explosion
  // for (let i = 0; i < 100; i++) {
  //   setTimeout(() => createHeart(), i * 30);
  // }
  confettiRain();



  document.querySelector(".card").innerHTML = `
    <h2 style="color:#ff2f7a;">Okay… you found it 🤍</h2>
    <div style="margin-top:15px; line-height:1.8; font-size: 16px; color: #444;">
      I don't need big speeches.<br>
      I just like this.<br>
      You laughing.<br>
      You being you.<br>
      <br>
      <strong>That's enough.</strong>
    </div>
    <div style="font-size:40px; margin-top:20px;">💗</div>
  `;
}

function confettiRain() {
  const colors = ["#fff", "#ff8ecf", "#ff2f7a", "#ffc1e3"];

  for (let i = 0; i < 250; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    // Random: Heart or Square?
    const isHeart = Math.random() > 0.5;

    if (isHeart) {
      confetti.innerText = Math.random() > 0.5 ? "🤍" : "💗";
      confetti.style.fontSize = (Math.random() * 10 + 10) + "px"; // 10px - 20px
    } else {
      // It's a square
      confetti.style.width = (Math.random() * 6 + 4) + "px"; // 4px - 10px
      confetti.style.height = confetti.style.width;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }

    // Random positioning
    confetti.style.left = Math.random() * 100 + "vw";

    // Random fall speed (faster for burst feel)
    confetti.style.animationDuration = (Math.random() * 2 + 1.5) + "s";

    // Random delay (short delay for burst)
    confetti.style.animationDelay = (Math.random() * 1.5) + "s";

    document.body.appendChild(confetti);

    // Cleanup confetti
    setTimeout(() => confetti.remove(), 4000); // Shorter cleanup
  }
}

function startHeartStage() {
  isHeartStage = true;
  clickCount = 0;
  contentArea.innerHTML = "";

  // Create SVG Heart
  // Two paths: one grey (background), one pink (foreground) clipped by a rect
  contentArea.innerHTML = `
    <p class="message">Fill my heart 🤍</p>
    <div class="heart-container" style="margin-top:20px; transform: scale(1.5); transition: transform 0.1s;">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <!-- Background Heart (Empty/Gray) -->
        <path d="M50 88.9L48.5 87.5C17.9 59.5 0 42.7 0 23.5C0 9.6 10.9 0 24.5 0C32.2 0 39.6 3.6 44.5 9.3C49.4 3.6 56.8 0 64.5 0C78.1 0 89 9.6 89 23.5C89 42.7 71.1 59.5 40.5 87.5L50 96L59.5 87.5" 
              fill="#eee" stroke="#ccc" stroke-width="2" transform="translate(5,5) scale(0.9)"/>
        
        <!-- Foreground Heart (Pink) -->
        <g clip-path="url(#heart-clip)">
           <path d="M50 88.9L48.5 87.5C17.9 59.5 0 42.7 0 23.5C0 9.6 10.9 0 24.5 0C32.2 0 39.6 3.6 44.5 9.3C49.4 3.6 56.8 0 64.5 0C78.1 0 89 9.6 89 23.5C89 42.7 71.1 59.5 40.5 87.5L50 96L59.5 87.5" 
              fill="#ff2f7a" transform="translate(5,5) scale(0.9)"/>
        </g>
        
        <defs>
          <clipPath id="heart-clip">
            <!-- This rect moves UP to reveal the heart -->
            <!-- Start at y=100 (empty) to y=0 (full) -->
            <rect id="fill-rect" x="0" y="100" width="100" height="100" />
          </clipPath>
        </defs>
      </svg>
    </div>
  `;
}

function handleHeartClick() {
  clickCount++;
  popSingleHeart();

  const totalClicks = 15;
  const percentage = Math.min((clickCount / totalClicks) * 100, 100);

  // Calculate y position: 100% -> 0%
  // At 0 clicks, y=100. At 15 clicks, y=0.
  const newY = 100 - percentage;

  const fillRect = document.getElementById("fill-rect");
  if (fillRect) {
    fillRect.setAttribute("y", newY);
  }

  // Pulse effect
  const container = document.querySelector(".heart-container");
  if (container) {
    container.style.transform = "scale(1.4)";
    setTimeout(() => container.style.transform = "scale(1.5)", 100);
  }

  if (clickCount >= totalClicks) {
    triggerSecret();
    holdTriggered = true;
  }
}