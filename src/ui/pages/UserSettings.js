import { expect, testStep } from '../../common/helpers/pw';

export class UserSettingsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.profileImageField = page.getByPlaceholder('URL of profile picture');
    this.usernameField = page.getByPlaceholder('Username');
    this.bioField = page.getByPlaceholder('Short bio about you');
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('New Password');
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
    this.logoutButton = page.getByRole('button', {
      name: 'Or click here to logout.',
    });
    this.profileLink = page.getByRole('link', { name: 'your profile image' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Settings' page`, async () => {
      await this.page.goto('/settings', { waitUntil: 'domcontentloaded' });
    });
  }

  async fillProfileImageField(profileImage) {
    await this.step(`Fill the 'Profile Image' field`, async () => {
      await this.profileImageField.fill(profileImage);
    });
  }

  async fillUsernameField(username) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillBioField(bio) {
    await this.step(`Fill the 'Bio' field`, async () => {
      await this.bioField.fill(bio);
    });
  }

  async fillEmailField(email) {
    await this.step(`Fill the 'Email' field`, async () => {
      await this.emailField.fill(email);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickUpdateSettingsButton() {
    await this.step(`Click the 'Update Settings' button`, async () => {
      await this.updateSettingsButton.click();
    });
  }

  async clickLogoutButton() {
    await this.step(`Click the 'Logout' button`, async () => {
      await this.logoutButton.click();
    });
  }

  async clickProfileLink() {
    await this.step(`Click the 'Profile' link`, async () => {
      await this.profileLink.click();
    });
  }

  async assertProfileImageFieldValue(profileImage) {
    await this.step(`Assert the '${profileImage}' profile image is shown`, async () => {
      await expect(this.profileImageField).toHaveValue(profileImage);
    });
  }

  async assertUsernameFieldValue(username) {
    await this.step(`Assert the '${username}' username is shown`, async () => {
      await expect(this.usernameField).toHaveValue(username);
    });
  }

  async assertBioFieldValue(bio) {
    await this.step(`Assert the '${bio}' bio is shown`, async () => {
      await expect(this.bioField).toHaveValue(bio);
    });
  }

  async assertEmailFieldValue(email) {
    await this.step(`Assert the '${email}' email is shown`, async () => {
      await expect(this.emailField).toHaveValue(email);
    });
  }
}
