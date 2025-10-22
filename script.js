const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const bills = [
    Number(document.querySelector('.firstBill').value),
    Number(document.querySelector('.secondBill').value),
    Number(document.querySelector('.thirdBill').value),
  ];

  const resultsContainer = document.querySelector('.results');
  const summary = document.querySelector('.summary');

  // Clear old results
  resultsContainer.innerHTML = '';

  const tips = bills.map((bill) => {
    let tip = 0;

    if (bill >= 50 && bill <= 300) {
      tip = Math.round(bill * 0.15);
    } else {
      tip = Math.round(bill * 0.2);
    }

    return tip;
  });

  // Map bills and tips into divs
  bills.forEach((bill, index) => {
    const total = bill + tips[index];

    const card = document.createElement('div');
    card.classList.add('result-card', 'show');

    card.innerHTML = `
      <p>Your total bill is: <strong>₦${total}</strong></p>
      <p>Tip: <strong>₦${tips[index]}</strong></p>
    `;

    resultsContainer.appendChild(card);
  });

  // Summary section
  const totalBills = bills.reduce((a, b) => a + b, 0);
  const totalTips = tips.reduce((a, b) => a + b, 0);
  const grandTotal = totalBills + totalTips;

  summary.innerHTML = `
    Combined Total: <strong>₦${grandTotal}</strong> 
    (Bills: ₦${totalBills}, Tips: ₦${totalTips})
  `;
});
