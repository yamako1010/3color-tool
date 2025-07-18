import React from 'react';
import ColorPicker from './components/ColorPicker/ColorPicker';
import ColorPalette from './components/ColorPalette/ColorPalette';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import PreviewPanel from './components/PreviewPanel/PreviewPanel';
import useColorCalculation from './hooks/useColorCalculation';

const App: React.FC = () => {
  const {
    baseColor,
    harmonyType,
    colorPalette,
    usageCategory,
    changeBaseColor,
    changeHarmonyType,
    changeUsageCategory
  } = useColorCalculation('#6366f1', 'complementary');

  return (
    <div className="app min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">3色配色提案ツール</h1>
          <p className="text-gray-600">色彩理論に基づいた美しい配色を簡単に生成</p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* ベースカラー選択 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ColorPicker 
              initialColor={baseColor} 
              onChange={changeBaseColor} 
            />
          </div>

          {/* 設定パネル */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <SettingsPanel 
              harmonyType={harmonyType}
              onHarmonyChange={changeHarmonyType}
              usageCategory={usageCategory}
              onUsageCategoryChange={changeUsageCategory}
            />
          </div>
        </div>

        {/* 生成されたカラーパレット */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <ColorPalette palette={colorPalette} />
        </div>

        {/* プレビューエリア */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <PreviewPanel palette={colorPalette} />
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center">© 2025 3色配色提案ツール - デザイナーや開発者のための配色サポート</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
