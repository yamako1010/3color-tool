// HEX ↔ RGB ↔ HSL変換関数

/**
 * HEX形式の色コードをRGB形式に変換する
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // #を取り除く
  const sanitizedHex = hex.charAt(0) === '#' ? hex.substring(1) : hex;
  
  // 3桁の場合は6桁に変換
  const fullHex = sanitizedHex.length === 3
    ? sanitizedHex.split('').map(char => char + char).join('')
    : sanitizedHex;
  
  // 16進数を10進数に変換
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);
  
  return { r, g, b };
}

/**
 * RGB形式の色をHEX形式に変換する
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(x => {
      const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
}

/**
 * RGB形式の色をHSL形式に変換する
 */
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  // RGB値を0～1の範囲に正規化
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    
    h /= 6;
  }
  
  // HSL値を適切な範囲に変換
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  const lPercent = Math.round(l * 100);
  
  return { h, s, l: lPercent };
}

/**
 * HSL形式の色をRGB形式に変換する
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  // HSL値を0～1の範囲に正規化
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;
  
  if (s === 0) {
    // 彩度が0の場合はグレースケール
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  // RGB値を0～255の範囲に変換
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * HEX形式の色をHSL形式に変換する
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

/**
 * HSL形式の色をHEX形式に変換する
 */
export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}
