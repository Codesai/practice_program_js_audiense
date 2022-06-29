import Account from "../../src/account";
import {aDeposit, aWithdrawal, date} from "../helpers";

describe('Account', () => {
    let transactionRepository, display, printer, calendar, account;
    beforeEach(() => {
        transactionRepository = {
            save: jest.fn(),
            getAll: jest.fn()
        };
        display = null;
        calendar = {
            now: jest.fn()
        };
        printer = {
            print: jest.fn()
        };
        account = new Account(
            transactionRepository,
            calendar,
            printer
        );
    });

    test('should make a deposit', () => {
        const aDate = date(2022, 6, 8);
        calendar.now.mockReturnValueOnce(aDate);

        account.deposit(100);

        expect(transactionRepository.save).toHaveBeenCalledWith(aDeposit(100, aDate));
    });

    test('should make a withdrawal', () => {
        const aDate = date(2022, 6, 8);
        calendar.now.mockReturnValueOnce(aDate);

        account.withdraw(100);

        expect(transactionRepository.save).toHaveBeenCalledWith(aWithdrawal(100, aDate));
    });

    test('should print the statement', () => {
        const transactions = [
            aDeposit(100, date(2022, 6, 1)),
            aDeposit(200, date(2022, 6, 2)),
        ];
        transactionRepository.getAll.mockReturnValueOnce(transactions);

        account.printStatement();

        expect(printer.print).toHaveBeenCalledWith(transactions);
    });
});