const { test, expect } = require('@playwright/test');

//tests in a single file run sequencially
//tests in separate fiels run in parallel

test('Login Page', async ({ browser }) => {
    // Test code goes here, add async to function - sageata e anonymous function, fara nume
    //open browser
    //await
    //input some stuff
    //await
    //click some button
    //await
    //asynchronous
    //add explicit waits - await

    //fresh browser instance
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://demo.applitools.com/');


});

test('Sauce Demo Invalid Login', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('standard_user222');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    console.log(await page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3').textContent());




});

test('Sauce Demo Valid Login', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('standard_user');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    expect(await page.locator('//*[@id="header_container"]/div[2]/span').textContent() == 'Products');



});

test('Add first item', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('standard_user');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    expect(await page.locator('//*[@id="header_container"]/div[2]/span').textContent() == 'Products');
    const nthBtnIndex = 0;
    const nthButtonSelector = `(//div[@class='inventory_list']//div[@class='inventory_item'])[${nthBtnIndex + 1}]//div[2]//button`;
    const nthBtn = page.locator(nthButtonSelector);
    await nthBtn.click();
    console.log(await nthBtn.textContent());
    expect(await nthBtn.textContent() == 'Remove');

});

test('Add second item', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('standard_user');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    expect(await page.locator('//*[@id="header_container"]/div[2]/span').textContent() == 'Products');
    const nthBtnIndex = 1;
    const nthButtonSelector = `(//div[@class='inventory_list']//div[@class='inventory_item'])[${nthBtnIndex + 1}]//div[2]//button`;
    const nthBtn = page.locator(nthButtonSelector);
    await nthBtn.click();
    console.log(await nthBtn.textContent());
    expect(await nthBtn.textContent() == 'Remove');

});