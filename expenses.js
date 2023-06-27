document.getElementById('hamburger').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open');
});

//  localStorage.setItem("accumulatedExcessDeficit",parseFloat(0))

window.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var windowHeight = window.innerHeight;
    var sidebarHeight = windowHeight / 2;
    sidebar.style.height = sidebarHeight + 'px';

    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    var dailyBudget = this.localStorage.getItem('dailyBudget');
    var balanceAmount = this.localStorage.getItem("balanceAmount")
    
    var currentDate = new Date();
    var day = String(currentDate.getDate()).padStart(2, '0');
    var month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var year = String(currentDate.getFullYear()).slice(-2);
    var formattedDate = day + "/" + month + "/" + year;
    localStorage.setItem("date", formattedDate);
    var formattedDate = this.localStorage.getItem("date")

    document.getElementById('date').textContent = formattedDate;
    document.getElementById('daily-budget-display').textContent = dailyBudget;
    document.getElementById('excess-deficit').textContent = balanceAmount
    this.localStorage.setItem("remainingBudget", dailyBudget)

    // var accumulatedExcessDeficit = this.localStorage.getItem("accumulatedExcessDeficit")
    // resetAccumulatedExcessDeficit()
    // var resultMessage = this.localStorage.getItem("result")
    // document.getElementById('remaining').innerHTML = resultMessage;
});


function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    // sidebar.classList.toggle('sidebar--active');
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
    document.getElementById("excess-deficit").innerHTML = remainingBudget;
  
    if (remainingBudget < 0) {
        document.getElementById("excess-deficit").classList.add('deficit');
        document.getElementById("excess-deficit").classList.remove('excess');
    } else {
        document.getElementById("excess-deficit").classList.add('excess');
        document.getElementById("excess-deficit").classList.remove('deficit');
    }


    // Retrieve the date, excess/deficit, and other relevant data from the input fields
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
        console.log(date)
        console.log(excessDeficit)
        console.log('Data stored successfully!');
      })
      .catch(function (error) {
        console.error('Error storing data:', error);
      });

     // var dailyBudget = parseInt(localStorage.getItem('dailyBudget'));
    // var balanceAmount = this.localStorage.getItem("balanceAmount")
    // document.getElementById('excess-deficit').textContent = balanceAmount

    // var excessDeficitField = document.getElementById('excess-deficit');

    // var accumulatedExcessDeficit = parseFloat(excessDeficitField.textContent) + remainingBudget;

    // excessDeficitField.textContent = accumulatedExcessDeficit;
    // localStorage.setItem("accumulatedExcessDeficit", parseFloat(accumulatedExcessDeficit))

    // console.log(accumulatedExcessDeficit)
    // var surplusOrDeficit = remainingBudget >= 0 ? "surplus" : "deficit";
    // var surplusOrDeficitAmount = Math.abs(remainingBudget);

    // var resultMessage = "You have " + surplusOrDeficit + " of Rs. " + surplusOrDeficitAmount + " for " + formattedDate;
    // localStorage.setItem("result",resultMessage)

    //    document.getElementById('remaining').innerHTML = resultMessage;
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
