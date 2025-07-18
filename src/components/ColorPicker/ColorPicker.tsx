import React, { useState, useRef, useEffect } from 'react';
import { hexToHsl, hslToHex } from '../../utils/colorConversion';

interface ColorPickerProps {
  initialColor: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ initialColor, onChange }) => {
  const [currentColor, setCurrentColor] = useState(initialColor);
  const [isDragging, setIsDragging] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  
  // HEX入力用のステート
  const [hexInput, setHexInput] = useState(initialColor.replace('#', ''));
  
  // HSL入力用のステート
  const { h, s, l } = hexToHsl(initialColor);
  const [hslInput, setHslInput] = useState({ h, s, l });

  // 初期カラーが変更された場合に更新
  useEffect(() => {
    setCurrentColor(initialColor);
    setHexInput(initialColor.replace('#', ''));
    setHslInput(hexToHsl(initialColor));
  }, [initialColor]);

  // カラーピッカーでのドラッグ処理
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleColorSelect(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleColorSelect(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // カラーピッカーでの色選択処理
  const handleColorSelect = (e: React.MouseEvent) => {
    if (!pickerRef.current) return;
    
    const rect = pickerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    // x座標から色相、y座標から彩度を計算
    const hue = Math.round(x * 360);
    const saturation = Math.round((1 - y) * 100);
    
    // 新しい色をHEXに変換
    const newColor = hslToHex(hue, saturation, hslInput.l);
    
    setCurrentColor(newColor);
    setHexInput(newColor.replace('#', ''));
    setHslInput({ h: hue, s: saturation, l: hslInput.l });
    onChange(newColor);
  };

  // HEX入力の処理
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace('#', '');
    setHexInput(value);
    
    // 有効なHEXカラーの場合のみ更新
    if (/^[0-9A-Fa-f]{6}$/.test(value)) {
      const newColor = `#${value}`;
      setCurrentColor(newColor);
      setHslInput(hexToHsl(newColor));
      onChange(newColor);
    }
  };

  // HSL入力の処理
  const handleHslChange = (type: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...hslInput, [type]: value };
    setHslInput(newHsl);
    
    const newColor = hslToHex(newHsl.h, newHsl.s, newHsl.l);
    setCurrentColor(newColor);
    setHexInput(newColor.replace('#', ''));
    onChange(newColor);
  };

  // 人気色プリセット
  const popularColors = [
    '#FF0000', // 赤
    '#FF8000', // オレンジ
    '#FFFF00', // 黄
    '#00FF00', // 緑
    '#00FFFF', // シアン
    '#0000FF', // 青
    '#8000FF', // 紫
    '#FF00FF'  // マゼンタ
  ];

  return (
    <div className="color-picker-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">ベースカラー選択</h3>
        
        {/* カラーピッカー */}
        <div
          ref={pickerRef}
          className="color-picker relative mb-4"
          style={{
            background: `linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000), 
                        linear-gradient(to top, rgba(0,0,0,1), rgba(255,255,255,0))`,
            backgroundBlendMode: 'multiply'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* 現在選択中の位置を示すマーカー */}
          <div
            className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(hslInput.h / 360) * 100}%`,
              top: `${(1 - hslInput.s / 100) * 100}%`,
              backgroundColor: currentColor
            }}
          />
        </div>
        
        {/* 明度スライダー */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">明度: {hslInput.l}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={hslInput.l}
            onChange={(e) => handleHslChange('l', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        {/* 現在の色表示 */}
        <div className="flex items-center mb-4">
          <div
            className="w-12 h-12 rounded-md shadow-md mr-4"
            style={{ backgroundColor: currentColor }}
          />
          <div>
            <p className="text-sm font-medium">選択中の色</p>
            <p className="text-xs">{currentColor.toUpperCase()}</p>
          </div>
        </div>
        
        {/* HEX入力 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">HEX</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 rounded-l-md border border-r-0 border-gray-300">
              #
            </span>
            <input
              type="text"
              value={hexInput}
              onChange={handleHexChange}
              maxLength={6}
              className="flex-1 rounded-r-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="例: FF0000"
            />
          </div>
        </div>
        
        {/* HSL入力 */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">色相 (H)</label>
            <input
              type="number"
              min="0"
              max="360"
              value={hslInput.h}
              onChange={(e) => handleHslChange('h', parseInt(e.target.value))}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">彩度 (S)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={hslInput.s}
              onChange={(e) => handleHslChange('s', parseInt(e.target.value))}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">明度 (L)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={hslInput.l}
              onChange={(e) => handleHslChange('l', parseInt(e.target.value))}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        
        {/* 人気色プリセット */}
        <div>
          <h4 className="text-sm font-medium mb-2">人気色</h4>
          <div className="flex flex-wrap gap-2">
            {popularColors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-full border border-gray-300 shadow-sm transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
                onClick={() => {
                  setCurrentColor(color);
                  setHexInput(color.replace('#', ''));
                  setHslInput(hexToHsl(color));
                  onChange(color);
                }}
                aria-label={`色を選択: ${color}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
