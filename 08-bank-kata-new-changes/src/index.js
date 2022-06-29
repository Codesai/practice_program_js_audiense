import {NodePersistTransactionRepository} from "./nodePersistTransactionRepository.js";
import Account from "./account.js";
import {Printer} from "./printer.js";

const repository = new NodePersistTransactionRepository('./transactions');
const calendar = {now() { return new Date(); }};
const printer = new Printer({show: console.log});

const account = new Account(repository, calendar, printer);
account.deposit(1000);
account.deposit(2000);
account.withdraw(500);
account.printStatement();