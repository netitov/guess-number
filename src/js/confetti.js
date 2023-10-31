const confettiContainer = document.querySelector('.confetti-container');

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = `${Math.random() * 100}%`;
  confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
  confetti.style.backgroundColor = getRandomColor();
  confettiContainer.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 2000);
}

function getRandomColor() {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

export function renderConfetti() {
  for (let i = 0; i < 80; i++) {
    setTimeout(createConfetti, Math.random() * 2000);
  }
}


