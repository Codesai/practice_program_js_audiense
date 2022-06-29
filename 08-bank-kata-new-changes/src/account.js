import {Transaction} from "./transaction.js";

export default class Account {
    constructor(transactionRepository, calendar, printer) {
        this._transactionRepository = transactionRepository;
        this._calendar = calendar;
        this._printer = printer;
    }

    deposit(amount) {
        const now = this._calendar.now();
        this._transactionRepository.save(Transaction.deposit(amount, now));
    }

    withdraw(amount) {
        const now = this._calendar.now();
        this._transactionRepository.save(Transaction.withdrawal(amount, now));
    }

    printStatement() {
        this._printer.print(this._transactionRepository.getAll());
    }
}