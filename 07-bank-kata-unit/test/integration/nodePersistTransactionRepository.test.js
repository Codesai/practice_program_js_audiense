import crypto from "crypto";
import fs from 'fs';
import {NodePersistTransactionRepository} from "../../src/nodePersistTransactionRepository";
import {behavesLikeATransactionRepository} from "./transactionRepository.role";

const filePath = `./tmp/${md5('transactions')}`;

function md5(key) {
    return crypto.createHash('md5').update(key).digest('hex');
}

describe('node-persist transaction repository', behavesLikeATransactionRepository({
    init() {
        fs.rmSync('./tmp', {force: true, recursive: true});
        fs.mkdirSync('./tmp');
    },
    clean() {
        fs.rmSync('./tmp', {force: true, recursive: true});
    },
    getInstance() {
        return new NodePersistTransactionRepository('./tmp');
    },
    readTransactions() {
        let content = fs.readFileSync(filePath, {encoding: 'utf-8'});
        return JSON.parse(content).value.map(t => ({...t, date: new Date(t.date)}));
    },
    writeTransactions(transactions) {
        fs.writeFileSync(filePath, JSON.stringify({
            key: 'transactions',
            value: transactions
        }), {encoding: 'utf-8'});
    }
}));
