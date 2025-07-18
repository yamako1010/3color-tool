import { hexToHsl, hslToHex } from './colorConversion';
import { ColorHarmony } from '../types/color';

/**
 * 補色を生成する
 * @param hue 基準となる色相 (0-360)
 * @returns 補色の色相
 */
export function generateComplementary(hue: number): number {
  return (hue + 180) % 360;
}

/**
 * トライアド配色を生成する
 * @param hue 基準となる色相 (0-360)
 * @returns トライアド配色の色相の配列
 */
export function generateTriadic(hue: number): [number, number] {
  return [(hue + 120) % 360, (hue + 240) % 360];
}

/**
 * 類似色配色を生成する
 * @param hue 基準となる色相 (0-360)
 * @returns 類似色配色の色相の配列
 */
export function generateAnalogous(hue: number): [number, number] {
  return [(hue + 30) % 360, (hue - 30 + 360) % 360];
}

/**
 * テトラード配色を生成する
 * @param hue 基準となる色相 (0-360)
 * @returns テトラード配色の色相の配列
 */
export function generateTetradic(hue: number): [number, number, number] {
  return [(hue + 90) % 360, (hue + 180) % 360, (hue + 270) % 360];
}

/**
 * 分割補色配色を生成する
 * @param hue 基準となる色相 (0-360)
 * @returns 分割補色配色の色相の配列
 */
export function generateSplitComplementary(hue: number): [number, number] {
  const complement = generateComplementary(hue);
  return [(complement - 30 + 360) % 360, (complement + 30) % 360];
}

/**
 * モノクロマチック配色を生成する
 * @param h 基準となる色相 (0-360)
 * @param s 基準となる彩度 (0-100)
 * @param l 基準となる明度 (0-100)
 * @returns モノクロマチック配色の[h, s, l]の配列
 */
export function generateMonochromatic(h: number, s: number, l: number): [number, number, number][] {
  // 明度を変化させた2つの色を生成
  return [
    [h, s, Math.max(l - 30, 10)],
    [h, s, Math.min(l + 30, 90)]
  ];
}

/**
 * 指定された配色理論に基づいて3色のパレットを生成する
 * @param baseColor ベースカラー（HEX形式）
 * @param harmonyType 配色理論の種類
 * @returns 3色のHEX配列
 */
export function generateColorPalette(baseColor: string, harmonyType: ColorHarmony): string[] {
  // ベースカラーをHSLに変換
  const { h, s, l } = hexToHsl(baseColor);
  
  // 配色理論に基づいて色を生成
  switch (harmonyType) {
    case 'complementary': {
      const complementHue = generateComplementary(h);
      return [
        baseColor,
        hslToHex(complementHue, s, l),
        hslToHex(h, Math.max(s - 20, 0), Math.min(l + 20, 100))
      ];
    }
    
    case 'analogous': {
      const [hue1, hue2] = generateAnalogous(h);
      return [
        baseColor,
        hslToHex(hue1, s, l),
        hslToHex(hue2, s, l)
      ];
    }
    
    case 'triadic': {
      const [hue1, hue2] = generateTriadic(h);
      return [
        baseColor,
        hslToHex(hue1, s, l),
        hslToHex(hue2, s, l)
      ];
    }
    
    case 'tetradic': {
      const [hue1, hue2] = generateTetradic(h);
      return [
        baseColor,
        hslToHex(hue1, s, l),
        hslToHex(hue2, s, l)
      ];
    }
    
    case 'monochromatic': {
      const variants = generateMonochromatic(h, s, l);
      return [
        baseColor,
        hslToHex(...variants[0]),
        hslToHex(...variants[1])
      ];
    }
    
    case 'splitComplementary': {
      const [hue1, hue2] = generateSplitComplementary(h);
      return [
        baseColor,
        hslToHex(hue1, s, l),
        hslToHex(hue2, s, l)
      ];
    }
    
    default:
      return [baseColor, baseColor, baseColor];
  }
}

/**
 * 用途別にカラーパレットを調整する
 * @param colors 基本カラーパレット（HEX配列）
 * @param category 用途カテゴリ
 * @returns 調整されたカラーパレット（HEX配列）
 */
export function adjustPaletteForUsage(
  colors: string[],
  category: {
    saturation: number;
    lightness: number;
    temperature: 'warm' | 'cool' | 'neutral';
  }
): string[] {
  return colors.map(color => {
    const { h, s, l } = hexToHsl(color);
    
    // 彩度と明度を調整
    let newS = Math.max(0, Math.min(100, s + category.saturation));
    let newL = Math.max(0, Math.min(100, l + category.lightness));
    
    // 色温度を調整
    let newH = h;
    if (category.temperature === 'warm') {
      // 暖色に寄せる（赤/オレンジ方向にシフト）
      newH = (h > 60 && h < 240) ? Math.max(h - 15, 0) : h;
    } else if (category.temperature === 'cool') {
      // 寒色に寄せる（青/緑方向にシフト）
      newH = (h < 60 || h > 240) ? (h + 15) % 360 : h;
    }
    
    return hslToHex(newH, newS, newL);
  });
}
