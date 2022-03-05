import { CoffeeMachine } from "./CoffeeMachine";

describe('Coffee machine', () => {
    let drinkMaker;
    let coffeeMachine;

    beforeEach(() => {
        drinkMaker = { send: jest.fn() };
        coffeeMachine = new CoffeeMachine(drinkMaker);
    });

    describe('choosing drinks', () => {
        beforeEach(() => {
            coffeeMachine.insertMoney(100);
        });

        test('serves a coffee', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledWith('C::');
        });

        test('serves a tea', () => {
            coffeeMachine.selectTea();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledWith('T::');
        });

        test('serves a hot chocolate', () => {
            coffeeMachine.selectChocolate();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledWith('H::');
        });
    });

    describe('adding sugar', () => {
        beforeEach(() => {
            coffeeMachine.insertMoney(100);
        });

        test('adds a stick when my order has sugar', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledWith('C:1:0');
        });

        test('can not have more than 2 spoons of sugar', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledWith('C:2:0');
        });
    });

    describe('multiple orders', () => {
        beforeEach(() => {
            coffeeMachine.insertMoney(100);
        });

        test('the last drink selected is the one served', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.selectTea();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledWith('T::');
        });

        test('can make multiple orders', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.makeDrink();
            coffeeMachine.insertMoney(100);
            coffeeMachine.selectTea();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send.mock.calls).toEqual([
                ['C:1:0'],
                ['T::']
            ]);
        });
    });

    describe('charging for the drinks', () => {
        beforeEach(() => {
            coffeeMachine = new CoffeeMachine(drinkMaker);
        });

        test('serve coffee with at least 0.60 euros', () => {
            coffeeMachine.insertMoney(0.6);

            coffeeMachine.selectCoffee();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledTimes(1);
            expect(drinkMaker.send).toHaveBeenCalledWith('C::');
        });

        test('do not serve coffee with too little money', () => {
            coffeeMachine.insertMoney(0.59);

            coffeeMachine.selectCoffee();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledTimes(1);
            expect(drinkMaker.send).toHaveBeenCalledWith('M:Missing 0.01 euros');
        });

        test('serve tea with at least 0.40 euros', () => {
            coffeeMachine.insertMoney(0.4);

            coffeeMachine.selectTea();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledTimes(1);
            expect(drinkMaker.send).toHaveBeenCalledWith('T::');
        });

        test('do not serve tea with too little money', () => {
            coffeeMachine.insertMoney(0.39);

            coffeeMachine.selectTea();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledTimes(1);
            expect(drinkMaker.send).toHaveBeenCalledWith('M:Missing 0.01 euros');
        });

        test('serve chocolate with at least 0.50 euros', () => {
            coffeeMachine.insertMoney(0.5);

            coffeeMachine.selectChocolate();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledTimes(1);
            expect(drinkMaker.send).toHaveBeenCalledWith('H::');
        });

        test('do not serve chocolate with too little money', () => {
            coffeeMachine.insertMoney(0.49);

            coffeeMachine.selectChocolate();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledTimes(1);
            expect(drinkMaker.send).toHaveBeenCalledWith('M:Missing 0.01 euros');
        });

        test('can insert money multiple times', () => {
            coffeeMachine.insertMoney(0.2);
            coffeeMachine.insertMoney(0.3);

            coffeeMachine.selectChocolate();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledTimes(1);
            expect(drinkMaker.send).toHaveBeenCalledWith('H::');
        });

        test('money is returned after ordering the drink', () => {
            coffeeMachine.insertMoney(0.5);

            coffeeMachine.selectChocolate();
            coffeeMachine.makeDrink();
            coffeeMachine.selectChocolate();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send.mock.calls).toEqual([
                ['H::'],
                ['M:Missing 0.50 euros']
            ]);
        });
    });

    describe('configure prices', () => {
        test('can setup drink prices on creation', () => {
            const coffeeMachine = new CoffeeMachine(drinkMaker, {C: 0.2, T: 0, H: 0});

            coffeeMachine.insertMoney(0.3);
            coffeeMachine.selectCoffee();
            coffeeMachine.makeDrink();

            expect(drinkMaker.send).toHaveBeenCalledWith('C::');
        });
    });
});