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

// document.getElementById('date-form').addEventListener('submit', function (event) {
//   event.preventDefault();

//   // Retrieve the date and text data from the input fields
//   var dateInput = document.getElementById('date-input').value;
//   var textData = document.getElementById('text-input').value;

//   // Convert the date from dd/mm/yyyy to yyyy-mm-dd format
//   var dateParts = dateInput.split('-');
//   var year = dateParts[0];
//   var month = String(dateParts[1]).padStart(2, '0');
//   var day = String(dateParts[2]).padStart(2, '0');
//   var date = day + '/' + month + '/' + year;

//   // Store the date and text data in localForage
//   localforage.setItem(date, textData)
//     .then(function () {
//       // Reset the form fields
//       document.getElementById('date-form').reset();
//       console.log('Data stored successfully!');
//       console.log(date);
//       console.log(textData);
//     })
//     .catch(function (error) {
//       console.error('Error storing data:', error);
//     });
// });


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
