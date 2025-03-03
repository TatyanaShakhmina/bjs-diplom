"use strict";
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(  (response) => {
        if (response.success) {
            location.reload();
        }
    })
};
ApiConnector.current(  (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();
function getExchangeRates() {
    ApiConnector.getStocks( (response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}
getExchangeRates();
setInterval(getExchangeRates, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = ({ currency, amount }) => {
    ApiConnector.addMoney({ currency, amount }, (response) => {
        let message = "";
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            message = "пополнение успешно";
        } else {
            message = "ошибка при пополнении";
        }
        moneyManager.setMessage(response.success, message);
    });
}
moneyManager.conversionMoneyCallback = ({ fromCurrency, targetCurrency, fromAmount }) => {
    ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, (response) => {
        let message = "";
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            message = "конвертация успешна";
        } else {
            message = "ошибка при конвертации";
        }
        moneyManager.setMessage(response.success, message);
    });
}
moneyManager.sendMoneyCallback = ({ to, currency, amount }) => {
    ApiConnector.transferMoney({ to, currency, amount }, (response) => {
        let message = "";
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            message = "перевод успешный";
        } else {
            message = "ошибка при переводе";
        }
        moneyManager.setMessage(response.success, message);
    });
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites( (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data)
    }
});
favoritesWidget.addUserCallback = ({ id, name }) => {
    ApiConnector.addUserToFavorites({ id, name }, (response) => {
        let message = "";
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            message = "добавление успешно";
        } else {
            message = "ошибка при добавлении";
        }
        favoritesWidget.setMessage(response.success, message);
    });
}
favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, (response) => {
        let message = "";
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            message = "удаление успешно";
        } else {
            message = "ошибка при удалении";
        }
        favoritesWidget.setMessage(response.success, message);
    });
}