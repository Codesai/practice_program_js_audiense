export class Transaction {
    static deposit(amount, date) {
        return {amount, date, type: 'deposit'};
    }

    static withdrawal(amount, date) {
        return {amount, date, type: 'withdrawal'};
    }
}