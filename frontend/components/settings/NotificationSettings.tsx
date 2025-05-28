import React, { useState } from 'react';

interface ToggleProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ id, label, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-amber-100 last:border-b-0">
      <div className="mr-4">
        <label htmlFor={id} className="text-sm font-medium text-amber-800 block">
          {label}
        </label>
        {description && <p className="text-xs text-amber-600">{description}</p>}
      </div>
      <button
        type="button"
        id={id}
        onClick={() => onChange(!checked)}
        className={`${
          checked ? 'bg-amber-500' : 'bg-gray-300'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2`}
        role="switch"
        aria-checked={checked}
      >
        <span
          aria-hidden="true"
          className={`${
            checked ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  );
};


const NotificationSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    newRecommendations: true,
    childProgressUpdates: true,
    platformAnnouncements: false,
    weeklySummary: true,
  });

  const handleToggle = (key: keyof typeof emailNotifications) => {
    setEmailNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    console.log(`Notification for ${key} toggled to: ${!emailNotifications[key]}`);
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold text-amber-800 mb-1">通知設定</h2>
      <p className="text-sm text-amber-700 mb-6">
        プラットフォームからの重要なお知らせや、お子様の学習に関する通知を受け取るかどうかを設定できます。
      </p>

      <div className="divide-y divide-amber-100">
        <ToggleSwitch
          id="newRecommendations"
          label="新しいおすすめ絵本の通知"
          description="お子様の興味に合わせた新しい絵本が追加された時にお知らせします。"
          checked={emailNotifications.newRecommendations}
          onChange={() => handleToggle('newRecommendations')}
        />
        <ToggleSwitch
          id="childProgressUpdates"
          label="お子様の進捗アップデート"
          description="お子様が新しいマイルストーンを達成したり、読書セッションを完了した時にお知らせします。"
          checked={emailNotifications.childProgressUpdates}
          onChange={() => handleToggle('childProgressUpdates')}
        />
        <ToggleSwitch
          id="platformAnnouncements"
          label="プラットフォームからのお知らせ"
          description="新機能やメンテナンス情報など、重要なお知らせを受け取ります。"
          checked={emailNotifications.platformAnnouncements}
          onChange={() => handleToggle('platformAnnouncements')}
        />
        <ToggleSwitch
          id="weeklySummary"
          label="週間の学習概要メール"
          description="週に一度、お子様の学習活動のサマリーをメールで受け取ります。"
          checked={emailNotifications.weeklySummary}
          onChange={() => handleToggle('weeklySummary')}
        />
      </div>
      <p className="text-xs text-amber-600 mt-6">
        通知設定はいつでも変更可能です。重要なセキュリティ関連の通知はオフにできません。
      </p>
    </div>
  );
};

export default NotificationSettings;
