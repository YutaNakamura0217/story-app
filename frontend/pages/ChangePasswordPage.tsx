import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import { RoutePath } from '../types';
import { LockClosedIcon, ArrowUturnLeftIcon } from '../assets/icons';

const ChangePasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (newPassword.length < 8) {
      setError('新しいパスワードは8文字以上で入力してください。');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('新しいパスワードが一致しません。');
      return;
    }

    setLoading(true);
    // Simulate API call for password change
    console.log('Attempting to change password to:', newPassword);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoading(false);
    setSuccessMessage('パスワードが正常に更新されました。ログインページへリダイレクトします。');
    setTimeout(() => navigate(RoutePath.Login), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header variant="simple" />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-amber-900">新しいパスワードを設定</h2>
            <p className="mt-2 text-sm text-amber-700">
              新しいパスワードを入力し、確認のためもう一度入力してください。
            </p>
          </div>
          <Card className="shadow-xl border-amber-100">
            <CardContent className="p-8 sm:p-10">
              {successMessage ? (
                <div className="text-center">
                  <p className="text-green-600 bg-green-100 p-3 rounded-md mb-6">{successMessage}</p>
                  <Button onClick={() => navigate(RoutePath.Login)} variant="primary" className="w-full">
                    ログインページへ
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
                  <Input
                    id="newPassword"
                    label="新しいパスワード (8文字以上)"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="********"
                    required
                    IconComponent={LockClosedIcon}
                  />
                  <Input
                    id="confirmNewPassword"
                    label="新しいパスワード (確認)"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="********"
                    required
                    IconComponent={LockClosedIcon}
                  />
                  <Button type="submit" variant="primary" className="w-full" isLoading={loading} size="lg">
                    パスワードを更新する
                  </Button>
                </form>
              )}
              {!successMessage && (
                 <p className="mt-6 text-center text-sm">
                  <Link to={RoutePath.Login} className="font-medium text-amber-600 hover:text-amber-700 flex items-center justify-center">
                    <ArrowUturnLeftIcon className="w-4 h-4 mr-1" />
                    ログインページへ戻る
                  </Link>
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer variant="simple" />
    </div>
  );
};

export default ChangePasswordPage;