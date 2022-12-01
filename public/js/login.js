const loginFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector("#email-login");
  const passwordEl = document.querySelector("#password-login");

  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/homepage");
  } else {
    alert("Failed to login");
  }
};

document
  .querySelector("#login-submit")
  .addEventListener("submit", loginFormHandler);
