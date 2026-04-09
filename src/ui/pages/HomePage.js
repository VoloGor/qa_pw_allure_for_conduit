import { expect, testStep } from '../../common/helpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }
  getProfileLink(username) {
    return this.page.getByRole('link', { name: username });
  }

  async assertProfileLinkIsVisible(username) {
    await this.step(`Assert the '${username}' profile link is visible`, async () => {
      await expect(this.getProfileLink(username)).toBeVisible();
    });
  }

  async assertProfileLinkIsNotVisible(username) {
    await this.step(`Assert the '${username}' profile link is not visible`, async () => {
      await expect(this.getProfileLink(username)).toBeHidden();
    });
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async clickSettingsLink() {
    await this.step(`Click the 'Settings' link`, async () => {
      await this.settingsLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }
  async assertUrl() {
    await this.step(`Assert the URL is correct`, async () => {
      await expect(this.page).toHaveURL('/');
    });
  }
}
