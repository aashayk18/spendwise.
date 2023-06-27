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

    var calendar = new SimpleCalendar('#calendar', {
        onSelect: function (date) {
          console.log(date)
            displayCalendarData(date);
        }
      });
});

function SimpleCalendar(selector, options) {
    var self = this;
    var calendarElement = document.querySelector(selector);
    var currentDate = new Date();
    var selectedDate = null;
    var onSelect = options.onSelect || null;

    function generateCalendar() {
        var calendarHeader = document.createElement('div');
        calendarHeader.className = 'calendar-header';

        var prevMonth = document.createElement('span');
        prevMonth.className = 'prev-month';
        prevMonth.textContent = '<';
        prevMonth.addEventListener('click', goToPreviousMonth);

        var currentMonth = document.createElement('span');
        currentMonth.className = 'current-month';
        currentMonth.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        var nextMonth = document.createElement('span');
        nextMonth.className = 'next-month';
        nextMonth.textContent = '>';
        nextMonth.addEventListener('click', goToNextMonth);

        calendarHeader.appendChild(prevMonth);
        calendarHeader.appendChild(currentMonth);
        calendarHeader.appendChild(nextMonth);

        calendarElement.appendChild(calendarHeader);

        var calendarBody = document.createElement('div');
        calendarBody.className = 'calendar-body';

        var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        for (var i = 0; i < daysOfWeek.length; i++) {
            var dayOfWeek = document.createElement('div');
            dayOfWeek.textContent = daysOfWeek[i];
            calendarBody.appendChild(dayOfWeek);
        }

        var firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        var lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        var numDaysInMonth = lastDayOfMonth.getDate();

        var firstDayOfWeek = firstDayOfMonth.getDay();

        for (var i = 0; i < firstDayOfWeek; i++) {
            var day = document.createElement('div');
            day.className = 'day out-of-month';
            calendarBody.appendChild(day);
        }

        for (var i = 1; i <= numDaysInMonth; i++) {
            var day = document.createElement('div');
            day.className = 'day';
            day.textContent = i;
            day.addEventListener('click', selectDate);
            calendarBody.appendChild(day);
        }

        calendarElement.appendChild(calendarBody);
    }

    function goToPreviousMonth() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        clearCalendar();
        generateCalendar();
    }

    function goToNextMonth() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        clearCalendar();
        generateCalendar();
    }

    function clearCalendar() {
        while (calendarElement.firstChild) {
            calendarElement.removeChild(calendarElement.firstChild);
        }
    }

    function selectDate() {
        var day = parseInt(this.textContent);
        selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

        var selectedDayElement = calendarElement.querySelector('.day.selected');
        if (selectedDayElement) {
            selectedDayElement.classList.remove('selected');
        }
        this.classList.add('selected');

        if (typeof onSelect === 'function') {
            onSelect(formatDate(selectedDate));
        }
    }

    function formatDate(date) {
        var year = String(date.getFullYear()).slice(-2);
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return day + '/' + month + '/' + year;
      }

    generateCalendar();

}

function displayCalendarData(date) {
    localforage
      .getItem(date)
      .then(function (excessDeficit) {
        var calendarDataElement = document.getElementById('calendar-data');
        calendarDataElement.innerHTML = '';
  
        var dateElement = document.createElement('p');
        dateElement.textContent = 'Summary for ' + date;
        dateElement.style.fontWeight = 'bold'; 
        dateElement.style.fontSize = '20px'; 
        dateElement.style.color = '#333333'; 
        calendarDataElement.appendChild(dateElement);
  
        var excessDeficitElement = document.createElement('p');
        excessDeficitElement.textContent = 'Excess/Deficit: Rs. ' + excessDeficit;
        excessDeficitElement.style.fontWeight = 'bold'; 
        if (excessDeficit === null) {
            excessDeficitElement.style.color = '#212154';
          } else {
            excessDeficitElement.style.color = excessDeficit < 0 ? 'red' : 'green'; 
          }       
        calendarDataElement.appendChild(excessDeficitElement);
      })
      .catch(function (error) {
        console.error('Error retrieving data:', error);
      });
  }
  