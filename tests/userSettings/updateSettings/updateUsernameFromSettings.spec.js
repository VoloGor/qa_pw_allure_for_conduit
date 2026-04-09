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

test('Update username from settings test', async ({ page, user }) => {
  userSettingsPage = new UserSettingsPage(page, user.id);
  profilePage = new ProfilePage(page, user.id);
  updatedUser = generateNewUserData();

  await userSettingsPage.open();
  await userSettingsPage.fillUsernameField(updatedUser.username);
  await userSettingsPage.clickUpdateSettingsButton();
  await profilePage.open(updatedUser.username);
  await profilePage.assertProfileUsername(updatedUser.username);
});
