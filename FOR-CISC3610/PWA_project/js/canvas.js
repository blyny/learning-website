function drawCanvas(imageSrc, facts) {
    const canvas = document.getElementById('learningCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw ocean-like background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a6fc9');  // Surface blue
    gradient.addColorStop(1, '#0d4b8a'); // Deep blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Load and draw image with shadow effect
    const img = new Image();
    img.onload = function() {
      // Calculate dimensions to maintain aspect ratio
      const scale = Math.min(
        canvas.width * 0.8 / img.width, 
        canvas.height * 0.7 / img.height
      );
      
      const imgWidth = img.width * scale;
      const imgHeight = img.height * scale;
      const x = (canvas.width - imgWidth) / 2;
      const y = (canvas.height - imgHeight) / 2 - 30; // Raised slightly
      
      // Add shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetY = 10;
      
      // Draw image
      ctx.drawImage(img, x, y, imgWidth, imgHeight);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      
      // Draw facts
      drawFacts(ctx, facts, canvas.width, canvas.height);
    };
    
    img.onerror = () => {
      console.error("Failed to load image:", imageSrc);
      // Fallback: Draw placeholder
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(canvas.width/2-100, canvas.height/2-50, 200, 100);
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Image not available', canvas.width/2, canvas.height/2);
    };
    
    img.src = imageSrc;
  }
  
  // Keep your existing drawFacts and wrapText functions exactly as they were

function drawFacts(ctx, facts, width, height) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.font = '16px Arial';
  
  const boxWidth = width * 0.8;
  const boxHeight = 100;
  const boxX = (width - boxWidth) / 2;
  const boxY = height - boxHeight - 20;
  
  // Draw fact box
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 10);
  ctx.fill();
  ctx.stroke();
  
  // Draw fact text
  ctx.fillStyle = '#000';
  const fact = facts[Math.floor(Math.random() * facts.length)];
  const lines = wrapText(ctx, fact, boxWidth - 40, boxX + 20, boxY + 30);
}

function wrapText(ctx, text, maxWidth, x, y) {
  const words = text.split(' ');
  let line = '';
  let lineHeight = 24;
  let lines = [];
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      lines.push(line);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  
  ctx.fillText(line, x, y);
  lines.push(line);
  return lines;
}