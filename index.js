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

  var queryParams = new URLSearchParams(window.location.search);
  var source = queryParams.get('source');
  var dailyBudget = localforage.getItem('dailyBudget');
  if (dailyBudget !== null && dailyBudget !== undefined && dailyBudget !== "0" && source !== 'sidebar') {
    window.location.href = 'expenses/expenses.html';
  } else {

  }
});

function getFormattedDate() {
  var currentDate = new Date();
  var day = String(currentDate.getDate()).padStart(2, '0');
  var month = String(currentDate.getMonth() + 1).padStart(2, '0');
  var year = String(currentDate.getFullYear()).slice(-2);
  var formattedDate = day + "/" + month + "/" + year;
  return formattedDate;
}

function resetAll() {
  formattedDate = getFormattedDate();
  localforage.removeItem(formattedDate)
}

document.getElementById('budget-form').addEventListener('submit', function (event) {
  event.preventDefault();

  var dailyBudget = parseInt(document.getElementById('daily-budget').value);
  localStorage.setItem('dailyBudget', dailyBudget);
  localforage.getItem("accumulatedBalance").then((val)=>{
      if(val==null){
        localforage.setItem("accumulatedBalance",0)
      }
  })
  document.getElementById('budget-form').reset();

  window.location.href = 'expenses/expenses.html';


});
