export const renderPredictions = (predictions, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const font = '16px sans-serif';
  ctx.font = font;
  ctx.textBaseline = 'top'; 

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;

    const isPerson = prediction.class === 'person';

    ctx.strokeStyle = isPerson ? '#FF0000' : '#00FFFF';
    ctx.lineWidth = 4;

    
    ctx.strokeRect(x, y, width, height);

    
    const text = prediction.class;
    const textWidth = ctx.measureText(text).width;
    const textHeight = parseInt(font, 10);

    ctx.fillStyle = isPerson ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 255, 255, 0.2)';
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

    
    ctx.fillStyle = '#000000';
    ctx.fillText(text, x + 2, y + 2);
  });
};
