export class CoffeeMachine {
    constructor(drinkMaker) {
        this._drinkMaker = drinkMaker;
        this._initialiseState();
    }

    _initialiseState() {
        this._drink = '';
        this._sugar = 0;
    }

    selectCoffee() {
        this._drink = 'C';
    }

    selectTea() {
        this._drink = 'T';
    }

    selectChocolate() {
        this._drink = 'H';
    }

    addOneSpoonOfSugar() {
        this._sugar = Math.min(2, this._sugar + 1);
    }

    makeDrink() {
        this._drinkMaker.make(this._createOrder());
        this._initialiseState();
    }

    _createOrder() {
        const hasSugar = this._sugar > 0;
        const sugarQuantity = hasSugar ? this._sugar : '';
        const stick = hasSugar ? 0 : '';
        return `${this._drink}:${sugarQuantity}:${stick}`;
    }
}