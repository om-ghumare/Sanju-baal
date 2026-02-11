const contentArea = document.getElementById("contentArea");
const dots = document.querySelectorAll(".dot");

let step = 0;

const steps = [
  {
    type: "text",
    text: "Okay but why did you tap so confidently? 😏"
  },
  {
    type: "text",
    text: "I hope you’re smiling right now… because I am."
  },
  {
    type: "teddy",
    text: "So you don’t ever feel alone."
  },
  {
    type: "photo",
    text: "One of my favourite ‘us’ moments 🤍",
    src: "photo1.jpg" // replace with your photo
  },
  {
    type: "text",
    text: "Loving you feels easy. Annoying you is just a bonus."
  },
  {
    type: "text",
    text: "Happy Valentine’s Day, Sanju 🤍"
  }
];

contentArea.addEventListener("click", () => {
  popHeart();

  if (step >= steps.length) return;

  dots[step]?.classList.remove("active");
  step++;
  dots[step]?.classList.add("active");

  const current = steps[step - 1];
  render(current);
});

function render(item) {
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
}

function popHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💗";
  heart.style.left = Math.random() * 80 + "%";
  contentArea.appendChild(heart);

  setTimeout(() => heart.remove(), 1200);
}