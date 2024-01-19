const { chromium } = require('playwright');
const { email, password } = require('./tests/user');

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://netology.ru/');
  await page.goto('https://netology.ru/?modal=sign_in');

  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(password);
  await page.getByTestId('login-submit-btn').click();
  await page.waitForSelector('h2');

  const profileHeaderText = await page.textContent('h2');
  if (profileHeaderText.includes('Моё обучение')) {
    console.log('Привет, Анна! Вы вошли в аккаунт');
  } else {
    console.log('Вы ввели неверно логин или пароль');
  }

  // ---------------------
  await context.close();
  await browser.close();
})();