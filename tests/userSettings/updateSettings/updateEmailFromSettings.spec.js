import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { UserSettingsPage } from '../../../src/ui/pages/UserSettings';
import { ProfilePage } from '../../../src/ui/pages/ProfilePage';
import { generateNewUserData } from '../../../src/common/testData/generateNewUserData';

let userSettingsPage;
let profilePage;
let updatedUser;

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Update email from settings test', async ({ page, user }) => {
  userSettingsPage = new UserSettingsPage(page, user.id);
  profilePage = new ProfilePage(page, user.id);
  updatedUser = generateNewUserData();

  await userSettingsPage.open();
  await userSettingsPage.fillEmailField(updatedUser.email);
  await userSettingsPage.clickUpdateSettingsButton();
  await userSettingsPage.assertEmailFieldValue(updatedUser.email);
  await page.waitForLoadState('domcontentloaded');

  await userSettingsPage.clickProfileLink(user.username);
  await profilePage.clickEditProfileSettingsLink();
  await userSettingsPage.assertEmailFieldValue(updatedUser.email);
});
