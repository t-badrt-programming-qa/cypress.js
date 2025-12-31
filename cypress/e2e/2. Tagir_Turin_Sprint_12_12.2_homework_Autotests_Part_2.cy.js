describe('Автотесты, Часть 2, сквозной e2e автотест для сайта покемонов.', function () {
    it('1. сквозной e2e автотест для покемонов на покупку нового аватара для своего тренера.', function () {
        cy.visit('https://pokemonbattle.ru/'); //Зашли на сайт с покемонами.
        cy.get('#k_email').type('USER_LOGIN'); //Ввели логин.
        cy.get('#k_password').type('USER_PASSWORD'); //Ввели пароль.
        cy.get('.MuiButton-root').click(); //Кликнули по кнопке "Войти".
        cy.wait(2000);

        cy.get('.header_card_trainer').click(); //Кликаем в шапке на аву тренера.
        cy.wait(2000);
        cy.get('[data-qa="shop"]').click(); //Нажимаем на кнопку "Смена аватара".
        cy.get('.available > button').first().click(); //Кликаем на кнопку "Купить" у первого доступного аватара.

        cy.get('.payment_form_card_form > :nth-child(2) > .style_1_base_input').type('4111 1111 1111 1111'); //Вводим номер карты.
        cy.get(':nth-child(1) > .style_1_base_input').type('12/34'); //Вводим срок действия карты.
        cy.get('.payment_form_card_form_inputs > :nth-child(2) > .style_1_base_input').type('125'); //Вводим CVV карты.
        cy.get('.payment_form_card_form_input_last > .style_1_base_input').type('NAME'); //Вводим имя владельца действия карты.
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); //Нажимаем кнопку "Оплатить".
        cy.get('.style_1_base_input').type('56456'); // Вводим код подтверждения из SMS.
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); //Нажимаем кнопку "Оплатить".

        cy.get('.payment_status_top_title').contains('Покупка прошла успешно'); //Проверяем наличие сообщения об успешной покупке.
        cy.get('.payment_status_top_title').should('be.visible'); //Проверяем видимость сообщения об успешной покупке.
        //cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения об успешной покупке
    })
})