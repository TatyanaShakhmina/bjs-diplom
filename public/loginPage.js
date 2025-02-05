"use strict";
const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    console.log(data);
    ApiConnector.login(data, (response) => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage("Неверный логин или пароль");
        }
    })
};
userForm.registerFormCallback = (data) => {
    console.log(data);
    ApiConnector.login(data, (response) => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage("Ошибка");
        }
    })
};