import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should not allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", {name: "Sign in"}).click();

  await expect(page.getByRole("heading", {name: "Sign in"})).toBeVisible()

  await page.locator("[name=email]").fill("huylinh626@gmail.com")
  await page.locator("[name=password]").fill("123123")

  await page.getByRole("button", {name: "Login"}).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible()
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign out"})).toBeVisible();
});

test("should allow test user to register",async ({page}) => {
  await page.goto(UI_URL)

  await page.getByRole("link", { name: "Sign in"}).click()
  await page.getByRole("link", { name: "Create an account here"}).click()
  await expect(page.getByRole("heading", { name: "Create an Account"})).toBeVisible()

  await page.locator("[name=firstName]").fill("test_firstName")
  await page.locator("[name=lastName]").fill("test_lastName")
  await page.locator("[name=email]").fill("test_register@test.com")
  await page.locator("[name=password]").fill("password123")
  await page.locator("[name=confirmPassword]").fill("password123")

  await page.getByRole("button", { name: "Create Account"}).click()

  await expect(page.getByText("Registration Success!")).toBeVisible()
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign out"})).toBeVisible();
})