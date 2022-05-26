import Account from "../../src/account";

describe('Account', () => {
    let transactionRepository, display, calendar, account;
    beforeEach(() => {
        transactionRepository = {
            save: jest.fn(),
            getAll: jest.fn()
        };
        display = {
            show: jest.fn()
        };
        calendar = {
            now: jest.fn()
        };
        account = new Account(
            transactionRepository,
            display,
            calendar
        );
    });

    test('should print the bank statement after several movements', () => {
        const firstTransactionDate = date(2022, 1, 10);
        const firstTransactionAmount = 1000;
        const firstTransaction = aDeposit(firstTransactionAmount, firstTransactionDate);
        const secondTransactionDate = date(2022, 1, 13);
        const secondTransactionAmount = 2000;
        const secondTransaction = aDeposit(secondTransactionAmount, secondTransactionDate);
        const thirdTransactionDate = date(2022, 1, 14);
        const thirdTransactionAmount = 500;
        const thirdTransaction = aWithdrawal(thirdTransactionAmount, thirdTransactionDate);
        transactionRepository.getAll.mockReturnValueOnce([
            firstTransaction,
            secondTransaction,
            thirdTransaction,
        ]);
        calendar.now
            .mockReturnValueOnce(firstTransactionDate)
            .mockReturnValueOnce(secondTransactionDate)
            .mockReturnValueOnce(thirdTransactionDate);

        account.deposit(firstTransactionAmount);
        account.deposit(secondTransactionAmount);
        account.withdraw(thirdTransactionAmount);
        account.printStatement();

        expect(transactionRepository.save.mock.calls).toStrictEqual([
            [firstTransaction],
            [secondTransaction],
            [thirdTransaction],
        ]);
        expect(display.show.mock.calls).toStrictEqual([
            ['date || credit || debit || balance'],
            ['14/01/2022 || || 500.00 || 2500.00'],
            ['13/01/2022 || 2000.00 || || 3000.00'],
            ['10/01/2022 || 1000.00 || || 1000.00'],
        ]);
    });

    function aDeposit(amount, date) {
        return {amount, date, type: 'deposit'}
    }

    function aWithdrawal(amount, date) {
        return {amount, date, type: 'withdrawal'}
    }

    function date(year, month, day) {
        return new Date(year, month - 1, day);
    }
});