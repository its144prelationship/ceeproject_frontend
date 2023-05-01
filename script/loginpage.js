// const { authApp } = require("../../ceeproject_backend/controllers");

const backendIPAddress = "127.0.0.1:3000";

const authorizeApplication = () => {
    window.location.href = `http://${backendIPAddress}/auth_app`;
};

const login_button = document.getElementById('loginbutton');
login_button.addEventListener('click',authorizeApplication);