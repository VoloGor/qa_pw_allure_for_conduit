import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { UserSettingsPage } from '../../../src/ui/pages/UserSettings';
import { HomePage } from '../../../src/ui/pages/HomePage';

let userSettingsPage;
let homePage;

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Log out user test', async ({ page, user }) => {
  userSettingsPage = new UserSettingsPage(page, user.id);
  homePage = new HomePage(page, user.id);

  await userSettingsPage.open();
  await userSettingsPage.clickLogoutButton();

  await page.reload({ waitUntil: 'domcontentloaded' });

  await homePage.assertUrl();
  await homePage.assertProfileLinkIsNotVisible(user.username);
});
