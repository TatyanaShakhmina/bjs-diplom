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
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.message);
        } else {
            moneyManager.setMessage(response.message);
        }
    });
}
moneyManager.conversionMoneyCallback = ({ fromCurrency, targetCurrency, fromAmount }) => {
    ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.message);
        } else {
            moneyManager.setMessage(response.message);
        }
    });
}
moneyManager.sendMoneyCallback = ({ to, currency, amount }) => {
    ApiConnector.transferMoney({ to, currency, amount }, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.message);
        } else {
            moneyManager.setMessage(response.message);
        }
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
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data)
            favoritesWidget.setMessage(response.message);
        } else {
            favoritesWidget.setMessage(response.message);
        }
    });
}
favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data)
            favoritesWidget.setMessage(response.message);
        } else {
            favoritesWidget.setMessage(response.message);
        }
    });
}