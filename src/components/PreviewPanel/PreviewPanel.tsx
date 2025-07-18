import React, { useState } from 'react';
import { ColorPalette } from '../../types/color';

interface PreviewPanelProps {
  palette: ColorPalette;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ palette }) => {
  const [activeTemplate, setActiveTemplate] = useState<'web' | 'card' | 'chart' | 'presentation'>('web');
  
  // プレビューテンプレートの定義
  const templates = [
    { id: 'web', name: 'Webサイト' },
    { id: 'card', name: '名刺' },
    { id: 'chart', name: 'チャート' },
    { id: 'presentation', name: 'プレゼンテーション' }
  ];
  
  // Webサイトプレビュー
  const WebPreview = () => (
    <div className="web-preview border rounded-lg overflow-hidden shadow-lg">
      {/* ヘッダー */}
      <div className="header p-4" style={{ backgroundColor: palette.primary }}>
        <div className="flex justify-between items-center">
          <div className="logo">
            <h3 className="text-white font-bold text-xl">サンプルサイト</h3>
          </div>
          <div className="nav flex space-x-4">
            <div className="nav-item text-white">ホーム</div>
            <div className="nav-item text-white opacity-80">特徴</div>
            <div className="nav-item text-white opacity-80">料金</div>
            <div className="nav-item text-white opacity-80">お問い合わせ</div>
          </div>
        </div>
      </div>
      
      {/* ヒーローセクション */}
      <div className="hero p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-2" style={{ color: palette.primary }}>
          美しいデザインで魅せる
        </h1>
        <p className="text-gray-600 mb-4">
          最新のテクノロジーと洗練されたデザインで、あなたのビジネスを次のレベルへ。
        </p>
        <button
          className="px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: palette.accent }}
        >
          詳細を見る
        </button>
      </div>
      
      {/* 特徴セクション */}
      <div className="features p-8 bg-white">
        <h2 className="text-xl font-semibold mb-4" style={{ color: palette.secondary }}>
          主な特徴
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="feature p-4 rounded-lg" style={{ backgroundColor: `${palette.primary}10` }}>
            <div className="icon w-10 h-10 rounded-full mb-2 flex items-center justify-center" style={{ backgroundColor: palette.primary }}>
              <span className="text-white">1</span>
            </div>
            <h3 className="font-medium mb-1" style={{ color: palette.primary }}>高品質</h3>
            <p className="text-sm text-gray-600">最高品質の製品とサービスを提供します。</p>
          </div>
          <div className="feature p-4 rounded-lg" style={{ backgroundColor: `${palette.secondary}10` }}>
            <div className="icon w-10 h-10 rounded-full mb-2 flex items-center justify-center" style={{ backgroundColor: palette.secondary }}>
              <span className="text-white">2</span>
            </div>
            <h3 className="font-medium mb-1" style={{ color: palette.secondary }}>迅速対応</h3>
            <p className="text-sm text-gray-600">素早く効率的なサポートを提供します。</p>
          </div>
          <div className="feature p-4 rounded-lg" style={{ backgroundColor: `${palette.accent}10` }}>
            <div className="icon w-10 h-10 rounded-full mb-2 flex items-center justify-center" style={{ backgroundColor: palette.accent }}>
              <span className="text-white">3</span>
            </div>
            <h3 className="font-medium mb-1" style={{ color: palette.accent }}>安心保証</h3>
            <p className="text-sm text-gray-600">すべての製品に安心の保証が付いています。</p>
          </div>
        </div>
      </div>
      
      {/* フッター */}
      <div className="footer p-4 text-center text-white" style={{ backgroundColor: palette.secondary }}>
        <p className="text-sm">© 2025 サンプルカンパニー All Rights Reserved.</p>
      </div>
    </div>
  );
  
  // 名刺プレビュー
  const CardPreview = () => (
    <div className="card-preview flex justify-center">
      <div className="business-card w-96 h-56 rounded-lg shadow-lg p-6 flex flex-col justify-between" style={{ backgroundColor: palette.primary }}>
        <div className="top">
          <h3 className="text-white text-2xl font-bold">山田 太郎</h3>
          <p className="text-white opacity-80">マーケティングディレクター</p>
        </div>
        
        <div className="bottom">
          <div className="company text-white font-semibold mb-1" style={{ color: palette.accent }}>
            サンプルカンパニー株式会社
          </div>
          <div className="contact text-sm text-white opacity-80">
            <div>〒100-0001 東京都千代田区1-1-1</div>
            <div>TEL: 03-1234-5678</div>
            <div>Email: yamada@example.com</div>
          </div>
        </div>
        
        <div className="logo absolute top-4 right-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: palette.accent }}>
            <span className="text-white font-bold text-xl">SC</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  // チャートプレビュー
  const ChartPreview = () => (
    <div className="chart-preview p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">四半期売上推移</h3>
      
      <div className="chart-container">
        <div className="flex items-end h-64 space-x-6">
          <div className="chart-bar flex flex-col items-center">
            <div className="h-32 w-16 rounded-t-md" style={{ backgroundColor: palette.primary }}></div>
            <div className="mt-2 text-sm">Q1</div>
            <div className="text-xs text-gray-500">320万円</div>
          </div>
          <div className="chart-bar flex flex-col items-center">
            <div className="h-48 w-16 rounded-t-md" style={{ backgroundColor: palette.secondary }}></div>
            <div className="mt-2 text-sm">Q2</div>
            <div className="text-xs text-gray-500">480万円</div>
          </div>
          <div className="chart-bar flex flex-col items-center">
            <div className="h-40 w-16 rounded-t-md" style={{ backgroundColor: palette.primary }}></div>
            <div className="mt-2 text-sm">Q3</div>
            <div className="text-xs text-gray-500">400万円</div>
          </div>
          <div className="chart-bar flex flex-col items-center">
            <div className="h-56 w-16 rounded-t-md" style={{ backgroundColor: palette.accent }}></div>
            <div className="mt-2 text-sm">Q4</div>
            <div className="text-xs text-gray-500">560万円</div>
          </div>
        </div>
        
        <div className="legend flex justify-center space-x-6 mt-8">
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 rounded-sm" style={{ backgroundColor: palette.primary }}></div>
            <span className="text-sm">通常期</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 rounded-sm" style={{ backgroundColor: palette.secondary }}></div>
            <span className="text-sm">キャンペーン期</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 rounded-sm" style={{ backgroundColor: palette.accent }}></div>
            <span className="text-sm">ボーナス期</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  // プレゼンテーションプレビュー
  const PresentationPreview = () => (
    <div className="presentation-preview bg-gray-100 p-4 rounded-lg shadow-inner">
      <div className="slide bg-white rounded-lg shadow-md overflow-hidden">
        <div className="slide-header p-4" style={{ backgroundColor: palette.primary }}>
          <h3 className="text-white text-xl font-bold">プロジェクト計画書</h3>
        </div>
        
        <div className="slide-content p-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: palette.secondary }}>
            2025年度 事業展開
          </h2>
          
          <div className="content mb-6">
            <h4 className="text-lg font-semibold mb-2" style={{ color: palette.primary }}>主要目標</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>新規顧客獲得 <span className="font-semibold" style={{ color: palette.accent }}>30%増</span></li>
              <li>顧客満足度 <span className="font-semibold" style={{ color: palette.accent }}>95%達成</span></li>
              <li>売上 <span className="font-semibold" style={{ color: palette.accent }}>20%成長</span></li>
            </ul>
          </div>
          
          <div className="timeline">
            <h4 className="text-lg font-semibold mb-2" style={{ color: palette.primary }}>スケジュール</h4>
            <div className="flex space-x-2">
              <div className="flex-1 p-2 rounded" style={{ backgroundColor: `${palette.primary}20` }}>
                <div className="text-sm font-medium" style={{ color: palette.primary }}>第1四半期</div>
                <div className="text-xs">市場調査</div>
              </div>
              <div className="flex-1 p-2 rounded" style={{ backgroundColor: `${palette.secondary}20` }}>
                <div className="text-sm font-medium" style={{ color: palette.secondary }}>第2四半期</div>
                <div className="text-xs">製品開発</div>
              </div>
              <div className="flex-1 p-2 rounded" style={{ backgroundColor: `${palette.accent}20` }}>
                <div className="text-sm font-medium" style={{ color: palette.accent }}>第3-4四半期</div>
                <div className="text-xs">販売開始</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="slide-footer p-3 flex justify-between items-center border-t">
          <div className="logo text-sm font-semibold" style={{ color: palette.primary }}>
            サンプルカンパニー
          </div>
          <div className="page-number text-sm text-gray-500">1 / 10</div>
        </div>
      </div>
    </div>
  );
  
  // アクティブなテンプレートに応じてプレビューを表示
  const renderPreview = () => {
    switch (activeTemplate) {
      case 'web':
        return <WebPreview />;
      case 'card':
        return <CardPreview />;
      case 'chart':
        return <ChartPreview />;
      case 'presentation':
        return <PresentationPreview />;
      default:
        return <WebPreview />;
    }
  };

  return (
    <div className="preview-panel">
      <h2 className="text-xl font-bold mb-4">プレビュー</h2>
      
      {/* テンプレート選択タブ */}
      <div className="template-tabs flex mb-4 border-b">
        {templates.map((template) => (
          <button
            key={template.id}
            className={`px-4 py-2 border-b-2 transition-colors
              ${activeTemplate === template.id
                ? `border-primary text-primary`
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTemplate(template.id as any)}
          >
            {template.name}
          </button>
        ))}
      </div>
      
      {/* プレビューエリア */}
      <div className="preview-area p-4 bg-gray-50 rounded-lg">
        {renderPreview()}
      </div>
    </div>
  );
};

export default PreviewPanel;
