'use client'

import { useEffect, useState } from 'react'

export default function RenderPdfPage() {
  const [status, setStatus] = useState('Initializing...')

  useEffect(() => {
    async function render() {
      try {
        setStatus('Loading PDF.js script...')
        
        // Load PDF.js from cdnjs
        const pdfjsLib = (window as any)['pdfjs-dist/build/pdf'];
        if (!pdfjsLib) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          script.onload = () => startRendering();
          script.onerror = () => setStatus('Failed to load PDF.js script');
          document.head.appendChild(script);
        } else {
          startRendering();
        }
      } catch (err: any) {
        setStatus('Error: ' + err.message);
      }
    }

    async function startRendering() {
      try {
        const pdfjsLib = (window as any)['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        setStatus('Loading PDF document...');
        const loadingTask = pdfjsLib.getDocument('/finar-2025-report.pdf');
        const pdf = await loadingTask.promise;
        
        setStatus('Getting page 1...');
        const page = await pdf.getPage(1);
        
        const scale = 2.0; // Render at 2x scale for high quality
        const viewport = page.getViewport({ scale });
        
        setStatus('Creating canvas...');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('Could not get 2d context');
        }
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        setStatus('Rendering page...');
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        await page.render(renderContext).promise;
        
        setStatus('Extracting base64 image...');
        const base64Image = canvas.toDataURL('image/png');
        
        setStatus('Saving cover image via API...');
        const response = await fetch('/api/save-cover', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image: base64Image })
        });
        
        const data = await response.json();
        if (data.success) {
          setStatus('Saved cover successfully! Check public/finar-2025-cover.png');
        } else {
          setStatus('Failed to save cover: ' + data.error);
        }
      } catch (err: any) {
        setStatus('Error rendering: ' + err.message);
      }
    }

    render();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>PDF Cover Generator</h1>
      <p>Status: <strong id="status-text">{status}</strong></p>
    </div>
  )
}
