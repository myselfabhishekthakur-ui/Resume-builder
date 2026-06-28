'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const A4_HEIGHT_PX = 1123;
const A4_WIDTH_PX = 794;
const PAGE_MARGIN_Y = 8; // 8px top and bottom margin
const CONTENT_BOTTOM = A4_HEIGHT_PX - PAGE_MARGIN_Y;

export default function PaginatedPreview({ children }: Props) {
  const [pages, setPages] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const runPagination = () => {
      // Find all template roots (the hidden one for PDF, and the visual ones for screen)
      const roots = containerRef.current!.querySelectorAll('.stretch-template');
      let maxPages = 1;

      roots.forEach((root) => {
        // Reset all margins
        const elements = root.querySelectorAll<HTMLElement>(
          '[class*="entry"], [class*="entryHeader"], [class*="sectionTitle"], [class*="header"], [class*="contactItem"], [class*="skillItem"], [class*="certItem"], [class*="entryDesc"] > *, [class*="summary"] > *, [class*="desc"] > *, p, h1, h2, h3, h4, h5, h6, li'
        );
        
        elements.forEach(el => { el.style.marginTop = '0px'; });

        let currentPage = 1;
        let currentLimit = currentPage * A4_HEIGHT_PX - PAGE_MARGIN_Y;
        const rootTop = root.getBoundingClientRect().top;

        for (let i = 0; i < elements.length; i++) {
          const el = elements[i];
          const rect = el.getBoundingClientRect();
          const top = rect.top - rootTop;
          const bottom = rect.bottom - rootTop;
          const height = rect.height;

          const hasManualBreak = el.getAttribute('style')?.includes('page-break-before: always');
          const isFullEntry = typeof el.className === 'string' && el.className.includes('entry') && !el.className.includes('entryHeader') && !el.className.includes('entryDesc');

          // We only push full entries if they have a manual break. Otherwise, we let their children (headers, lines) be pushed to avoid massive gaps!
          if (isFullEntry && !hasManualBreak) {
            continue;
          }

          // If element crosses the bottom margin AND is small enough that pushing it won't leave a massive gap (e.g. < 400px) OR has manual break
          // If a paragraph is extremely huge (> 400px), we let it be sliced instead!
          if ((bottom > currentLimit && height <= 400) || hasManualBreak) {
            currentPage++;
            const nextPageTop = (currentPage - 1) * A4_HEIGHT_PX + PAGE_MARGIN_Y;
            const pushAmount = Math.max(0, nextPageTop - top);
            
            if (pushAmount > 0) {
              el.style.marginTop = `${pushAmount}px`;
              currentLimit = currentPage * A4_HEIGHT_PX - PAGE_MARGIN_Y;
            }
          }
        }
        
        const totalHeight = root.getBoundingClientRect().height;
        const p = Math.max(1, Math.ceil(totalHeight / A4_HEIGHT_PX));
        if (p > maxPages) maxPages = p;
      });

      setPages(maxPages);
    };

    // Run once after initial render
    setTimeout(runPagination, 50);

    // Watch for content changes (user typing)
    const observer = new MutationObserver((mutations) => {
      // Ignore mutations caused by our own marginTop changes
      const isSelfMutation = mutations.every(m => 
        m.type === 'attributes' && m.attributeName === 'style' && (m.target as HTMLElement).style.marginTop
      );
      if (isSelfMutation) return;

      observer.disconnect();
      runPagination();
      observer.observe(containerRef.current!, { childList: true, characterData: true, subtree: true, attributes: true });
    });

    observer.observe(containerRef.current, { childList: true, characterData: true, subtree: true, attributes: true });

    return () => observer.disconnect();
  }, [children]);

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
      
      {/* Visual Pages */}
      {Array.from({ length: pages }).map((_, i) => (
        <div key={i} style={{ 
          width: `${A4_WIDTH_PX}px`, 
          height: `${A4_HEIGHT_PX}px`, 
          overflow: 'hidden', 
          background: 'white',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          borderRadius: '4px',
          position: 'relative',
          flexShrink: 0
        }}>
          {/* Shift the content upwards for each page */}
          <div style={{
            position: 'absolute',
            top: `-${i * A4_HEIGHT_PX}px`,
            left: 0,
            width: `${A4_WIDTH_PX}px`,
            height: `${pages * A4_HEIGHT_PX}px`,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div className="stretch-template" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {children}
            </div>
          </div>
        </div>
      ))}

      {/* Hidden element to measure the true continuous height */}
      {/* id="pdf-export-container" will be used by html2pdf to grab the un-sliced version! */}
      <div 
        id="pdf-export-container"
        style={{
          position: 'absolute',
          top: 0,
          left: '-9999px',
          width: `${A4_WIDTH_PX}px`,
        }}
      >
        <div 
          style={{ 
            width: '100%', 
            /* Force the container to be exactly a multiple of A4 height so backgrounds stretch to the end of the last page */
            minHeight: `${pages * A4_HEIGHT_PX}px`,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* We wrap children in a flex-grow container so the template's .page element can stretch */}
          <div className="stretch-template" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
             {children}
          </div>
        </div>
      </div>

      <style>{`
        .stretch-template > div {
          flex: 1 !important;
          min-height: 100% !important;
        }
      `}</style>
    </div>
  );
}
