import {behavesLikeATransactionRepository} from "./transactionRepository.role";
import {InMemoryTransactionRepository} from "../../src/inMemoryTransactionRepository";

let repository;

describe('inMemory transaction repository', behavesLikeATransactionRepository({
    init() {
        repository = new InMemoryTransactionRepository();
    },
    clean() {},
    getInstance() {
        return repository;
    },
    readTransactions() {
        return repository.getAll();
    },
    writeTransactions(transactions) {
        transactions.forEach(t => repository.save(t));
    }
}));