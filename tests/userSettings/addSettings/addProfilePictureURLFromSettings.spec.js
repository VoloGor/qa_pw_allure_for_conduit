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
  await userSettingsPage.fillProfileImageField('https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg');
  await userSettingsPage.clickUpdateSettingsButton();
  await profilePage.open(user.username);
  await profilePage.assertProfileImageSrc('https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg');
});
