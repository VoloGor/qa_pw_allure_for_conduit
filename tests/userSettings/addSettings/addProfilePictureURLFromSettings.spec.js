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

test('Add profile picture URL from settings test', async ({ page, user }) => {
  userSettingsPage = new UserSettingsPage(page, user.id);
  profilePage = new ProfilePage(page, user.id);
  updatedUser = generateNewUserData();

  await userSettingsPage.open();
  await userSettingsPage.fillProfileImageField(updatedUser.image);
  await userSettingsPage.clickUpdateSettingsButton();
  await profilePage.open(user.username);
  await profilePage.assertProfileImageSrc(updatedUser.image);
});
