import { useState, useEffect } from 'react';
import { ColorHarmony, ColorPalette } from '../types/color';
import { generateColorPalette, adjustPaletteForUsage } from '../utils/colorHarmony';
import { hexToRgb, hexToHsl } from '../utils/colorConversion';

/**
 * 色彩計算のためのカスタムフック
 * @param initialColor 初期カラー（HEX形式）
 * @param initialHarmony 初期配色理論
 * @returns 色彩計算関連の関数とステート
 */
export function useColorCalculation(
  initialColor: string = '#6366f1',
  initialHarmony: ColorHarmony = 'complementary'
) {
  const [baseColor, setBaseColor] = useState<string>(initialColor);
  const [harmonyType, setHarmonyType] = useState<ColorHarmony>(initialHarmony);
  const [colorPalette, setColorPalette] = useState<ColorPalette>({
    primary: '',
    secondary: '',
    accent: '',
    metadata: []
  });
  
  // 用途カテゴリの設定
  const [usageCategory, setUsageCategory] = useState({
    saturation: 0,
    lightness: 0,
    temperature: 'neutral' as 'warm' | 'cool' | 'neutral'
  });

  // ベースカラーまたは配色理論が変更されたときにパレットを更新
  useEffect(() => {
    updateColorPalette();
  }, [baseColor, harmonyType, usageCategory]);

  /**
   * カラーパレットを更新する
   */
  const updateColorPalette = () => {
    // 基本パレットを生成
    const colors = generateColorPalette(baseColor, harmonyType);
    
    // 用途に応じて調整
    const adjustedColors = adjustPaletteForUsage(colors, usageCategory);
    
    // メタデータを生成
    const metadata = adjustedColors.map(color => {
      const rgb = hexToRgb(color);
      const hsl = hexToHsl(color);
      
      return {
        hex: color,
        rgb,
        hsl
      };
    });
    
    // パレットを設定
    setColorPalette({
      primary: adjustedColors[0],
      secondary: adjustedColors[1],
      accent: adjustedColors[2],
      metadata
    });
  };

  /**
   * ベースカラーを変更する
   * @param color 新しいベースカラー（HEX形式）
   */
  const changeBaseColor = (color: string) => {
    setBaseColor(color);
  };

  /**
   * 配色理論を変更する
   * @param harmony 新しい配色理論
   */
  const changeHarmonyType = (harmony: ColorHarmony) => {
    setHarmonyType(harmony);
  };

  /**
   * 用途カテゴリを変更する
   * @param category 新しい用途カテゴリ
   */
  const changeUsageCategory = (category: {
    saturation: number;
    lightness: number;
    temperature: 'warm' | 'cool' | 'neutral';
  }) => {
    setUsageCategory(category);
  };

  return {
    baseColor,
    harmonyType,
    colorPalette,
    usageCategory,
    changeBaseColor,
    changeHarmonyType,
    changeUsageCategory,
    updateColorPalette
  };
}

export default useColorCalculation;
