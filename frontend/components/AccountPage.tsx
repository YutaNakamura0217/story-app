import React from 'react';
import SettingsListItem from './SettingsListItem';
import ToggleSwitch from './ToggleSwitch';

const AccountPage: React.FC = () => {
  const user = {
    name: "Emily Carter",
    username: "@emily.carter",
    profileImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgPQlyShs4L4oor7u69vONTcGaTkBgFu0zag6188kGPUVSuHDd7m5QmYO0rWm9aPDa8AEDcRdXVTHTVVjxp3EA0-wBF30Mv9O2r9RHv6jnmt_OXXzagkwBel4cL0VC0lYGvabl46X6gARanksKsRtDE47I83vYX2CZMmDo0M3b6ipijXtm3FiKTXwGeTs10-wicHv5jVgGZBi8lePtRw0p9vqAPEv49YozhmX7wx7gdcHeF9vLlilo2c9Ta4lmPazaxIhcaXOz2k57",
  };

  const appInfo = {
    name: "StoryTime App",
    tagline: "Share stories with your kids and create lasting memories.",
    promoImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuArDfyLtjSSrJsVC0BDqDHOtVUpv1UHOhlueme8V0Mm8KycysLKy3O_hALh-xy2tk5JzxuJRSfD2Rz_EZAIVF42z7U55mv3bb6k3VL-FLwnNw-wlBOlR6ML6F72yytQwEb7yRMOh1XYYGsY9OOYJd_y31IquCNcExJS0dVbn0DTgjZKRJdyys15k7VXtgGVrhOOD3TRcFOrhPujIs3hlT6KCz8LXdJMs32tFa6ooTAiRh91_ZXMsNI8nZwlmJp8Xf_-VKt6LA9quuJD",
    version: "1.2.3"
  };

  // Placeholder actions
  const handleChangeEmail = () => console.log("Change email clicked");
  const handleChangePassword = () => console.log("Change password clicked");
  const handleHelpCenter = () => console.log("Help center clicked");
  const handleContactUs = () => console.log("Contact us clicked");
  const handleTerms = () => console.log("Terms of service clicked");
  const handlePrivacy = () => console.log("Privacy policy clicked");
  const handleLogout = () => console.log("Log out clicked");
  const handleNotificationsToggle = (isChecked: boolean) => console.log("Notifications:", isChecked);
  const handleDarkModeToggle = (isChecked: boolean) => console.log("Dark Mode:", isChecked);
  const handleChangeProfilePicture = () => console.log("Change profile picture");
  const handleExplorePremium = () => console.log("Explore Premium clicked");


  return (
    <main className="flex-1 py-10 px-6 flex justify-center bg-amber-50"> {/* Ensure page background is amber-50 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Main Settings Column */}
        <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg text-amber-900">
          <h1 className="text-amber-900 tracking-tight text-4xl font-bold leading-tight mb-8">Account Settings</h1>
          
          <div className="flex items-center gap-6 mb-10 p-6 bg-amber-50 rounded-lg">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-white shadow-md" 
              style={{ backgroundImage: `url("${user.profileImageUrl}")` }}
              aria-label={`${user.name}'s profile picture`}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-amber-900 text-2xl font-bold leading-tight tracking-[-0.015em]">{user.name}</p>
              <p className="text-amber-500 text-base font-normal leading-normal">{user.username}</p>
              <button 
                onClick={handleChangeProfilePicture}
                className="mt-2 text-sm text-amber-500 hover:text-amber-600 font-medium text-left"
              >
                Change Profile Picture
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Account Section */}
            <div>
              <h3 className="text-amber-800 text-xl font-semibold leading-tight tracking-[-0.015em] mb-4 border-b pb-2 border-amber-200">Account</h3>
              <ul className="space-y-3">
                <SettingsListItem label="Change email" onClick={handleChangeEmail} />
                <SettingsListItem label="Change password" onClick={handleChangePassword} />
              </ul>
            </div>

            {/* Settings Section */}
            <div>
              <h3 className="text-amber-800 text-xl font-semibold leading-tight tracking-[-0.015em] mb-4 border-b pb-2 border-amber-200">Settings</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between p-4 hover:bg-amber-50 rounded-md transition-colors">
                  <span className="text-amber-700 text-base font-medium leading-normal">Notifications</span>
                  <ToggleSwitch id="notifications-toggle" label="Notifications" onChange={handleNotificationsToggle} />
                </li>
                <li className="flex items-center justify-between p-4 hover:bg-amber-50 rounded-md transition-colors">
                  <span className="text-amber-700 text-base font-medium leading-normal">Dark mode</span>
                  <ToggleSwitch id="darkmode-toggle" label="Dark mode" onChange={handleDarkModeToggle} />
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="text-amber-800 text-xl font-semibold leading-tight tracking-[-0.015em] mb-4 border-b pb-2 border-amber-200">Support</h3>
              <ul className="space-y-3">
                <SettingsListItem label="Help center" onClick={handleHelpCenter} />
                <SettingsListItem label="Contact us" onClick={handleContactUs} />
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="text-amber-800 text-xl font-semibold leading-tight tracking-[-0.015em] mb-4 border-b pb-2 border-amber-200">Legal</h3>
              <ul className="space-y-3">
                <SettingsListItem label="Terms of service" onClick={handleTerms} />
                <SettingsListItem label="Privacy policy" onClick={handlePrivacy} />
              </ul>
            </div>

            {/* Logout Button */}
            <div className="pt-6 border-t border-amber-200">
              <button 
                onClick={handleLogout}
                className="flex min-w-[120px] items-center justify-center rounded-lg h-11 px-6 bg-red-500 hover:bg-red-600 text-white text-base font-semibold leading-normal tracking-[0.015em] transition-colors"
              >
                <span className="truncate">Log out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Aside Column */}
        <aside className="md:col-span-1 bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center h-fit text-amber-900">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-36 w-36 mb-6 border-4 border-white shadow-lg" 
            style={{ backgroundImage: `url("${appInfo.promoImageUrl}")` }}
            aria-label="StoryTime App promotion image"
          ></div>
          <h3 className="text-amber-900 text-2xl font-bold leading-tight tracking-[-0.015em] mb-1">{appInfo.name}</h3>
          <p className="text-amber-500 text-base font-normal leading-normal mb-6">{appInfo.tagline}</p>
          <button 
            onClick={handleExplorePremium}
            className="w-full flex items-center justify-center rounded-lg h-11 px-6 bg-amber-500 hover:bg-amber-600 text-white text-base font-semibold leading-normal tracking-[0.015em] transition-colors"
          >
            <span className="truncate">Explore Premium</span>
          </button>
          <p className="text-xs text-amber-400 mt-4">Version {appInfo.version}</p>
        </aside>
      </div>
    </main>
  );
};

export default AccountPage;