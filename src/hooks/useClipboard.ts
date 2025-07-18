import { useState } from 'react';

/**
 * クリップボード操作のためのカスタムフック
 * @returns クリップボード関連の関数とステート
 */
export function useClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  /**
   * テキストをクリップボードにコピーする
   * @param text コピーするテキスト
   */
  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        setCopyStatus('success');
        
        // 3秒後にステータスをリセット
        setTimeout(() => {
          setCopyStatus('idle');
        }, 3000);
      } else {
        // フォールバック実装
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopiedText(text);
          setCopyStatus('success');
          
          // 3秒後にステータスをリセット
          setTimeout(() => {
            setCopyStatus('idle');
          }, 3000);
        } else {
          setCopyStatus('error');
        }
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus('error');
    }
  };

  return {
    copyToClipboard,
    copiedText,
    copyStatus,
  };
}

export default useClipboard;
