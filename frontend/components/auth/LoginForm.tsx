
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { RoutePath } from '../../types';
import { EnvelopeIcon, LockClosedIcon } from '../../assets/icons';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate(RoutePath.Dashboard);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'ログインに失敗しました。入力情報をご確認ください。');
      } else {
        setError('ログイン中に不明なエラーが発生しました。');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md text-center">{error}</p>}
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
      <Input
        id="password"
        label="パスワード"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="********"
        required
        IconComponent={LockClosedIcon}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-amber-500 border-amber-300 rounded focus:ring-amber-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-amber-700">
            ログイン状態を保存する
          </label>
        </div>
        <div className="text-sm">
          <Link to={RoutePath.ResetPassword} className="font-medium text-amber-600 hover:text-amber-700">
            パスワードをお忘れですか？
          </Link>
        </div>
      </div>
      <Button type="submit" variant="primary" className="w-full" isLoading={loading} size="lg">
        ログイン
      </Button>
    </form>
  );
};

export default LoginForm;