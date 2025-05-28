import React from 'react';
import Tabs, { Tab } from '../../components/ui/Tabs';
import AccountInfoSettings from '../../components/settings/AccountInfoSettings';
import SecuritySettings from '../../components/settings/SecuritySettings';
import NotificationSettings from '../../components/settings/NotificationSettings';
import SubscriptionSettings from '../../components/settings/SubscriptionSettings';

const AccountSettingsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 tracking-tight">
        アカウント設定
      </h1>
      <Tabs tabPanelClassName="min-h-[300px] pt-2">
        <Tab label="基本情報">
          <AccountInfoSettings />
        </Tab>
        <Tab label="セキュリティ">
          <SecuritySettings />
        </Tab>
        <Tab label="通知設定">
          <NotificationSettings />
        </Tab>
        <Tab label="プラン・お支払い">
          <SubscriptionSettings />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AccountSettingsPage;
