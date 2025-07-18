export type ColorHarmony = 
  | 'complementary'    // 補色
  | 'analogous'        // 類似色
  | 'triadic'          // トライアド
  | 'tetradic'         // テトラード
  | 'monochromatic'    // モノクロマチック
  | 'splitComplementary'; // 分割補色

export interface ColorInput {
  type: 'picker' | 'hex' | 'rgb' | 'hsl';
  value: string;
  onChange: (color: string) => void;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  metadata: {
    hex: string;
    rgb: { r: number; g: number; b: number };
    hsl: { h: number; s: number; l: number };
    name?: string;
  }[];
}

export interface UsageCategory {
  id: string;
  name: string;
  description: string;
  colorAdjustments: {
    saturation: number;
    lightness: number;
    temperature: 'warm' | 'cool' | 'neutral';
  };
}

export interface PreviewTemplate {
  id: string;
  name: string;
  type: 'web' | 'card' | 'chart' | 'presentation';
  component: React.ComponentType<{ colors: string[] }>;
}
