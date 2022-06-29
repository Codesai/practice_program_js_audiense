import crypto from "crypto";
import fs from 'fs';
import {aDeposit, aWithdrawal, date} from "../helpers";
import {NodePersistTransactionRepository} from "../../src/nodePersistTransactionRepository";

describe('node-persist Transaction repository', () => {
    let repository;
    const filePath = `./tmp/${md5('transactions')}`;

    beforeEach(() => {
        fs.rmSync('./tmp', {force: true, recursive: true});
        fs.mkdirSync('./tmp');
        repository = new NodePersistTransactionRepository('./tmp');
    });

    afterEach(() => {
        fs.rmSync('./tmp', {force: true, recursive: true});
    });

    test('should save a transaction', () => {
        const transaction = aDeposit(100, date(2022, 6, 8));

        repository.save(transaction);

        expect(readTransactions()).toStrictEqual([transaction]);
    });

    test('should add a transaction', () => {
        const transaction = aDeposit(100, date(2022, 6, 8));
        writeTransactions([transaction]);
        const newTransaction = aDeposit(200, date(2022, 6, 9));

        repository.save(newTransaction);

        expect(readTransactions()).toStrictEqual([transaction, newTransaction]);
    });

    test('should get empty list of transactions if none saved', () => {
        const retrievedTransactions = repository.getAll();

        expect(retrievedTransactions).toStrictEqual([])
    });

    test('should get all transactions', () => {
        const transactions = [
            aDeposit(100, date(2022, 6, 8)),
            aWithdrawal(200, date(2022, 6, 9))
        ];
        writeTransactions(transactions);

        const retrievedTransactions = repository.getAll();

        expect(retrievedTransactions).toStrictEqual(transactions)
    });

    function readTransactions() {
        let content = fs.readFileSync(filePath, {encoding: 'utf-8'});
        return JSON.parse(content).value.map(t => ({...t, date: new Date(t.date)}));
    }

    function writeTransactions(transactions) {
        fs.writeFileSync(filePath, JSON.stringify({
            key: 'transactions',
            value: transactions
        }), {encoding: 'utf-8'});
    }

    function md5(key) {
        return crypto.createHash('md5').update(key).digest('hex');
    }
});