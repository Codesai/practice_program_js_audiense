export class Printer {
    constructor(display) {
        this._display = display;
    }

    print(transactions) {
        this._display.show('date || credit || debit || balance');
        let balance = 0;
        transactions.map(({amount, date, type}) => {
            const formattedDate = this._formatDate(date);
            if (type === 'deposit') {
                balance += amount;
                return `${formattedDate} || ${(this._formatMoney(amount))} || || ${this._formatMoney(balance)}`;
            } else {
                balance -= amount;
                return `${formattedDate} || || ${(this._formatMoney(amount))} || ${this._formatMoney(balance)}`;
            }
        }).reverse().forEach(line => this._display.show(line));
    }

    _formatDate(date) {
        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    _formatMoney(amount) {
        return amount.toFixed(2);
    }
}