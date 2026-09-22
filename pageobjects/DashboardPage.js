class DashboardPage {

  constructor(page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cart = page.locator('[routerlink="/dashboard/cart"]');
    this.userName = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
  }

  async searchproductAddtoCart(productName) {

    await this.products.first().waitFor();

    const Titles = await this.products.allTextContents();

    const count = await this.products.count();

    for (let i = 0; i < count; i++) {
      if (await this.products.nth(i).locator('b').textContent() === productName) {
        await this.products.nth(i).locator("text=' Add To Cart'").click();
        break;
      }
    }
  }

  async naviagateToCart() {
    await this.cart.click();
  }




}

module.exports = { DashboardPage };