const contentArea = document.getElementById("contentArea");

let step = 0;
let holdTimer = null;
let holdTriggered = false;
let clickCount = 0;

const SECRET_CLICK_THRESHOLD = 12;

const steps = [
  { type: "text", text: "Why did you tap so confidently? 😏 I respect that." },
  { type: "text", text: "If you're smiling right now, good. That was kind of the plan." },
  { type: "video", text: "This smile right here? Yeah. This one.", src: "happy.mp4" },
  { type: "teddy", text: "You don't need big gestures to know you're important." },
  { type: "photo", text: "This version of us? I like this one.", src: "us.jpeg" },
  { type: "text", text: "You're kind of unfairly cute sometimes." },
  { type: "photo", text: "Okay but this one? Don’t get mad 😌", src: "cute.jpeg" },
  { type: "text", text: "Being with you feels natural. Teasing you just makes it better 😏" },
  { type: "text", text: "Happy Valentine’s Day, Sanju 🤍" }
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
        <img src="${item.src}" class="photo" />
      `;
    }

    if (item.type === "video") {
      contentArea.innerHTML = `
        <p class="message">${item.text}</p>
        <video class="photo" autoplay muted loop playsinline>
          <source src="${item.src}" type="video/mp4">
        </video>
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
  contentArea.appendChild(heart);

  setTimeout(() => heart.remove(), 1200);
}

function popMultipleHearts() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => createHeart(), i * 80);
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
  for (let i = 0; i < 40; i++) {
    setTimeout(() => createHeart(), i * 40);
  }

  document.querySelector(".card").innerHTML = `
    <h2 style="color:#ff2f7a;">Okay… you found it 🤍</h2>
    <p style="margin-top:15px; line-height:1.6;">
      I don't need big speeches.  
      I just like this.  
      You laughing.  
      You being you.  
      That's enough.
    </p>
    <div style="font-size:40px; margin-top:20px;">💗</div>
  `;
}