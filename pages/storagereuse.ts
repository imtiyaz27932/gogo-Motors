import { Page } from "@playwright/test";

export class MajozPaymentFlowPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;

  }

  //Selectors

  readonly loginicon = () => this.page.getByRole("button", { name: "login" });
  readonly PhoneNumber = () => this.page.getByRole('textbox', { name: 'Mobile Number' });
  readonly proceedBtn = () => this.page.getByRole('button', { name: 'Proceed' });
  readonly otpfield = () => this.page.locator('input[name="OTPNumber"]');
  readonly signinbtn = () => this.page.getByRole('button', { name: 'Sign In' });


  async Login() {
    await  this.page.goto('https://liveuat.gogomotor.com/en');
    await this.loginicon().click();
    await this.page.getByRole('combobox').selectOption('+966');
    await this.PhoneNumber().fill('531938880');
    await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(3000);
    await this.proceedBtn().click();

    await this.otpfield().fill('9461')
    await this.signinbtn().click();
    await this.page.waitForLoadState('networkidle');
  }

}


