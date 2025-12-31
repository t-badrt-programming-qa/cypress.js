describe('Автотесты, Часть 1, автотесты для формы логина и пароля', function () {
    it('1. Позитивный кейс авторизации, верный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт со страницей авторизации
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяем css-цвет кнопки восстановления пароля.

        cy.get('#mail').type('german@dolnikov.ru') //Ввели верный логин
        cy.get('#pass').type('qa_one_love1') //Ввели верный пароль
        cy.get('#loginButton').click(); //Кликнули по кнопке "Войти"

        cy.get('#messageHeader').contains('Авторизация прошла успешно'); //Проверяем, что после успешной авторизации видим нужный нам текст.
        cy.get('#messageHeader').should('be.visible'); //Проверяем, что этот нужный нам текст виден пользователям.
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Проверяем, что на странице есть иконка крестика и она видна пользователям.
    })

    it('2. Проверка работы логики восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт со страницей авторизации.
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяем css-цвет кнопки восстановления пароля.

        cy.get('#forgotEmailButton').click(); //Нажимаем на кнопку восстановления пароля.

        cy.get('#mailForgot').type('german@dolnikov.ru'); //Ввели логин для восстановления пароля.
        cy.get('#restoreEmailButton').click(); //Кликаем по кнопке "Отправить код".

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); //Проверяем на совпадение с нужным текстом видимый после успешной отправки кода на почту текст.
        cy.get('#messageHeader').should('be.visible'); //Проверяем, что этот нужный нам текст виден пользователям.
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Проверяем, что на странице есть иконка крестика и она видна пользователям.
    })
    it('3. Негативный кейс авторизации, верный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт со страницей авторизации
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяем css-цвет кнопки восстановления пароля.

        cy.get('#mail').type('german@dolnikov.ru') //Ввели верный логин
        cy.get('#pass').type('qa_one_love5') //Ввели неверный пароль
        cy.get('#loginButton').click(); //Кликнули по кнопке "Войти"

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); //Проверяем, что после попытки авторизации мы видим нужный нам текст.
        cy.get('#messageHeader').should('be.visible'); //Проверяем, что этот нужный нам текст виден пользователям.
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Проверяем, что на странице есть иконка крестика и она видна пользователям.
    })
    it('4. Негативный кейс авторизации, неверный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт со страницей авторизации
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяем css-цвет кнопки восстановления пароля.

        cy.get('#mail').type('abc@abc.ru') //Ввели неверный логин
        cy.get('#pass').type('qa_one_love10') //Ввели верный пароль
        cy.get('#loginButton').click(); //Кликнули по кнопке "Войти"

        cy.get('#messageHeader').contains('Такого логина или пароля нет') //Проверяем, что после попытки авторизации мы видим нужный нам текст.
        cy.get('#messageHeader').should('be.visible'); //Проверяем, что этот нужный нам текст виден пользователям.
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Проверяем, что на странице есть иконка крестика и она видна пользователям.
    })
    it('5. Негативный кейс валидации, проверка, что в логине есть @', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт со страницей авторизации
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяем css-цвет кнопки восстановления пароля.

        cy.get('#mail').type('germandolnikov.ru') //Ввели логин без @.
        cy.get('#pass').type('qa_one_love1') //Ввели верный пароль.
        cy.get('#loginButton').click(); //Кликнули по кнопке "Войти".

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); //Проверяем, что после попытки авторизации получаем текст об ошибке валидации логина.
        cy.get('#messageHeader').should('be.visible'); //Проверяем, что этот текст об ошибке валидации логина виден пользователям.
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Проверяем, что на странице есть иконка крестика и она видна пользователям.
    })
    it('6. Кейс для проверки на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/'); //Зашли на сайт со страницей авторизации
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяем css-цвет кнопки восстановления пароля.

        cy.get('#mail').type('GerMan@Dolnikov.ru') //Ввели логин с символами из Upper и из Lower-регистров
        cy.get('#pass').type('qa_one_love1') //Ввели верный пароль.
        cy.get('#loginButton').click(); //Кликнули по кнопке "Войти".

        cy.get('#messageHeader').contains('Авторизация прошла успешно'); //Проверяем, что после попытки авторизации мы действительно видим именно текст «Авторизация прошла успешно»
        cy.get('#messageHeader').should('be.visible'); //Проверяем, что этот нужный нам текст виден пользователям.
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //Проверяем, что на странице есть иконка крестика и она видна пользователям.
        //6 тест падает и не проходит, как и описано в условии этой задачи, поскольку разработчик допустил баг в 6 автотесте и не реализовал пункт #2 из требований к задаче, мы действительно этим автотестом "поймали" баг, который допустил разработчик.
    })
})