import { test, expect } from "@playwright/test";

test("un usuario puede crear una tarea y verla en la lista", async ({ page }) => {

  await page.goto("/");

  const nombre = `Comprar pan ${Date.now()}`;

  await page
  .getByPlaceholder("Agrega una nueva tarea")
  .fill(nombre);

  await page
  .getByRole("button", { name: "Agregar" })
  .click();

  await expect(
  page.getByText(nombre).first()
).toBeVisible();

});