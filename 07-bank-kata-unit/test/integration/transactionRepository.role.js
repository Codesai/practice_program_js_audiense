import {aDeposit, aWithdrawal, date} from "../helpers";

export function behavesLikeATransactionRepository(environment) {
    return () => describe('behaves like a transaction repository', () => {
        let repository;
        beforeEach(() => {
            environment.init();
            repository = environment.getInstance();
        });

        afterEach(() => {
            environment.clean();
        });

        test('should save a transaction', () => {
            const transaction = aDeposit(100, date(2022, 6, 8));

            repository.save(transaction);

            expect(environment.readTransactions()).toStrictEqual([transaction]);
        });

        test('should add a transaction', () => {
            const transaction = aDeposit(100, date(2022, 6, 8));
            environment.writeTransactions([transaction]);
            const newTransaction = aDeposit(200, date(2022, 6, 9));

            repository.save(newTransaction);

            expect(environment.readTransactions()).toStrictEqual([transaction, newTransaction]);
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
            environment.writeTransactions(transactions);

            const retrievedTransactions = repository.getAll();

            expect(retrievedTransactions).toStrictEqual(transactions)
        });
    });
}