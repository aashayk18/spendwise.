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

function resetAll(){
  localStorage.setItem("remainingBudget", 0)
  localStorage.setItem("dailyBudget", 0)
  localStorage.setItem("balanceAmount", 0)
  // localStorage.setItem("accumulatedExcessDeficit", 0)
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  // sidebar.classList.toggle('sidebar--active');
}

function resetAccumulatedExcessDeficit() {
  localStorage.setItem("accumulatedExcessDeficit", 0)
}

document.getElementById('budget-form').addEventListener('submit', function (event) {
  event.preventDefault();

  var dailyBudget = parseInt(document.getElementById('daily-budget').value);
  localStorage.setItem('dailyBudget', dailyBudget);

  document.getElementById('budget-form').reset();

  window.location.href = 'expenses.html';

  resetAccumulatedExcessDeficit();

});



