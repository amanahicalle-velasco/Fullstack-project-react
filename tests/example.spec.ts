/*import { test, expect } from "@playwright/test";

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

});*/
import { test, expect } from "@playwright/test";

test("un usuario puede crear una tarea y verla en la lista", async ({ page }) => {

  page.on("response", async (response) => {
    if (response.url().includes("/tasks")) {
      console.log(
        response.request().method(),
        response.url(),
        response.status()
      );
    }
  });

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