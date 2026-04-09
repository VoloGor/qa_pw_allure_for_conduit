import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { UserSettingsPage } from '../../../src/ui/pages/UserSettings';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';
import { SignInPage } from '../../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../../src/ui/pages/HomePage';

let userSettingsPage;
let updatedUser;
let signInPage;
let homePage;

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Update password from settings test', async ({ page, user }) => {
  userSettingsPage = new UserSettingsPage(page, user.id);
  updatedUser = generateNewUserData();
  signInPage = new SignInPage(page);
  homePage = new HomePage(page, user.id);

  await userSettingsPage.open();
  await userSettingsPage.fillPasswordField(updatedUser.password);
  await userSettingsPage.clickUpdateSettingsButton();
  await page.waitForLoadState('domcontentloaded');

  await userSettingsPage.clickLogoutButton();
  await page.reload({ waitUntil: 'domcontentloaded' });

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(updatedUser.password);
  await signInPage.clickSignInButton();
  await page.waitForLoadState('domcontentloaded');

  await homePage.assertProfileLinkIsVisible(user.username);
});
