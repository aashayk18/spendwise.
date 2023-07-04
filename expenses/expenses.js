document.getElementById('hamburger').addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('open');
});

window.addEventListener('DOMContentLoaded', function () {

  var sidebar = document.getElementById('sidebar');
  sidebar.style.height = window.innerHeight / 2 + 'px';

  var dailyBudget = parseInt(this.localforage.getItem('dailyBudget'));
  document.getElementById('daily-budget-display').textContent = dailyBudget;

  // gets current date
  var formattedDate = getFormattedDate()
  document.getElementById('date').textContent = formattedDate;
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // gets data related to current date and displays it
  localforage.getItem(formattedDate).then((res) => {
    // if today's balance exists then display
    if (res) {
      this.document.getElementById("remaining").innerHTML = "Balance : Rs. " + res.balance;
      localforage.getItem("accumulatedBalance").then((val) => {
        displayAccumulatedBalace(val)
      })
    }
    // if not then create today's data and then display
    else {
      let today = {
        "expenses": 0,
        "budget": dailyBudget,
        "balance": dailyBudget
      }
      localforage.setItem(formattedDate, today)
      localforage.getItem("currentDate").then((lastDate) => {
        const todate = new Date();
        const diffTime = Math.abs(todate - lastDate);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        diffDays--;
        localforage.setItem("currentDate", todate)
        console.log(lastDate+" "+diffDays)
        localforage.getItem("accumulatedBalance").then((res) => {

          res += (dailyBudget * diffDays)
          localforage.setItem("accumulatedBalance", res).then(displayAccumulatedBalace(res)).catch((err) => {
            console.log(err)
          })
        })
      })


      this.document.getElementById("remaining").innerHTML = "Balance : Rs. " + today.balance;

    }
  })

    ;
});




document.getElementById('expense-form').addEventListener('submit', function (event) {
  event.preventDefault();
  let remainingBudget;
  var expenseAmount = parseInt(document.getElementById('expense-amount').value);
  formattedDate = getFormattedDate();
  document.getElementById('date').textContent = formattedDate;

  localforage.getItem(formattedDate).then((dateData) => {
    let remainingBalance = dateData.balance;
    let totalExpenses = dateData.expenses;
    totalExpenses += expenseAmount;
    remainingBudget = remainingBalance;
    remainingBalance -= expenseAmount;
    dateData.balance = remainingBalance;
    dateData.expenses = totalExpenses;
    document.getElementById("remaining").textContent = "Balance : Rs. " + remainingBalance;
    localforage.setItem(formattedDate, dateData)
  })

  localforage.getItem("accumulatedBalance").then((res) => {
    res -= expenseAmount;
    localforage.setItem("accumulatedBalance", res).then((displayAccumulatedBalace(res))).catch(() => {
      console.log(err)
    })
  })

  /*var excessOrDeficit = remainingBudget >= 0 ? "excess" : "deficit";
  var resultMessage = "You have " + excessOrDeficit + " of Rs. " + excessDeficit + " for " + formattedDate;
  localStorage.setItem("result", resultMessage)
  document.getElementById('remaining').innerHTML = resultMessage;*/
  document.getElementById("expense-form").reset()

});



function getFormattedDate() {
  var currentDate = new Date();
  var day = String(currentDate.getDate()).padStart(2, '0');
  var month = String(currentDate.getMonth() + 1).padStart(2, '0');
  var year = String(currentDate.getFullYear()).slice(-2);
  var formattedDate = day + "/" + month + "/" + year;
  return formattedDate;
}

function displayAccumulatedBalace(accumulatedExcessDeficit) {

  //Gets accumulated Balance and adds it to html

  document.getElementById('excess-deficit').textContent = accumulatedExcessDeficit;
  if (accumulatedExcessDeficit < 0) {
    document.getElementById("excess-deficit").classList.add('deficit');
    document.getElementById("excess-deficit").classList.remove('excess');
  } else {
    document.getElementById("excess-deficit").classList.add('excess');
    document.getElementById("excess-deficit").classList.remove('deficit');
  }
}

