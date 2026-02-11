const contentArea = document.getElementById("contentArea");

let step = 0;

let holdTriggered = false;
let clickCount = 0;



const steps = [
  { type: "text", text: "Why did you tap so confidently? 😏 I respect that." },
  { type: "text", text: "If you're smiling right now, good. That was kind of the plan." },
  { type: "video", text: "This smile right here? Yeah. This one.", src: "happy.mp4" },
  { type: "teddy", text: "You don't need big gestures to know you're important." },
  { type: "photo", text: "This version of us? I like this one.", src: "us.jpeg" },
  { type: "text", text: "You're kind of unfairly cute sometimes." },
  { type: "photo", text: "Okay but this one? Don’t get mad 😌", src: "cute.jpeg" },
  { type: "text", text: "Being with you feels natural. Teasing you just makes it better 😏" },
  { type: "final_heart", text: "Happy Valentine’s Day, My Sunshine 🤍" }
];



contentArea.addEventListener("click", () => {

  const onLastSlide = step >= steps.length;

  // 🔒 Secret logic ONLY after last slide
  if (onLastSlide && !holdTriggered) {
    popSingleHeart(); // Visual feedback (on background)
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

    if (item.type === "final_heart") {
      contentArea.innerHTML = `
        <p class="message">${item.text}</p>
        <div class="heart-wrapper" id="heartWrap" onclick="fillHeart(event)">
          <svg class="heart-svg" id="heartSVG" viewBox="0 0 512 512">
            <defs>
              <linearGradient id="softGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ffb3c1" />
                <stop offset="50%" stop-color="#e63946" />
                <stop offset="100%" stop-color="#a4133c" />
              </linearGradient>
            </defs>
            <path class="fill" id="heartFill" fill="url(#softGrad)" style="clip-path: inset(100% 0 0 0 round 30px);" d="M256 464l-16-14C118 336 48 272 48 192 48 128 96 80 160 80c40 0 80 24 96 56 16-32 56-56 96-56 64 0 112 48 112 112 0 80-70 144-192 258l-16 14z" />
            <path class="outline" d="M256 464l-16-14C118 336 48 272 48 192 48 128 96 80 160 80c40 0 80 24 96 56 16-32 56-56 96-56 64 0 112 48 112 112 0 80-70 144-192 258l-16 14z" />
          </svg>
          <div class="counter" id="heartCounter">Tap to fill my heart 🤍</div>
        </div>
      `;
      // Reset click count for this new interaction
      clickCount = 0;
    }

    contentArea.style.opacity = 1;
  }, 120);
}

// Global function for the heart interaction
window.fillHeart = function (event) {
  event.stopPropagation(); // Prevent card click event

  if (holdTriggered) return;

  clickCount++;

  // Calculate relative position to the CARD
  const card = document.querySelector(".card");
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Pop heart at click location
  createHeart(x, y);
  subtlePulse();

  const maxTaps = 15;
  const percent = 100 - (clickCount / maxTaps) * 100;

  const heartFill = document.getElementById("heartFill");

  if (heartFill) {
    heartFill.style.clipPath = `inset(${percent}% 0 0 0 round 30px)`;
  }

  if (clickCount >= maxTaps) {
    triggerSecret();
    holdTriggered = true;
  }
};

/* =======================
   HEART SYSTEM
======================= */

function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💗";

  if (x !== undefined && y !== undefined) {
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.bottom = "auto";
  } else {
    heart.style.left = Math.random() * 90 + "%";
  }

  heart.style.fontSize = (Math.random() * 10 + 18) + "px";
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
   SECRET REVEAL
======================= */

function triggerSecret() {

  document.body.style.background =
    "linear-gradient(135deg, #ff8ecf, #ffc1e3)";

  explode(); // Canvas explosion

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

/* =======================
   CANVAS EXPLOSION
======================= */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

// Pre-render emojis for performance
function createEmojiCanvas(emoji) {
  const c = document.createElement('canvas');
  // Size big enough for high-DPI
  c.width = 64;
  c.height = 64;
  const x = c.getContext('2d');
  x.font = "48px serif";
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillText(emoji, 32, 36);
  return c;
}

const heartCanvasWhite = createEmojiCanvas("🤍");
const heartCanvasPink = createEmojiCanvas("💗");

function explode() {
  const heartWrap = document.getElementById("heartWrap");
  const heartSVG = document.getElementById("heartSVG");

  // Bloom effect on wrapper
  if (heartWrap) heartWrap.classList.add("bloom");

  // Hide SVG instantly
  if (heartSVG) heartSVG.style.opacity = "0";

  // Calculate center. If wrapper is gone (because we replaced .card innerHTML), use center of screen
  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;

  if (heartWrap) {
    const rect = heartWrap.getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;
  }

  const colors = ["#ffffff", "#ffe5ec", "#ffb3c1", "#ff8fa3", "#e63946", "#a4133c"];

  // Micro-delay
  requestAnimationFrame(() => {
    const particles = [];

    for (let i = 0; i < 1000; i++) {
      let angle = Math.random() * 2 * Math.PI;

      // 60% "more at the top" logic:
      // Currently 50% are up (sin < 0) and 50% down (sin > 0).
      // If we want 60% up, we flip 20% of the downward ones to up.
      // (50% down * 0.2 = 10% flipped to up. Total up = 50% + 10% = 60%).
      if (Math.sin(angle) > 0 && Math.random() < 0.2) {
        angle = -angle;
      }

      // "Throw them at more distance" -> Increase speed
      const speed = 4.5 + Math.random() * 14.5; // Minute decrease from 5-20

      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 6, // Render size
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 220, // Increased slightly from 180
        maxLife: 220,
        type: Math.random() > 0.5 ? "heart" : "square",
        char: Math.random() > 0.5 ? "🤍" : "💗"
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        if (p.life <= 0) return;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // Gravity
        p.vx *= 0.99; // Drag
        p.vy *= 0.99;
        p.life--;

        const alpha = p.life / p.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;

        if (p.type === "square") {
          ctx.fillRect(p.x, p.y, p.size, p.size);
        } else {
          // Hearts use pre-rendered canvas (much faster than fillText)
          const img = p.char === "🤍" ? heartCanvasWhite : heartCanvasPink;
          // Draw image centered at p.x, p.y
          // p.size is small (4-10), so we scale the 64x64 image down
          // Actually let's start with a fixed size for hearts or scale them
          // Let's use p.size * 3 to make them visible enough compared to squares
          const s = p.size * 2.5;
          ctx.drawImage(img, p.x - s / 2, p.y - s / 2, s, s);
        }
      });

      ctx.globalAlpha = 1;

      if (alive) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    animate();
  });
}

