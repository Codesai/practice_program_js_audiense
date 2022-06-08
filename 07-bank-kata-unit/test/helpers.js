export function aDeposit(amount, date) {
    return {amount, date, type: 'deposit'};
}

export function aWithdrawal(amount, date) {
    return {amount, date, type: 'withdrawal'};
}

export function date(year, month, day) {
    return new Date(year, month - 1, day);
}