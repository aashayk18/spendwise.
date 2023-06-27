class dayData {
  dayData(budget, expenses) {
    this.budget = budget;
    this.expenses = expenses;
    this.balance = budget - expenses;
  }

  setBudget(val) {
    this.budget = val
  }
  setExpense(val) {
    this.expenses = val
  }

  getExpense() {
    return this.expenses
  }
  getBudget() {
    return this.budget
  }
}



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
  var dailyBudget = this.localStorage.getItem('dailyBudget');

  var currentDate = new Date();
  var day = String(currentDate.getDate()).padStart(2, '0');
  var month = String(currentDate.getMonth() + 1).padStart(2, '0');
  var year = String(currentDate.getFullYear()).slice(-2);
  var formattedDate = day + "/" + month + "/" + year;
  localStorage.setItem("date", formattedDate);
  var formattedDate = this.localStorage.getItem("date")

  document.getElementById('date').textContent = formattedDate;
  document.getElementById('daily-budget-display').textContent = dailyBudget;

  this.localStorage.setItem("remainingBudget", dailyBudget)


  localforage.setItem("26/06/23", "70").then(function () {
    console.log("Data updated successfully!");
  }).catch(function (error) {
    console.error("Error updating data:", error);
  });


  var accumulatedExcessDeficit = 0;

  localforage.iterate(function (value, key, iterationNumber) {
    var excessDeficit = parseInt(value);
    if (!isNaN(excessDeficit)) {
      accumulatedExcessDeficit += excessDeficit;
    }
  }).then(function () {
    document.getElementById('excess-deficit').textContent = accumulatedExcessDeficit;
    if (accumulatedExcessDeficit < 0) {
      document.getElementById("excess-deficit").classList.add('deficit');
      document.getElementById("excess-deficit").classList.remove('excess');
    } else {
      document.getElementById("excess-deficit").classList.add('excess');
      document.getElementById("excess-deficit").classList.remove('deficit');
    }
  }).catch(function (error) {
    console.error('Error calculating accumulated excess/deficit:', error);
  });
});


function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
}

document.getElementById('expense-form').addEventListener('submit', function (event) {
  event.preventDefault();

  var expenseAmount = parseInt(document.getElementById('expense-amount').value);
  var currentDate = new Date();
  var day = String(currentDate.getDate()).padStart(2, '0');
  var month = String(currentDate.getMonth() + 1).padStart(2, '0');
  var year = String(currentDate.getFullYear()).slice(-2);
  var formattedDate = day + "/" + month + "/" + year;
  localStorage.setItem("date", formattedDate);
  document.getElementById('date').textContent = formattedDate;

  var remainingBudget = parseInt(localStorage.getItem("remainingBudget"));
  remainingBudget = remainingBudget - expenseAmount;
  localStorage.setItem("remainingBudget", remainingBudget);

  var dateInput = formattedDate;
  var dateParts = dateInput.split('/');
  var year = dateParts[2];
  var month = String(dateParts[1]).padStart(2, '0');
  var day = String(dateParts[0]).padStart(2, '0');

  var date = day + '/' + month + '/' + year;
  var excessDeficit = remainingBudget;

  localforage.setItem(date, excessDeficit)
    .then(function () {
      document.getElementById('expense-form').reset();
      console.log(date);
      console.log(excessDeficit);
      console.log('Data stored successfully!');

      // Update accumulatedExcessDeficit
      var accumulatedExcessDeficit = 0;
      localforage.iterate(function (value) {
        var excessDeficit = parseInt(value);
        if (!isNaN(excessDeficit)) {
          accumulatedExcessDeficit += excessDeficit;
        }
      }).then(function () {
        document.getElementById('excess-deficit').textContent = accumulatedExcessDeficit;
        if (accumulatedExcessDeficit < 0) {
          document.getElementById("excess-deficit").classList.add('deficit');
          document.getElementById("excess-deficit").classList.remove('excess');
        } else {
          document.getElementById("excess-deficit").classList.add('excess');
          document.getElementById("excess-deficit").classList.remove('deficit');
        }
      }).catch(function (error) {
        console.error('Error calculating accumulated excess/deficit:', error);
      });

    })
    .catch(function (error) {
      console.error('Error storing data:', error);
    });

  var excessOrDeficit = remainingBudget >= 0 ? "excess" : "deficit";
  var resultMessage = "You have " + excessOrDeficit + " of Rs. " + excessDeficit + " for " + date;
  localStorage.setItem("result", resultMessage)
  document.getElementById('remaining').innerHTML = resultMessage;
});


function resetAccumulatedExcessDeficit() {
  localStorage.setItem("accumulatedExcessDeficit", 0)
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
