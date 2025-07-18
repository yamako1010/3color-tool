import React from 'react';
import { ColorPalette as ColorPaletteType } from '../../types/color';
import useClipboard from '../../hooks/useClipboard';

interface ColorPaletteProps {
  palette: ColorPaletteType;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ palette }) => {
  const { copyToClipboard, copyStatus, copiedText } = useClipboard();

  // 色情報を表示するコンポーネント
  const ColorInfo = ({ color, index }: { color: string; index: number }) => {
    const metadata = palette.metadata[index];
    const { r, g, b } = metadata.rgb;
    const { h, s, l } = metadata.hsl;
    
    const colorNames = ['プライマリ', 'セカンダリ', 'アクセント'];
    
    return (
      <div className="color-box-container fade-in">
        <div
          className="color-box mb-2"
          style={{ backgroundColor: color }}
        />
        <div className="color-info">
          <h3 className="text-md font-semibold">{colorNames[index]}</h3>
          
          <div className="mt-2 space-y-1">
            {/* HEX値 */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">HEX</span>
              <div className="flex items-center">
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">{color}</code>
                <button
                  onClick={() => copyToClipboard(color)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  aria-label="HEX値をコピー"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
                {copyStatus === 'success' && copiedText === color && (
                  <span className="ml-1 text-xs text-green-500">コピー完了!</span>
                )}
              </div>
            </div>
            
            {/* RGB値 */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">RGB</span>
              <div className="flex items-center">
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {`rgb(${r}, ${g}, ${b})`}
                </code>
                <button
                  onClick={() => copyToClipboard(`rgb(${r}, ${g}, ${b})`)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  aria-label="RGB値をコピー"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* HSL値 */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">HSL</span>
              <div className="flex items-center">
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {`hsl(${h}, ${s}%, ${l}%)`}
                </code>
                <button
                  onClick={() => copyToClipboard(`hsl(${h}, ${s}%, ${l}%)`)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  aria-label="HSL値をコピー"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="color-palette-container">
      <h2 className="text-xl font-bold mb-4">生成されたカラーパレット</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ColorInfo color={palette.primary} index={0} />
        <ColorInfo color={palette.secondary} index={1} />
        <ColorInfo color={palette.accent} index={2} />
      </div>
      
      {/* 全色をまとめてコピーするボタン */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            const cssVars = `
:root {
  --color-primary: ${palette.primary};
  --color-secondary: ${palette.secondary};
  --color-accent: ${palette.accent};
}`.trim();
            copyToClipboard(cssVars);
          }}
          className="btn-primary inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
          CSS変数としてコピー
        </button>
        
        {copyStatus === 'success' && copiedText?.includes(':root') && (
          <p className="mt-2 text-sm text-green-500">CSS変数をコピーしました！</p>
        )}
      </div>
    </div>
  );
};

export default ColorPalette;
