import {Printer} from "../../src/printer";
import {aDeposit, aWithdrawal, date} from "../helpers";

describe('Printer', () => {
    let printer, display;
    beforeEach(() => {
        display = {show: jest.fn()};
        printer = new Printer(display);
    });

    test('should display only headers when there are no transactions', () => {
        printer.print([]);

        expect(display.show).toHaveBeenCalledWith('date || credit || debit || balance');
    });

    test('should print deposit', () => {
        printer.print([
            aDeposit(100, date(2022, 6, 29))
        ]);

        expect(display.show.mock.calls).toEqual([
            ['date || credit || debit || balance'],
            ['29/06/2022 || 100.00 || || 100.00'],
        ]);
    });

    test('should print withdrawal', () => {
        printer.print([
            aWithdrawal(100, date(2022, 6, 29))
        ]);

        expect(display.show.mock.calls).toEqual([
            ['date || credit || debit || balance'],
            ['29/06/2022 || || 100.00 || -100.00'],
        ]);
    });

    test('should print statements starting with the newest', () => {
        printer.print([
            aDeposit(0, date(2022, 5, 29)),
            aDeposit(0, date(2022, 6, 29)),
        ]);

        expect(display.show.mock.calls).toEqual([
            ['date || credit || debit || balance'],
            ['29/06/2022 || 0.00 || || 0.00'],
            ['29/05/2022 || 0.00 || || 0.00'],
        ]);
    });

    test('should calculate the balance for each transaction', () => {
        printer.print([
            aDeposit(100, date(2022, 5, 29)),
            aDeposit(200, date(2022, 6, 29)),
            aWithdrawal(50, date(2022, 7, 29)),
        ]);

        expect(display.show.mock.calls).toEqual([
            ['date || credit || debit || balance'],
            ['29/07/2022 || || 50.00 || 250.00'],
            ['29/06/2022 || 200.00 || || 300.00'],
            ['29/05/2022 || 100.00 || || 100.00'],
        ]);
    });
});