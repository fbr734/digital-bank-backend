const BASE_URL = "http://localhost:5000";

let token = "";

async function registerUser() {

  const fullName =
    document.getElementById("fullName").value;

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const bvn =
    document.getElementById("bvn").value;

  const response = await fetch(
    `${BASE_URL}/api/auth/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        fullName,
        email,
        password,
        bvn
      })
    }
  );

  const data = await response.json();

  alert(data.message);

  if(data.token){
    token = data.token;
  }
}

async function createAccount() {

  const response = await fetch(
    `${BASE_URL}/api/account/create`,
    {
      method: "POST",

      headers: {
        Authorization: token
      }
    }
  );

  const data = await response.json();

  alert(data.message);
}

async function checkBalance() {

  const response = await fetch(
    `${BASE_URL}/api/account/balance`,
    {
      headers: {
        Authorization: token
      }
    }
  );

  const data = await response.json();

  document.getElementById("balance")
    .innerText = `₦${data.balance}`;
}

async function transferFunds() {

  const receiverAccount =
    document.getElementById("receiverAccount").value;

  const amount =
    document.getElementById("amount").value;

  const response = await fetch(
    `${BASE_URL}/api/transaction/transfer`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },

      body: JSON.stringify({
        receiverAccount,
        amount
      })
    }
  );

  const data = await response.json();

  alert(data.message);
}

async function loadHistory() {

  const response = await fetch(
    `${BASE_URL}/api/transaction/history`,
    {
      headers: {
        Authorization: token
      }
    }
  );

  const data = await response.json();

  const historyList =
    document.getElementById("history");

  historyList.innerHTML = "";

  data.forEach(transaction => {

    const li = document.createElement("li");

    li.innerText =
      `₦${transaction.amount} → ${transaction.receiverAccount}`;

    historyList.appendChild(li);
  });
}