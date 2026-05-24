const BASE_URL = "http://localhost:5000";

let token = "";

// REGISTER USER

async function registerUser() {

  const fullName =
    document.getElementById("fullName").value;

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const bvn =
    document.getElementById("bvn").value;

  try {

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

      localStorage.setItem("token", token);

      alert("Registration Successful");
    }

  } catch(error){

    console.log(error);

    alert("Registration Failed");
  }
}

// LOAD TOKEN

window.onload = () => {

  const savedToken =
    localStorage.getItem("token");

  if(savedToken){

    token = savedToken;
  }
};

// CREATE ACCOUNT

async function createAccount() {

  try {

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

  } catch(error){

    console.log(error);

    alert("Account Creation Failed");
  }
}

// CHECK BALANCE

async function checkBalance() {

  try {

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

  } catch(error){

    console.log(error);

    alert("Balance Check Failed");
  }
}

// TRANSFER FUNDS

async function transferFunds() {

  const receiverAccount =
    document.getElementById("receiverAccount").value;

  const amount =
    document.getElementById("amount").value;

  try {

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

  } catch(error){

    console.log(error);

    alert("Transfer Failed");
  }
}

// LOAD TRANSACTION HISTORY

async function loadHistory() {

  try {

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

      const li =
        document.createElement("li");

      li.innerText =
        `₦${transaction.amount} sent to ${transaction.receiverAccount}`;

      historyList.appendChild(li);
    });

  } catch(error){

    console.log(error);

    alert("Could Not Load History");
  }
}