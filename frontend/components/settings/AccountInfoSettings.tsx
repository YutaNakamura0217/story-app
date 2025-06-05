import React, { useState, FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { EnvelopeIcon } from '../../assets/icons';
import { api } from '../../api';

const AccountInfoSettings: React.FC = () => {
  const { user } = useAuth();
  const [currentEmail, setCurrentEmail] = useState(user?.email || '');
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (newEmail !== confirmEmail) {
      setError('新しいメールアドレスが一致しません。');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setError('有効なメールアドレスを入力してください。');
      return;
    }

    setIsSubmitting(true);
    try {
      await api('/users/me/change-email', {
        method: 'PUT',
        body: JSON.stringify({ new_email: newEmail })
      });
      setSuccessMessage('メールアドレスを変更しました');
      setCurrentEmail(newEmail);
      setNewEmail('');
      setConfirmEmail('');
    } catch (err: any) {
      console.error(err);
      setError('変更に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg space-y-6">
      <h2 className="text-xl font-semibold text-amber-800">基本情報</h2>
      {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
      {successMessage && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">{successMessage}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="currentEmail" className="block text-sm font-medium text-amber-700 mb-1">現在のメールアドレス</label>
          <Input
            id="currentEmail"
            type="email"
            value={currentEmail}
            readOnly
            disabled
            IconComponent={EnvelopeIcon}
            className="bg-amber-100 !border-amber-200 cursor-not-allowed"
          />
        </div>
        <Input
          id="newEmail"
          label="新しいメールアドレス"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="new.address@example.com"
          IconComponent={EnvelopeIcon}
          required
          className="bg-white"
        />
        <Input
          id="confirmEmail"
          label="新しいメールアドレス (確認)"
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          placeholder="new.address@example.com"
          IconComponent={EnvelopeIcon}
          required
          className="bg-white"
        />
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          メールアドレスを変更する
        </Button>
      </form>
    </div>
  );
};

export default AccountInfoSettings;
