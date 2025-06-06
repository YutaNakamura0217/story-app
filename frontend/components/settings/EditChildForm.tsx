import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { RoutePath, Child } from '../../types';
import { UserCircleIcon, CakeIcon, PhotoIcon, SparklesIcon, ArrowUpTrayIcon } from '../../assets/icons';
import { useChildren } from '../../hooks/useChildren';

const MOCK_AVATARS = [ // Should be in constants, but for simplicity here
  'https://picsum.photos/seed/avatar1/100/100',
  'https://picsum.photos/seed/avatar2/100/100',
  'https://picsum.photos/seed/avatar3/100/100',
  'https://picsum.photos/seed/avatar4/100/100',
  'https://picsum.photos/seed/avatar5/100/100',
];

interface EditChildFormProps {
  child: Child;
}

const EditChildForm: React.FC<EditChildFormProps> = ({ child }) => {
  const [name, setName] = useState(child.name);
  const [age, setAge] = useState(child.age.toString());
  const [avatarUrl, setAvatarUrl] = useState(child.avatarUrl || '');
  const [interests, setInterests] = useState((child.interests || []).join(', '));
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(child.avatarUrl || '');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { updateChild } = useChildren();

  useEffect(() => {
    setName(child.name);
    setAge(child.age.toString());
    setAvatarUrl(child.avatarUrl || '');
    setAvatarPreview(child.avatarUrl || '');
    setInterests((child.interests || []).join(', '));
  }, [child]);
  
  const handleAvatarFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setAvatarUrl(''); 
    }
  };
  
  const handleSelectPresetAvatar = (url: string) => {
    setAvatarUrl(url);
    setAvatarPreview(url);
    setAvatarFile(null);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'お名前は必須です。';
    if (!age.trim()) {
      newErrors.age = '年齢は必須です。';
    } else if (isNaN(Number(age)) || Number(age) < 0 || Number(age) > 18) {
      newErrors.age = '有効な年齢 (0〜18歳) を入力してください。';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const updatedChildData = {
      name,
      age: parseInt(age, 10),
      avatarUrl: avatarFile ? `local_file_preview_for_${avatarFile.name}` : avatarUrl,
      interests: interests.split(',').map(interest => interest.trim()).filter(i => i),
    };

    try {
      await updateChild(child.id, updatedChildData);
      navigate(RoutePath.ChildrenManage);
    } catch (error) {
      console.error('Failed to update child:', error);
      alert('お子様の情報更新に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-0 sm:p-4 bg-amber-50/30 rounded-lg">
       <Input
        id="childName"
        label="お名前 *"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        IconComponent={UserCircleIcon}
        error={errors.name}
        required
        className="bg-white"
      />
      <Input
        id="childAge"
        label="年齢 (0〜18歳) *"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        min="0" max="18"
        IconComponent={CakeIcon}
        error={errors.age}
        required
        className="bg-white"
      />
      
      <div>
        <label className="block text-sm font-medium text-amber-700 mb-1">アバターを選ぶ</label>
        <div className="p-4 border border-amber-200 rounded-lg bg-white">
          <div className="flex items-center gap-4 mb-4">
            <Avatar src={avatarPreview || undefined} alt={name || "Child"} size="lg" className="!border-amber-300" />
             <label htmlFor="avatarUploadEdit" className="cursor-pointer">
              <Button variant="outline" leftIcon={<ArrowUpTrayIcon />} as="span">
                画像をアップロード
              </Button>
              <input type="file" id="avatarUploadEdit" accept="image/*" onChange={handleAvatarFileChange} className="sr-only" />
            </label>
          </div>
          <p className="text-xs text-amber-600 mb-2 text-center">または、下の候補から選択 / URLを入力してください:</p>
          <div className="flex flex-wrap gap-3 justify-center mb-3">
            {MOCK_AVATARS.map((mockUrl) => (
              <button key={mockUrl} type="button" onClick={() => handleSelectPresetAvatar(mockUrl)} 
                      className={`rounded-full transition-all duration-150 border-2 hover:border-amber-500 ${(avatarUrl === mockUrl && !avatarFile) ? 'border-amber-500 ring-2 ring-amber-500' : 'border-transparent'}`}>
                <Avatar src={mockUrl} alt="Preset Avatar" size="md" />
              </button>
            ))}
          </div>
          <Input
            id="childAvatarUrlEdit"
            type="url"
            value={avatarUrl}
            onChange={(e) => { setAvatarUrl(e.target.value); setAvatarPreview(e.target.value); setAvatarFile(null); }}
            placeholder="またはアバター画像のURLを入力"
            IconComponent={PhotoIcon}
            className="bg-white text-xs"
            disabled={!!avatarFile}
          />
        </div>
      </div>

      <Input
        id="childInterestsEdit"
        label="興味のあること (任意、カンマ区切り)"
        type="text"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        placeholder="例: 宇宙, どうぶつ, なぜなぜ"
        IconComponent={SparklesIcon}
        className="bg-white"
      />

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button type="submit" variant="primary" className="w-full sm:w-auto" isLoading={isSubmitting} size="lg">
          変更を保存する
        </Button>
        <Button type="button" variant="outline" onClick={() => navigate(RoutePath.ChildrenManage)} className="w-full sm:w-auto" size="lg">
          キャンセル
        </Button>
      </div>
    </form>
  );
};

export default EditChildForm;