const { test, expect } = require('@playwright/test');

//tests in a single file run sequencially
//tests in separate fiels run in parallel

test('Login required', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    const message = await page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3').textContent();
    expect(message).toEqual("Epic sadface: You can only access '/inventory.html' when you are logged in.");

});

test('Logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('problem_user');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    expect(await page.locator('//*[@id="header_container"]/div[2]/span').textContent()).toEqual('Products');
    await page.locator('//*[@id="react-burger-menu-btn"]').click();
    await page.locator('//*[@id="logout_sidebar_link"]').click();
    console.log(`current page: ${page.url()}`);
    expect(page.url()).toEqual('https://www.saucedemo.com/');

});

test('About page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('problem_user');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    expect(await page.locator('//*[@id="header_container"]/div[2]/span').textContent()).toEqual('Products');
    await page.locator('//*[@id="react-burger-menu-btn"]').click();
    await page.locator('//*[@id="about_sidebar_link"]').click();
    console.log(`current page: ${page.url()}`);
    expect(page.url()).toEqual('https://saucelabs.com/');

});

test('Sauce Demo Invalid Login', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('standard_user222222');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    const message = await page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3').textContent();
    console.log(message);
    expect(message).toEqual('Epic sadface: Username and password do not match any user in this service');

});

test('Sauce Demo Locked out User', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('locked_out_user');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    const message = await page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3').textContent();
    console.log(message);
    expect(message).toEqual('Epic sadface: Sorry, this user has been locked out.');

});

test('Sauce Demo Valid Login', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('problem_user');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    expect(await page.locator('//*[@id="header_container"]/div[2]/span').textContent()).toEqual('Products');

});

test('Add first item', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('problem_user');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    expect(await page.locator('//*[@id="header_container"]/div[2]/span').textContent() == 'Products');
    const nthBtnIndex = 0;
    const nthButtonSelector = `(//div[@class='inventory_list']//div[@class='inventory_item'])[${nthBtnIndex + 1}]//div[2]//button`;
    const nthBtn = page.locator(nthButtonSelector);
    await nthBtn.click();
    console.log(await nthBtn.textContent());
    expect(await nthBtn.textContent()).toEqual('Remove');

});

test('Add second item', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('problem_user');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    expect(await page.locator('//*[@id="header_container"]/div[2]/span').textContent() == 'Products');
    const nthBtnIndex = 1;
    const nthButtonSelector = `(//div[@class='inventory_list']//div[@class='inventory_item'])[${nthBtnIndex + 1}]//div[2]//button`;
    const nthBtn = page.locator(nthButtonSelector);
    await nthBtn.click();
    console.log(await nthBtn.textContent());
    expect(await nthBtn.textContent()).toEqual('Remove');

});

test('Select filter option', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('problem_user');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    const dropdown = page.locator('select.product_sort_container');
    await dropdown.selectOption('za');

});

test('Items added match cart badge', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('//*[@id="user-name"]').type('problem_user');
    await page.locator('//*[@id="password"]').type('secret_sauce');
    await page.locator('//*[@id="login-button"]').click();
    expect(await page.locator('//*[@id="header_container"]/div[2]/span').textContent() == 'Products');

    const inventoryItems = await page.$$('.inventory_item');
    let numItemsInCart = 0;
    console.log(`Number of inventory items found: ${inventoryItems.length}`);

    for (const item of inventoryItems) {
        const buttonXPath = `(//div[@class='inventory_list']//div[@class='inventory_item'])[${inventoryItems.indexOf(item) + 1}]//div[2]//button`;
        const button = page.locator(buttonXPath);
        await button.click();
        numItemsInCart++;

    }
    const cartBadge = page.locator('//*[@id="shopping_cart_container"]/a/span');
    const cartBadgeText = await cartBadge.textContent();
    const expectedCartBadgeText = numItemsInCart.toString();
    console.log(`Cart badge text: ${cartBadgeText} - Actual items added: ${expectedCartBadgeText}`);
    expect(cartBadgeText).toEqual(expectedCartBadgeText);

});