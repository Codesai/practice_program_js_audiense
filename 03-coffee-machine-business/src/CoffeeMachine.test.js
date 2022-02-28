import { CoffeeMachine } from "./CoffeeMachine";

describe('Coffee machine', () => {
    let drinkMaker;
    let coffeeMachine;

    beforeEach(() => {
        drinkMaker = { make: jest.fn() };
        coffeeMachine = new CoffeeMachine(drinkMaker);
    });

    describe('choosing drinks', () => {
        test('serves a coffee', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.makeDrink();

            expect(drinkMaker.make).toHaveBeenCalledWith('C::');
        });

        test('serves a tea', () => {
            coffeeMachine.selectTea();
            coffeeMachine.makeDrink();

            expect(drinkMaker.make).toHaveBeenCalledWith('T::');
        });

        test('serves a hot chocolate', () => {
            coffeeMachine.selectChocolate();
            coffeeMachine.makeDrink();

            expect(drinkMaker.make).toHaveBeenCalledWith('H::');
        });
    });

    describe('adding sugar', () => {
        test('adds a stick when my order has sugar', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.makeDrink();

            expect(drinkMaker.make).toHaveBeenCalledWith('C:1:0');
        });

        test('can not have more than 2 spoons of sugar', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.makeDrink();

            expect(drinkMaker.make).toHaveBeenCalledWith('C:2:0');
        });
    });

    describe('multiple orders', () => {
        test('the last drink selected is the one served', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.selectTea();
            coffeeMachine.makeDrink();

            expect(drinkMaker.make).toHaveBeenCalledWith('T::');
        });

        test('can make multiple orders', () => {
            coffeeMachine.selectCoffee();
            coffeeMachine.addOneSpoonOfSugar();
            coffeeMachine.makeDrink();
            coffeeMachine.selectTea();
            coffeeMachine.makeDrink();

            expect(drinkMaker.make.mock.calls).toEqual([
                ['C:1:0'],
                ['T::']
            ]);
        });
    });
});