// script.js
const calendarBody = document.getElementById("calendar-body");
const selectedDateDisplay = document.getElementById("selected-date");
const modal = document.getElementById("popup-modal");
const closeModal = document.getElementsByClassName("close")[0];
const monthYearDisplay = document.getElementById("month-year");
let selectedCell = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Generate calendar for the current month
function generateCalendar() {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  let calendarHTML = "";
  let dayCount = 1;

  // Generate 6 rows (weeks)
  for (let i = 0; i < 6; i++) {
    calendarHTML += "<tr>";

    // Generate 7 columns (days)
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        calendarHTML += "<td></td>"; // Empty cells before the first day
      } else if (dayCount > daysInMonth) {
        calendarHTML += "<td></td>"; // Empty cells after the last day
      } else {
        calendarHTML += `<td onclick="selectDate(this)">${dayCount}</td>`;
        dayCount++;
      }
    }

    calendarHTML += "</tr>";
  }

  calendarBody.innerHTML = calendarHTML;
  monthYearDisplay.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
}

// Get month name from month index
function getMonthName(monthIndex) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
}

// Handle selecting a date
function selectDate(cell) {
  // Remove previous selection
  if (selectedCell) {
    selectedCell.classList.remove("active");
  }

  // Highlight the new selection
  cell.classList.add("active");
  selectedCell = cell;

  // Show the date in the display
  selectedDateDisplay.textContent = `Selected Date: ${cell.textContent}`;

  // Show the modal popup
  openModal();
}

// Open the modal
function openModal() {
  modal.style.display = "block";
}

// Close the modal
closeModal.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Handle button action
function applySelection(action) {
  if (action === "action1") {
    // Add red background to the selected cell
    if (selectedCell) {
      selectedCell.classList.add("red");
    }
  } else if (action === "action2") {
    // Reset the color of the selected cell
    if (selectedCell) {
      selectedCell.classList.remove("red");
    }
  }

  // Close the modal after selection
  modal.style.display = "none";
}

// Unselect the current date
function unselectDate() {
  if (selectedCell) {
    selectedCell.classList.remove("active");
    selectedCell.classList.remove("red"); // Ensure red class is removed
    selectedDateDisplay.textContent = "Selected Date: None";
    selectedCell = null;
  }

  // Close the modal
  modal.style.display = "none";
}

// Change month
function changeMonth(offset) {
  currentMonth += offset;

  // Adjust year when going to previous/next year
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  generateCalendar();
}

// Initialize calendar
generateCalendar();
