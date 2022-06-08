export class InMemoryTransactionRepository {
    constructor() {
        this._transactions = [];
    }

    getAll() {
        return this._transactions;
    }

    save(transaction) {
        this._transactions.push(transaction);
    }
}