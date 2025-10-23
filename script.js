const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const bills = [
    +document.querySelector('.firstBill').value,
    +document.querySelector('.secondBill').value,
    +document.querySelector('.thirdBill').value
  ];

  const resultsBox = document.querySelector('.results');
  const summary = document.querySelector('.summary');

  resultsBox.innerHTML = '';

  const tips = bills.map(bill => {
    let tip;
    if (bill >= 50 && bill <= 300) {
      tip = Math.round(bill * 0.15);
    } else {
      tip = Math.round(bill * 0.2);
    }
    return tip;
  });

  bills.forEach((bill, i) => {
    const total = bill + tips[i];
    const card = document.createElement('div');
    card.className = 'result-card show';
    card.innerHTML = `
      <p>Total bill: <strong>₦${total}</strong></p>
      <p>Tip: <strong>₦${tips[i]}</strong></p>
    `;
    resultsBox.appendChild(card);
  });

  const totalBills = bills.reduce((sum, val) => sum + val, 0);
  const totalTips = tips.reduce((sum, val) => sum + val, 0);
  const grandTotal = totalBills + totalTips;

  summary.innerHTML = `
    Total: <strong>₦${grandTotal}</strong> 
    (Bills: ₦${totalBills}, Tips: ₦${totalTips})
  `;
});
