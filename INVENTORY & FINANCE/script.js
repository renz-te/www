const inventory = [];
const finance = [];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 2
  }).format(value);
}

function addInventoryItem() {
  const name = document.getElementById('itemName').value.trim();
  const category = document.getElementById('itemCategory').value;
  const quantity = Number(document.getElementById('itemQuantity').value);
  const price = Number(document.getElementById('itemPrice').value);

  if (!name || quantity <= 0 || price < 0) {
    alert('Please enter a valid item name, quantity, and price.');
    return;
  }

  inventory.push({ name, category, quantity, price });
  document.getElementById('itemName').value = '';
  document.getElementById('itemQuantity').value = 1;
  document.getElementById('itemPrice').value = '0.00';
  updateInventoryTable();
}

function addFinanceTransaction() {
  const type = document.getElementById('transactionType').value;
  const amount = Number(document.getElementById('transactionAmount').value);
  const category = document.getElementById('transactionCategory').value.trim();
  const description = document.getElementById('transactionNote').value.trim();

  if (amount <= 0) {
    alert('Enter a positive amount for the transaction.');
    return;
  }

  finance.push({ type, amount, category: category || 'General', description: description || 'No note' });
  document.getElementById('transactionAmount').value = '0.00';
  document.getElementById('transactionCategory').value = '';
  document.getElementById('transactionNote').value = '';
  updateFinanceTable();
}

function updateInventoryTable() {
  const tbody = document.querySelector('#inventoryTable tbody');
  tbody.innerHTML = '';

  let totalValue = 0;
  inventory.forEach(item => {
    const value = item.quantity * item.price;
    totalValue += value;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(value)}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('inventoryCount').textContent = inventory.length;
  document.getElementById('inventoryValue').textContent = formatCurrency(totalValue);
}

function updateFinanceTable() {
  const tbody = document.querySelector('#financeTable tbody');
  tbody.innerHTML = '';

  let revenue = 0;
  let expenses = 0;

  finance.forEach(tx => {
    const row = document.createElement('tr');
    const amountCell = document.createElement('td');
    amountCell.textContent = formatCurrency(tx.amount);
    amountCell.style.color = tx.type === 'sale' || tx.type === 'income' ? 'var(--success)' : 'var(--danger)';

    row.innerHTML = `
      <td>${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</td>
    `;
    row.appendChild(amountCell);
    row.innerHTML += `<td>${tx.category}</td><td>${tx.description}</td>`;
    tbody.appendChild(row);

    if (tx.type === 'sale' || tx.type === 'income') {
      revenue += tx.amount;
    } else {
      expenses += tx.amount;
    }
  });

  const net = revenue - expenses;
  document.getElementById('totalRevenue').textContent = formatCurrency(revenue);
  document.getElementById('totalExpenses').textContent = formatCurrency(expenses);
  document.getElementById('netProfit').textContent = formatCurrency(net);
  document.getElementById('transactionCount').textContent = finance.length;
}

updateInventoryTable();
updateFinanceTable();
