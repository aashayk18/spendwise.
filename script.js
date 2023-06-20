document.getElementById('budget-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    var dailyBudget = parseInt(document.getElementById('daily-budget').value);
    localStorage.setItem('dailyBudget', dailyBudget); // Store daily budget in local storage

    document.getElementById('budget-form').reset();

    // Display daily budget after setting it
    document.getElementById('daily-budget-display').textContent = dailyBudget;

    // Reset accumulated excess/deficit field
    resetAccumulatedExcessDeficit();
});

document.getElementById('expense-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    var expenseAmount = parseInt(document.getElementById('expense-amount').value);
    var dailyBudget = parseInt(localStorage.getItem('dailyBudget'));
    var currentDate = new Date();
    var day = String(currentDate.getDate()).padStart(2, '0');
    var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    var year = String(currentDate.getFullYear()).slice(-2);
    var formattedDate = day + "/" + month + "/" + year;

    document.getElementById('date').textContent = formattedDate;


    var remainingBudget = dailyBudget - expenseAmount;
    var surplusOrDeficit = remainingBudget >= 0 ? "surplus" : "deficit";
    var surplusOrDeficitAmount = Math.abs(remainingBudget);

    var resultMessage = "You have " + surplusOrDeficit + " of Rs. " + surplusOrDeficitAmount + " for " + formattedDate;

    document.getElementById('remaining').innerHTML = resultMessage;
    document.getElementById('date').textContent = formattedDate;

    // Update accumulated excess/deficit field
    var excessDeficitField = document.getElementById('excess-deficit');
    var accumulatedExcessDeficit = parseFloat(excessDeficitField.textContent) + remainingBudget;
    excessDeficitField.textContent = accumulatedExcessDeficit;
    excessDeficitField.className = surplusOrDeficit;

    document.getElementById('expense-form').reset();
});

// Reset accumulated excess/deficit field daily
function resetAccumulatedExcessDeficit() {
    document.getElementById('excess-deficit').textContent = '0';
}

// Check and reset daily budget on a new day
function checkAndResetBudget() {
    var currentDate = new Date();
    var storedDate = localStorage.getItem('currentDate');

    if (!storedDate || storedDate !== currentDate.toLocaleDateString()) {
        localStorage.setItem('currentDate', currentDate.toLocaleDateString());
        resetAccumulatedExcessDeficit();
    }
}

// Call the checkAndResetBudget function on page load
checkAndResetBudget();

const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;