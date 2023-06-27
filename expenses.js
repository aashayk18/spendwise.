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
    // var accumulatedExcessDeficit = this.localStorage.getItem("accumulatedExcessDeficit")
    var formattedDate = this.localStorage.getItem("date")
    document.getElementById('daily-budget-display').textContent = dailyBudget;
    document.getElementById('date').textContent = formattedDate;
    document.getElementById('excess-deficit').textContent = balanceAmount
    this.localStorage.setItem("remainingBudget", dailyBudget)

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
    localStorage.setItem("date", formattedDate)
    document.getElementById('date').textContent = formattedDate;

    var remainingBudget = localStorage.getItem("remainingBudget")
    remainingBudget = remainingBudget - expenseAmount
    localStorage.setItem("remainingBudget", remainingBudget)
    document.getElementById("excess-deficit").innerHTML = remainingBudget;
    document.getElementById("balance").innerHTML = remainingBudget;


    // var balanceAmount = this.localStorage.getItem("balanceAmount")
    // document.getElementById('excess-deficit').textContent = balanceAmount

    // var excessDeficitField = document.getElementById('excess-deficit');

    // var accumulatedExcessDeficit = parseFloat(excessDeficitField.textContent) + remainingBudget;

    // excessDeficitField.textContent = accumulatedExcessDeficit;
    // localStorage.setItem("accumulatedExcessDeficit", parseFloat(accumulatedExcessDeficit))

    document.getElementById('expense-form').reset();

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
