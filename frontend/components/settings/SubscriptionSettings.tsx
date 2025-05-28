import React from 'react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Link } from 'react-router-dom'; // Assuming RoutePath.Pricing exists or will be added
import { RoutePath } from '../../types'; 
import { CreditCardIcon, CalendarDaysIcon, SparklesIcon } from '../../assets/icons';


const SubscriptionSettings: React.FC = () => {
  // Mock user's current plan
  const currentPlan = {
    name: 'プレミアムプラン',
    price: '月額 ¥980',
    renewalDate: new Date(Date.now() + 86400000 * 20).toLocaleDateString('ja-JP'), // 20 days from now
    features: [
      'すべてのプレミアム絵本が読み放題',
      '最大5人までのお子様登録',
      '詳細な学習進捗レポート',
      '限定ワークショップへの優先アクセス',
      '広告なしの快適な読書体験',
    ],
    isPremium: true,
  };

  // const currentPlan = { name: '無料プラン', price: '¥0', renewalDate: null, features: ['一部の絵本が読み放題', 'お子様1人まで登録可能'], isPremium: false };


  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-amber-800 mb-1">現在のプラン</h2>
        <div className={`p-6 rounded-lg border ${currentPlan.isPremium ? 'bg-amber-50 border-amber-300 shadow-lg' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
              <h3 className="text-2xl font-bold text-amber-900 flex items-center">
                {currentPlan.name}
                {currentPlan.isPremium && <SparklesIcon className="w-6 h-6 text-yellow-500 ml-2" />}
              </h3>
              <p className="text-amber-700">{currentPlan.price}</p>
            </div>
            <Link to={RoutePath.Home /* Replace with actual pricing page path if exists */} className="mt-3 sm:mt-0">
              <Button variant={currentPlan.isPremium ? "outline" : "primary"} className="rounded-full">
                {currentPlan.isPremium ? 'プランを管理' : 'プランをアップグレード'}
              </Button>
            </Link>
          </div>
          
          <h4 className="text-sm font-medium text-amber-800 mb-2">プランに含まれる内容:</h4>
          <ul className="space-y-1 text-sm text-amber-700 list-disc list-inside">
            {currentPlan.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>

          {currentPlan.renewalDate && (
            <p className="text-xs text-amber-600 mt-4 flex items-center">
              <CalendarDaysIcon className="w-4 h-4 mr-1.5"/>
              次回の更新日: {currentPlan.renewalDate}
            </p>
          )}
        </div>
      </section>

      <hr className="border-amber-200" />

      <section>
        <h2 className="text-xl font-semibold text-amber-800 mb-4">お支払い情報</h2>
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center mb-3">
            <CreditCardIcon className="w-8 h-8 text-amber-500 mr-3"/>
            <div>
                <p className="text-sm font-medium text-amber-800">Visa カード (末尾 **** 1234)</p>
                <p className="text-xs text-amber-600">有効期限: 12/2025</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-md">支払い方法を変更</Button>
          <p className="text-xs text-amber-600 mt-3">
            お支払い情報の変更は、安全な決済プロバイダーのページで行われます。
          </p>
        </div>
      </section>
      
      <hr className="border-amber-200" />

      <section>
        <h2 className="text-xl font-semibold text-amber-800 mb-4">請求履歴</h2>
        <div className="overflow-x-auto bg-white rounded-lg border border-amber-100 shadow">
            <table className="min-w-full text-sm">
                <thead className="bg-amber-50">
                    <tr>
                        <th className="px-4 py-2 text-left font-medium text-amber-700">日付</th>
                        <th className="px-4 py-2 text-left font-medium text-amber-700">概要</th>
                        <th className="px-4 py-2 text-right font-medium text-amber-700">金額</th>
                        <th className="px-4 py-2 text-center font-medium text-amber-700">領収書</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                    <tr>
                        <td className="px-4 py-2 text-amber-800">2024年7月1日</td>
                        <td className="px-4 py-2 text-amber-800">プレミアムプラン (月額)</td>
                        <td className="px-4 py-2 text-right text-amber-800">¥980</td>
                        <td className="px-4 py-2 text-center">
                            <Button variant="ghost" size="sm" className="!text-xs !text-amber-600 hover:!text-amber-700">表示</Button>
                        </td>
                    </tr>
                     <tr>
                        <td className="px-4 py-2 text-amber-800">2024年6月1日</td>
                        <td className="px-4 py-2 text-amber-800">プレミアムプラン (月額)</td>
                        <td className="px-4 py-2 text-right text-amber-800">¥980</td>
                        <td className="px-4 py-2 text-center">
                            <Button variant="ghost" size="sm" className="!text-xs !text-amber-600 hover:!text-amber-700">表示</Button>
                        </td>
                    </tr>
                    {/* More rows as needed */}
                </tbody>
            </table>
        </div>
         <p className="text-xs text-amber-600 mt-3">過去12ヶ月分までの請求履歴を表示しています。</p>
      </section>
    </div>
  );
};

export default SubscriptionSettings;
