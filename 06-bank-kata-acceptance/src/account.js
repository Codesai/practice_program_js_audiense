export default class Account {
    constructor(transactionRepository, display, calendar) {
        this._transactionRepository = transactionRepository;
        this._display = display;
        this._calendar = calendar;
    }

    deposit(amount) {}

    withdraw(amount) {}

    printStatement() {}
}