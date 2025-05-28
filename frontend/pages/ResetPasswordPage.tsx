
import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import { RoutePath } from '../types';
import { EnvelopeIcon, ArrowUturnLeftIcon } from '../assets/icons';

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simulate API call for password reset request
    console.log('Password reset requested for:', email);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoading(false);
    setMessage('パスワードリセットの手順を記載したメールを送信しました。メールをご確認ください。');
    // Optionally, redirect or clear form after a delay
    // setTimeout(() => navigate(RoutePath.Login), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header variant="simple" />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-amber-900">パスワードリセット</h2>
            <p className="mt-2 text-sm text-amber-700">
              ご登録のメールアドレスを入力してください。パスワード再設定のためのリンクをお送りします。
            </p>
          </div>
          <Card className="shadow-xl border-amber-100">
            <CardContent className="p-8 sm:p-10">
              {message ? (
                <div className="text-center">
                  <p className="text-green-600 bg-green-100 p-3 rounded-md mb-6">{message}</p>
                  <Button onClick={() => navigate(RoutePath.Login)} variant="primary" className="w-full">
                    ログインページへ戻る
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    id="email"
                    label="メールアドレス"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    IconComponent={EnvelopeIcon}
                  />
                  <Button type="submit" variant="primary" className="w-full" isLoading={loading} size="lg">
                    リセットメールを送信
                  </Button>
                </form>
              )}
              {!message && (
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

export default ResetPasswordPage;