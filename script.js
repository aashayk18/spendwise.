document.getElementById('hamburger').addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('open');
});

window.addEventListener('DOMContentLoaded', function () {
  var sidebar = document.getElementById('sidebar');
  var windowHeight = window.innerHeight;
  var sidebarHeight = windowHeight / 2;
  sidebar.style.height = sidebarHeight + 'px';
  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;
});

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('sidebar--active');
}

document.getElementById('budget-form').addEventListener('submit', function (event) {
  event.preventDefault();

  var dailyBudget = parseInt(document.getElementById('daily-budget').value);
  localStorage.setItem('dailyBudget', dailyBudget);

  document.getElementById('budget-form').reset();

  window.location.href = 'expenses.html';

  document.getElementById('daily-budget-display').textContent = dailyBudget;

  resetAccumulatedExcessDeficit();

});

document.getElementById('expense-form').addEventListener('submit', function (event) {
  event.preventDefault();

  var expenseAmount = parseInt(document.getElementById('expense-amount').value);
  var dailyBudget = parseInt(localStorage.getItem('dailyBudget'));
  var currentDate = new Date();
  var day = String(currentDate.getDate()).padStart(2, '0');
  var month = String(currentDate.getMonth() + 1).padStart(2, '0');
  var year = String(currentDate.getFullYear()).slice(-2);
  var formattedDate = day + "/" + month + "/" + year;

  document.getElementById('date').textContent = formattedDate;

  var remainingBudget = dailyBudget - expenseAmount;
  var surplusOrDeficit = remainingBudget >= 0 ? "surplus" : "deficit";
  var surplusOrDeficitAmount = Math.abs(remainingBudget);

  var resultMessage = "You have " + surplusOrDeficit + " of Rs. " + surplusOrDeficitAmount + " for " + formattedDate;

  document.getElementById('remaining').innerHTML = resultMessage;
  document.getElementById('date').textContent = formattedDate;

  var excessDeficitField = document.getElementById('excess-deficit');
  var accumulatedExcessDeficit = parseFloat(excessDeficitField.textContent) + remainingBudget;
  excessDeficitField.textContent = accumulatedExcessDeficit;
  excessDeficitField.className = surplusOrDeficit;

  document.getElementById('expense-form').reset();
});

function resetAccumulatedExcessDeficit() {
  document.getElementById('excess-deficit').textContent = '0';
}

function checkAndResetBudget() {
  var currentDate = new Date();
  var storedDate = localStorage.getItem('currentDate');

  if (!storedDate || storedDate !== currentDate.toLocaleDateString()) {
    localStorage.setItem('currentDate', currentDate.toLocaleDateString());
    resetAccumulatedExcessDeficit();
  }
}

checkAndResetBudget();
