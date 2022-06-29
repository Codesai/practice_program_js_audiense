import storage from "node-persist";

export class NodePersistTransactionRepository {
    constructor(storageDirectory) {
        this._storageDirectory = storageDirectory;
    }

    getAll() {
        storage.initSync({ dir: this._storageDirectory });
        const transactions = storage.getItemSync('transactions') ?? [];
        return transactions.map(t => ({...t, date: new Date(t.date)}));
    }

    save(transaction) {
        storage.initSync({ dir: this._storageDirectory });
        const transactions = storage.getItemSync('transactions') ?? [];
        storage.setItemSync('transactions', [...transactions, transaction]);
    }
}