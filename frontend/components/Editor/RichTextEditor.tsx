import React, { useRef, useEffect } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({ value, onChange, placeholder, className }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      document.execCommand('bold', false);
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault();
      document.execCommand('italic', false);
    }
  };

  // Only update innerHTML if it doesn't match to prevent cursor jumping
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  return (
    <div style={{ border: '1px solid #d1d5db', borderRadius: '0.375rem', overflow: 'hidden', backgroundColor: 'white', color: '#111827' }}>
      {/* Toolbar */}
      <div style={{ padding: '6px 10px', backgroundColor: '#f9fafb', borderBottom: '1px solid #d1d5db', display: 'flex', gap: '8px' }}>
        <button 
          type="button" 
          onClick={(e) => { e.preventDefault(); document.execCommand('bold', false); }} 
          style={{ fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px', border: '1px solid transparent', cursor: 'pointer', background: 'transparent', color: '#111827' }}
          title="Bold (Ctrl+B)"
        >
          B
        </button>
        <button 
          type="button" 
          onClick={(e) => { e.preventDefault(); document.execCommand('italic', false); }} 
          style={{ fontStyle: 'italic', fontFamily: 'serif', padding: '2px 8px', borderRadius: '4px', border: '1px solid transparent', cursor: 'pointer', background: 'transparent', color: '#111827' }}
          title="Italic (Ctrl+I)"
        >
          I
        </button>
      </div>
      
      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className={className}
        style={{ padding: '0.75rem', minHeight: '120px', outline: 'none' }}
        data-placeholder={placeholder}
      />
      
      {/* Basic placeholder support via CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          display: block; /* For Firefox */
        }
      `}} />
    </div>
  );
}
