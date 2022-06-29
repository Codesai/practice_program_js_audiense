A subset of the [Bank Account kata](https://github.com/sandromancuso/Bank-kata).

Given an acceptance test for the following scenario:

    Given a client makes a deposit of 1000 on 10-01-2022
    And a deposit of 2000 on 13-01-2022
    And a withdrawal of 500 on 14-01-2022

    When she prints her bank statement

    Then she would see

    date       || credit  || debit  || balance
    14/01/2022 ||         || 500.00 || 2500.00
    13/01/2022 || 2000.00 ||        || 3000.00
    10/01/2022 || 1000.00 ||        || 1000.00

Write unit tests to incrementally develop the functionality required to make the acceptance test pass.

The goal of the exercise is to understand the outside-in TDD style.
