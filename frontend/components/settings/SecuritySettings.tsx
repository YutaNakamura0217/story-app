import React, { useState, FormEvent } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { LockClosedIcon, GoogleIcon, TwitterIcon } from '../../assets/icons';

const SecuritySettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 8) {
      setPasswordError('新しいパスワードは8文字以上で入力してください。');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('新しいパスワードが一致しません。');
      return;
    }

    setIsPasswordSubmitting(true);
    console.log('Changing password...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simulate API response
    if (currentPassword === "wrongpassword") {
        setPasswordError('現在のパスワードが正しくありません。');
    } else {
        setPasswordSuccess('パスワードが正常に変更されました。');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }
    setIsPasswordSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-amber-800 mb-4">パスワード変更</h2>
        {passwordError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md mb-3">{passwordError}</p>}
        {passwordSuccess && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md mb-3">{passwordSuccess}</p>}
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
          <Input
            id="currentPassword"
            label="現在のパスワード"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            IconComponent={LockClosedIcon}
            required
            className="bg-white"
          />
          <Input
            id="newPassword"
            label="新しいパスワード (8文字以上)"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            IconComponent={LockClosedIcon}
            required
            className="bg-white"
          />
          <Input
            id="confirmNewPassword"
            label="新しいパスワード (確認)"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            IconComponent={LockClosedIcon}
            required
            className="bg-white"
          />
          <Button type="submit" variant="primary" isLoading={isPasswordSubmitting}>
            パスワードを変更
          </Button>
        </form>
      </section>

      <hr className="border-amber-200" />

      <section>
        <h2 className="text-xl font-semibold text-amber-800 mb-4">ソーシャル連携</h2>
        <p className="text-sm text-amber-700 mb-4">
          お使いのソーシャルアカウントと連携して、簡単にログインできます。
        </p>
        <div className="space-y-3 max-w-xs">
          <Button variant="outline" className="w-full !border-amber-300 !text-amber-700 hover:!bg-amber-50" leftIcon={<GoogleIcon />}>
            Googleと連携する
          </Button>
          <Button variant="outline" className="w-full !border-blue-400 !text-blue-500 hover:!bg-blue-50" leftIcon={<TwitterIcon />}>
            Twitterと連携する
          </Button>
          {/* Add more social providers as needed */}
        </div>
         <p className="text-xs text-amber-600 mt-3">現在、Googleアカウントが連携されています。(連携解除ボタンは未実装)</p>
      </section>
    </div>
  );
};

export default SecuritySettings;
