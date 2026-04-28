import { createCanvas } from 'canvas';
import { WclRankings } from '../types/wcl.js';

function getParseColor(parse: number): string {
  if (parse < 25) return '#666666';
  if (parse < 50) return '#1eff00';
  if (parse < 75) return '#0070ff';
  if (parse < 95) return '#a335ee';
  if (parse < 99) return '#ff8000';
  if (parse < 100) return '#e268a8';
  return '#e5cc80';
}

export function generateWclImage(
  characterName: string,
  serverName: string,
  zoneRankings: WclRankings,
): Buffer {
  const padding = 20;
  const rowHeight = 28;
  const headerHeight = 60;
  const avgHeight = 40;
  const rows = zoneRankings.rankings.length;
  const width = 420;
  const height = padding * 2 + headerHeight + avgHeight + rows * rowHeight + padding;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);

  // header
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px Sans';
  ctx.fillText(`${characterName}-${serverName}`, padding, padding + 20);

  ctx.fillStyle = '#aaaaaa';
  ctx.font = '13px Sans';
  ctx.fillText('WarcraftLogs Rankings', padding, padding + 40);

  // divider
  ctx.strokeStyle = '#333355';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding + headerHeight);
  ctx.lineTo(width - padding, padding + headerHeight);
  ctx.stroke();

  // best performance average
  const avgY = padding + headerHeight + 25;
  ctx.fillStyle = '#aaaaaa';
  ctx.font = '14px Sans';
  ctx.fillText('Best Performance Average', padding, avgY);
  if (zoneRankings.bestPerformanceAverage) {
    ctx.fillStyle = getParseColor(zoneRankings.bestPerformanceAverage);
    ctx.font = 'bold 14px Sans';
    ctx.fillText(zoneRankings.bestPerformanceAverage.toFixed(2), width - padding - 50, avgY);
  } else {
    ctx.fillStyle = getParseColor(0);
    ctx.font = 'bold 14px Sans';
    ctx.fillText('-', width - padding - 50, avgY);
  }

  // rankings
  zoneRankings.rankings.forEach((r, i) => {
    const y = padding + headerHeight + avgHeight + i * rowHeight + 20;

    // alternating row background
    if (i % 2 === 0) {
      ctx.fillStyle = '#16213e';
      ctx.fillRect(padding - 5, y - 16, width - padding * 2 + 10, rowHeight);
    }

    // encounter name
    ctx.fillStyle = '#dddddd';
    ctx.font = 'bold 14px Sans';
    ctx.fillText(r.encounter.name, padding, y);

    // parse
    let parse;
    if (r.rankPercent) {
      parse = Math.floor(r.rankPercent);
      ctx.fillStyle = getParseColor(parse);
    } else {
      parse = '-';
      ctx.fillStyle = getParseColor(0);
    }
    ctx.font = 'bold 14px Sans';
    const parseText = parse.toString();
    const parseWidth = ctx.measureText(parseText).width;
    ctx.fillText(parseText, width - padding - parseWidth, y);
  });

  return canvas.toBuffer('image/png');
}
