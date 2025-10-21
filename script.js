const form = document.querySelector('form');
const cards = document.querySelectorAll('.result-card');
const summary = document.querySelector('.summary');

function animateNumber(element, start, end, duration) {
  let startTime = null;
  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    element.textContent = '₦' + Math.floor(progress * (end - start) + start);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const bills = [
    Number(document.querySelector('.firstBill').value),
    Number(document.querySelector('.secondBill').value),
    Number(document.querySelector('.thirdBill').value)
  ];

  const tips = bills.map(b => (b >= 50 && b <= 300) ? Math.round(b * 0.15) : Math.round(b * 0.2));
  const totals = bills.map((b, i) => b + tips[i]);

  cards.forEach((card, i) => {
    card.innerHTML = `
      <p><strong>Bill ${i + 1}</strong></p>
      <p>Total: <span class="total"></span></p>
      <p>Tip: <span class="tip"></span></p>
    `;
    card.classList.add('show');

    const totalEl = card.querySelector('.total');
    const tipEl = card.querySelector('.tip');

    animateNumber(totalEl, 0, totals[i], 800);
    animateNumber(tipEl, 0, tips[i], 800);
  });

  const totalSpent = totals.reduce((a, b) => a + b, 0);
  const totalTip = tips.reduce((a, b) => a + b, 0);

  summary.innerHTML = `<i class="fa-solid fa-chart-line"></i> You spent ₦${totalSpent} in total and tipped ₦${totalTip}.`;
});
