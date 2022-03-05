const DEFAULT_PRICES = {
    C: 0.6,
    T: 0.4,
    H: 0.5
};

export class CoffeeMachine {
    constructor(drinkMaker, prices = DEFAULT_PRICES) {
        this._drinkMaker = drinkMaker;
        this._prices = prices;
        this._initialiseState();
    }

    _initialiseState() {
        this._drink = '';
        this._sugar = 0;
        this._money = 0;
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

    insertMoney(money) {
        this._money += money;
    }

    makeDrink() {
        const command = this._canServe(this._drink) ? this._order() : this._missingMoney();
        this._drinkMaker.send(command);
        this._initialiseState();
    }

    _canServe(drink) {
        return this._money >= this._priceOf(drink);
    }

    _priceOf(drink) {
        return this._prices[drink];
    }

    _order() {
        const hasSugar = this._sugar > 0;
        const sugarQuantity = hasSugar ? this._sugar : '';
        const stick = hasSugar ? 0 : '';
        return `${this._drink}:${sugarQuantity}:${stick}`;
    }

    _missingMoney() {
        const missingMoney = this._priceOf(this._drink) - this._money;
        return `M:Missing ${missingMoney.toFixed(2)} euros`;
    }
}