import { expect, testStep } from '../../common/helpers/pw';

export class ProfilePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.editProfileSettingsLink = page.getByRole('link', { name: 'Edit Profile Settings' });
    this.profileImage = page.locator('img.user-img');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open(username) {
    await this.step(`Open 'Profile' page`, async () => {
      await this.page.goto(`/profile/${username}`, { waitUntil: 'domcontentloaded' });
    });
  }

  async clickEditProfileSettingsLink() {
    await this.step(`Click the 'Edit Profile Settings' link`, async () => {
      await this.editProfileSettingsLink.click();
    });
  }

  getProfileUsername(username) {
    return this.page.getByRole('heading', { name: username });
  }
  getProfileBio(bio) {
    return this.page.locator('p', { hasText: bio });
  }
  async assertProfileBio(bio) {
    await this.step(`Assert the '${bio}' profile bio is shown`, async () => {
      await expect(this.getProfileBio(bio)).toBeVisible();
    });
  }
  
  async assertProfileUsername(username) {
    await this.step(`Assert the '${username}' profile username is shown`, async () => {
      await expect(this.getProfileUsername(username)).toBeVisible();
    });
  }
  async assertProfileImageSrc(expectedImageUrl) {
    await this.step(`Assert the profile image src is '${expectedImageUrl}'`, async () => {
      await expect(this.profileImage).toHaveAttribute('src', expectedImageUrl);
    });
  }
}