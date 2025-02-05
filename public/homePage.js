"use strict";
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout( (response) => {
        if (response.success) {
            location.reload();
        }
    })
};
ApiConnector.current( (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response);
    }
});

const ratesBoard = new RatesBoard();
function getExchangeRates() {
    ApiConnector.getStocks( (response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(data);
        }
    });
}
getExchangeRates();
setInterval(getExchangeRates, 60000);



