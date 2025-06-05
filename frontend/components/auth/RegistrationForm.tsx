
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { RoutePath } from '../../types';
import { UserCircleIcon, EnvelopeIcon, LockClosedIcon as PasswordIcon, AcademicCapIcon, IdentificationIcon, CakeIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { api } from '../../api';

type UserType = 'parent' | 'teacher';

interface ChildData {
  id: string;
  name: string;
  age: string; 
  avatarUrl: string;
}

const RegistrationForm: React.FC = () => {
  const [userType, setUserType] = useState<UserType>('parent');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [childrenInfo, setChildrenInfo] = useState<ChildData[]>([{ id: Date.now().toString(), name: '', age: '', avatarUrl: '' }]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddChild = () => {
    if (childrenInfo.length < 5) {
      setChildrenInfo([...childrenInfo, { id: Date.now().toString(), name: '', age: '', avatarUrl: '' }]);
    }
  };

  const handleRemoveChild = (id: string) => {
    setChildrenInfo(childrenInfo.filter(child => child.id !== id));
  };

  const handleChildInfoChange = (id: string, field: keyof Omit<ChildData, 'id'>, value: string) => {
    setChildrenInfo(childrenInfo.map(child => child.id === id ? { ...child, [field]: value } : child));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = '氏名は必須です。';
    if (!email.trim()) {
      newErrors.email = 'メールアドレスは必須です。';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください。';
    }
    if (!password) {
      newErrors.password = 'パスワードは必須です。';
    } else if (password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください。';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません。';
    }
    if (userType === 'parent') {
      childrenInfo.forEach((child, index) => {
        if (!child.name.trim()) newErrors[`childName_${index}`] = 'お子様の名前は必須です。';
        if (!child.age.trim()) {
          newErrors[`childAge_${index}`] = 'お子様の年齢は必須です。';
        } else if (isNaN(Number(child.age)) || Number(child.age) < 0 || Number(child.age) > 18 ) { // Added more specific age validation
           newErrors[`childAge_${index}`] = '有効な年齢(0-18歳)を入力してください。';
        }
      });
    }
    if (!termsAccepted) newErrors.terms = '利用規約への同意が必要です。';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const payload = {
      name,
      email,
      password,
    };
    try {
      await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      alert('会員登録が完了しました！ログインページに移動します。');
      navigate(RoutePath.Login);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('登録に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <Card className="border-amber-100">
        <CardHeader className="border-b-amber-100">
          <h3 className="text-xl font-semibold text-amber-900">アカウント種別を選択</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            {(['parent', 'teacher'] as UserType[]).map((type) => (
              <label
                key={type}
                className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  userType === type ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500' : 'bg-gray-50 hover:border-amber-300 border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="userType"
                  value={type}
                  checked={userType === type}
                  onChange={() => setUserType(type)}
                  className="sr-only" 
                />
                <div className="flex items-center">
                  {type === 'parent' ? <IdentificationIcon className="w-6 h-6 mr-2 text-amber-500" /> : <AcademicCapIcon className="w-6 h-6 mr-2 text-amber-500" />}
                  <span className="font-medium text-amber-900">{type === 'parent' ? '保護者として登録' : '教育者として登録'}</span>
                </div>
                <p className="text-xs text-amber-700 mt-1">
                  {type === 'parent' ? 'お子様の学習進捗を管理します。' : 'クラスや生徒の学習をサポートします。'}
                </p>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-100">
        <CardHeader className="border-b-amber-100">
          <h3 className="text-xl font-semibold text-amber-900">基本情報</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            id="name"
            label="氏名"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="山田 太郎"
            IconComponent={UserCircleIcon}
            error={errors.name}
            required
          />
          <Input
            id="email"
            label="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            IconComponent={EnvelopeIcon}
            error={errors.email}
            required
          />
          <Input
            id="password"
            label="パスワード (8文字以上)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            IconComponent={PasswordIcon}
            error={errors.password}
            required
          />
          <Input
            id="confirmPassword"
            label="パスワード確認"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            IconComponent={PasswordIcon}
            error={errors.confirmPassword}
            required
          />
        </CardContent>
      </Card>

      {userType === 'parent' && (
        <Card className="border-amber-100">
          <CardHeader className="border-b-amber-100">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-amber-900">お子様の情報</h3>
              <Button type="button" variant="ghost" size="sm" onClick={handleAddChild} disabled={childrenInfo.length >= 5}>
                お子様を追加
              </Button>
            </div>
             <p className="text-xs text-amber-700 mt-1">最大5名まで登録できます。</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {childrenInfo.map((child, index) => (
              <div key={child.id} className="p-4 border border-amber-200 rounded-md space-y-4 relative bg-amber-50/50">
                {childrenInfo.length > 1 && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveChild(child.id)} 
                    className="absolute top-2 right-2 !text-red-500 hover:!bg-red-100 px-2 py-1"
                    aria-label="お子様の情報を削除"
                  >
                    削除
                  </Button>
                )}
                 <h4 className="text-md font-medium text-amber-800">お子様 {index + 1}</h4>
                <Input
                  id={`childName_${index}`}
                  label="お名前"
                  type="text"
                  value={child.name}
                  onChange={(e) => handleChildInfoChange(child.id, 'name', e.target.value)}
                  placeholder="はなこ"
                  IconComponent={IdentificationIcon}
                  error={errors[`childName_${index}`]}
                  required
                />
                <Input
                  id={`childAge_${index}`}
                  label="年齢 (0-18歳)"
                  type="number"
                  value={child.age}
                  onChange={(e) => handleChildInfoChange(child.id, 'age', e.target.value)}
                  placeholder="5"
                  min="0" max="18"
                  IconComponent={CakeIcon}
                  error={errors[`childAge_${index}`]}
                  required
                />
                <Input
                  id={`childAvatarUrl_${index}`}
                  label="アバターURL (任意)"
                  type="url"
                  value={child.avatarUrl}
                  onChange={(e) => handleChildInfoChange(child.id, 'avatarUrl', e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  IconComponent={PhotoIcon}
                  error={errors[`childAvatarUrl_${index}`]}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-100 space-y-4">
        <div className="flex items-start">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="h-4 w-4 text-amber-500 border-amber-300 rounded focus:ring-amber-500 mt-1"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-amber-700">
            <a href={RoutePath.Terms} target="_blank" rel="noopener noreferrer" className="font-medium text-amber-600 hover:text-amber-700">利用規約</a> と 
            <a href={RoutePath.Privacy} target="_blank" rel="noopener noreferrer" className="font-medium text-amber-600 hover:text-amber-700 ml-1">プライバシーポリシー</a> に同意します。
          </label>
        </div>
        {errors.terms && <p className="text-xs text-red-600">{errors.terms}</p>}

        <Button type="submit" variant="primary" className="w-full" isLoading={loading} size="lg">
          アカウントを作成する
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;