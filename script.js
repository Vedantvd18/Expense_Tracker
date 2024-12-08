// script.js

// Select elements
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const addExpenseBtn = document.getElementById("addExpense");
const expenseTableBody = document.querySelector("#expenseTable tbody");
const totalAmountSpan = document.getElementById("totalAmount");

// Initialize expenses array
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to add a new expense
function addExpense() {
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;
  const description = descriptionInput.value;

  if (amount && category && description) {
    const expense = { amount, category, description, id: Date.now() };
    expenses.push(expense);
    updateLocalStorage();
    renderExpenses();
    clearForm();
  } else {
    alert("Please fill all fields!");
  }
}

// Function to render expenses
function renderExpenses() {
  expenseTableBody.innerHTML = ""; // Clear existing rows
  let total = 0;

  expenses.forEach((expense) => {
    total += expense.amount;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>₹${expense.amount}</td>
      <td>${expense.category}</td>
      <td>${expense.description}</td>
      <td><button onclick="deleteExpense(${expense.id})">Delete</button></td>
    `;
    expenseTableBody.appendChild(row);
  });

  totalAmountSpan.textContent = total;
}

// Function to delete an expense
function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  updateLocalStorage();
  renderExpenses();
}

// Function to update localStorage
function updateLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to clear the form
function clearForm() {
  amountInput.value = "";
  categoryInput.value = "";
  descriptionInput.value = "";
}

// Initial rendering of expenses
renderExpenses();

// Event listener for the Add button
addExpenseBtn.addEventListener("click", addExpense);
