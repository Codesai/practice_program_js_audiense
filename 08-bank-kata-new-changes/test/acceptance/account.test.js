import Account from "../../src/account";
import {aDeposit, aWithdrawal, date} from "../helpers";
import {Printer} from "../../src/printer";

describe('Account', () => {
    let transactionRepository, display, calendar, printer, account;
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
        printer = new Printer(display);
        account = new Account(
            transactionRepository,
            calendar,
            printer
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

        expect(transactionRepository.save.mock.calls).toEqual([
            [firstTransaction],
            [secondTransaction],
            [thirdTransaction],
        ]);
        expect(display.show.mock.calls).toEqual([
            ['date || credit || debit || balance'],
            ['14/01/2022 || || 500.00 || 2500.00'],
            ['13/01/2022 || 2000.00 || || 3000.00'],
            ['10/01/2022 || 1000.00 || || 1000.00'],
        ]);
    });
});