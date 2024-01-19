const { test, expect } = require ('@playwright/test');

const { email, password } = require('./user');

test('Успешная авторизация', async ({ page }) => {
  // Открываем форму авторизации

  await page.goto('https://netology.ru/?modal=sign_in');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(password);
  await page.getByTestId('login-submit-btn').click();

  // Проверяем, что открылась страница профиля
  await expect(page.getByRole('heading', { name: 'Моё обучение' })).toBeVisible({timeout: 100000});
 
  // Проверяем, что текст заголовка соответствует ожидаемому
  await expect(page.locator('h2')).toContainText('Моё обучение');
}, { timeout: 100000000 });

test('Неуспешная авторизация', async ({ page }) => {
  // Открываем форму авторизации

  await page.goto('https://netology.ru/?modal=sign_in');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('qweqrtye@mail.ru');
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill('123456789');
  await page.getByTestId('login-submit-btn').click();

  // Проверяем текст об ошибке
  await expect(page.getByTestId('login-error-hint')).toBeVisible();
  await expect(page.getByTestId('login-error-hint')).toContainText('Вы ввели неправильно логин или пароль');
}, { timeout: 100000000 });