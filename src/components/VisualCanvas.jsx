import { useEffect, useRef } from 'react';

function VisualCanvas({ visual }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; 
    const ctx = canvas.getContext('2d');
    if (!ctx) return; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (visual && typeof visual === 'string') {
      const img = new Image();
      img.src = visual;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.onerror = () => {
        console.error('Failed to load image:', visual);
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText('Failed to load diagram', 10, 50);
      };
    } else {
      
      canvas.width = 400;
      canvas.height = 300;
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.fillText('No diagram available', 10, 50);
    }
  }, [visual]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Diagram</h3>
      <canvas ref={canvasRef} className="border rounded" />
    </div>
  );
}

export default VisualCanvas;