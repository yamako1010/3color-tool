import React from 'react';
import { ColorHarmony } from '../../types/color';

interface SettingsPanelProps {
  harmonyType: ColorHarmony;
  onHarmonyChange: (harmony: ColorHarmony) => void;
  usageCategory: {
    saturation: number;
    lightness: number;
    temperature: 'warm' | 'cool' | 'neutral';
  };
  onUsageCategoryChange: (category: {
    saturation: number;
    lightness: number;
    temperature: 'warm' | 'cool' | 'neutral';
  }) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  harmonyType,
  onHarmonyChange,
  usageCategory,
  onUsageCategoryChange
}) => {
  // 配色理論の説明
  const harmonyDescriptions: Record<ColorHarmony, string> = {
    complementary: '補色：色相環の正反対にある色を使用した対照的な組み合わせ',
    analogous: '類似色：色相環で隣接する色を使用した調和のとれた組み合わせ',
    triadic: 'トライアド：色相環で等間隔に3つの色を配置した鮮やかな組み合わせ',
    tetradic: 'テトラード：色相環で等間隔に4つの色を配置した多様な組み合わせ',
    monochromatic: 'モノクロマチック：同じ色相で明度と彩度を変化させた統一感のある組み合わせ',
    splitComplementary: '分割補色：基本色と、その補色の両隣の色を使用した調和のとれた組み合わせ'
  };

  // 用途カテゴリの定義
  const usageCategories = [
    {
      id: 'business',
      name: 'ビジネス',
      description: '落ち着いた、信頼感のある配色',
      colorAdjustments: {
        saturation: -20,
        lightness: 0,
        temperature: 'cool' as const
      }
    },
    {
      id: 'casual',
      name: 'カジュアル',
      description: '明るく親しみやすい配色',
      colorAdjustments: {
        saturation: 10,
        lightness: 10,
        temperature: 'warm' as const
      }
    },
    {
      id: 'tech',
      name: 'テクノロジー',
      description: '先進的でクリーンな配色',
      colorAdjustments: {
        saturation: 0,
        lightness: 5,
        temperature: 'cool' as const
      }
    },
    {
      id: 'nature',
      name: '自然・環境',
      description: '自然を感じる落ち着いた配色',
      colorAdjustments: {
        saturation: -5,
        lightness: -5,
        temperature: 'neutral' as const
      }
    }
  ];

  return (
    <div className="settings-panel p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">設定パネル</h2>
      
      {/* 配色理論選択 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">配色理論</h3>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(harmonyDescriptions) as ColorHarmony[]).map((harmony) => (
            <div key={harmony} className="relative">
              <input
                type="radio"
                id={`harmony-${harmony}`}
                name="harmony"
                className="sr-only"
                checked={harmonyType === harmony}
                onChange={() => onHarmonyChange(harmony)}
              />
              <label
                htmlFor={`harmony-${harmony}`}
                className={`block p-3 border rounded-lg cursor-pointer transition-all
                  ${harmonyType === harmony
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <div className="font-medium">
                  {harmony === 'complementary' && '補色'}
                  {harmony === 'analogous' && '類似色'}
                  {harmony === 'triadic' && 'トライアド'}
                  {harmony === 'tetradic' && 'テトラード'}
                  {harmony === 'monochromatic' && 'モノクロマチック'}
                  {harmony === 'splitComplementary' && '分割補色'}
                </div>
              </label>
              
              {/* ツールチップ */}
              <div className="tooltip opacity-0 invisible absolute z-10 w-64 p-2 mt-2 text-sm bg-gray-900 text-white rounded-md shadow-lg transition-opacity group-hover:opacity-100 group-hover:visible">
                {harmonyDescriptions[harmony]}
              </div>
            </div>
          ))}
        </div>
        
        {/* 選択中の配色理論の説明 */}
        <div className="mt-2 text-sm text-gray-600">
          {harmonyDescriptions[harmonyType]}
        </div>
      </div>
      
      {/* 用途別カテゴリ */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">用途別調整</h3>
        <div className="grid grid-cols-2 gap-2">
          {usageCategories.map((category) => (
            <button
              key={category.id}
              className={`p-3 border rounded-lg text-left transition-all
                ${JSON.stringify(usageCategory) === JSON.stringify(category.colorAdjustments)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              onClick={() => onUsageCategoryChange(category.colorAdjustments)}
            >
              <div className="font-medium">{category.name}</div>
              <div className="text-xs mt-1">
                {category.description}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* 手動調整 */}
      <div>
        <h3 className="text-lg font-semibold mb-2">手動調整</h3>
        
        {/* 彩度調整 */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium">彩度</label>
            <span className="text-sm text-gray-600">{usageCategory.saturation > 0 ? '+' : ''}{usageCategory.saturation}</span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            step="5"
            value={usageCategory.saturation}
            onChange={(e) => onUsageCategoryChange({
              ...usageCategory,
              saturation: parseInt(e.target.value)
            })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>落ち着いた</span>
            <span>鮮やか</span>
          </div>
        </div>
        
        {/* 明度調整 */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium">明度</label>
            <span className="text-sm text-gray-600">{usageCategory.lightness > 0 ? '+' : ''}{usageCategory.lightness}</span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            step="5"
            value={usageCategory.lightness}
            onChange={(e) => onUsageCategoryChange({
              ...usageCategory,
              lightness: parseInt(e.target.value)
            })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>暗い</span>
            <span>明るい</span>
          </div>
        </div>
        
        {/* 色温度調整 */}
        <div>
          <label className="block text-sm font-medium mb-1">色温度</label>
          <div className="flex gap-2">
            {['cool', 'neutral', 'warm'].map((temp) => (
              <button
                key={temp}
                className={`flex-1 py-2 px-3 border rounded-md text-sm transition-all
                  ${usageCategory.temperature === temp
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                onClick={() => onUsageCategoryChange({
                  ...usageCategory,
                  temperature: temp as 'warm' | 'cool' | 'neutral'
                })}
              >
                {temp === 'cool' && '寒色系'}
                {temp === 'neutral' && '中性'}
                {temp === 'warm' && '暖色系'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
