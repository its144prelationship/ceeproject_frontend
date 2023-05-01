const backendIPAddress = "127.0.0.1:3000";

const authorizeApplication = () => {
  window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

const login_button = document.getElementById("loginbutton");
login_button.addEventListener("click", authorizeApplication);
