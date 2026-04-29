import path from 'node:path';
import { CanvasRenderingContext2D, createCanvas, loadImage } from 'canvas';
import { WclCharacter } from '../types/wcl.js';
import { classes } from '../data/classes.js';

function formatDps(dps: number): string {
  return Number(dps.toFixed(1)).toLocaleString();
}

function getParseColor(parse: number): string {
  if (parse < 25) return '#666666';
  if (parse < 50) return '#1eff00';
  if (parse < 75) return '#0070ff';
  if (parse < 95) return '#a335ee';
  if (parse < 99) return '#ff8000';
  if (parse < 100) return '#e268a8';
  return '#e5cc80';
}

const applyGrayscale = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
) => {
  const imageData = ctx.getImageData(x, y, w, h);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  ctx.putImageData(imageData, x, y);
};

export async function generateWclImage(character: WclCharacter): Promise<Buffer> {
  const zoneRankings = character.zoneRankings;

  const fontSizes = {
    name: 18,
    className: 16,
    difficulty: 20,
    bpfAvg: 18,
    bpfAvgNumber: 28,
    mpfAvg: 12,
    encounterName: 14,
    parse: 14,
  };
  const padding = 20;
  const tablePadding = 5;
  const iconPadding = tablePadding * 2;
  const rowHeight = 34;
  const rows = zoneRankings.rankings.length;
  const specIconSize = 18;

  // temp canvas size for measuring
  const canvas = createCanvas(1, 1);
  canvas.getContext('2d').font = `bold ${fontSizes.encounterName}px Sans`;
  const bossColumnWidth =
    Math.ceil(
      Math.max(
        ...zoneRankings.rankings.map(
          (r) => canvas.getContext('2d').measureText(r.encounter.name).width,
        ),
      ),
    ) +
    tablePadding * 4 +
    padding +
    tablePadding +
    padding +
    tablePadding * 3;
  const bestPercentColumnWidth =
    Math.ceil(canvas.getContext('2d').measureText('Best %').width) +
    tablePadding * 4 +
    specIconSize;
  const dpsColumnWidth =
    Math.ceil(canvas.getContext('2d').measureText('Highest DPS').width) + tablePadding * 4;

  const width = padding * 2 + bossColumnWidth + bestPercentColumnWidth + dpsColumnWidth;
  const parseColumnX = padding + bossColumnWidth;
  const dpsColumnX = parseColumnX + bestPercentColumnWidth;
  const headerDividerY = Math.round(
    padding * 2 + fontSizes.name + tablePadding * 2 + fontSizes.className - tablePadding,
  );
  const rankingsY =
    padding * 2 +
    fontSizes.name +
    tablePadding * 2 +
    fontSizes.className +
    padding +
    fontSizes.difficulty +
    padding +
    fontSizes.bpfAvg +
    padding +
    fontSizes.bpfAvgNumber +
    padding +
    rowHeight +
    padding;
  const height = rankingsY + rows * rowHeight;

  const color = {
    background: '#000000',
    header: '#001520',
    name: '#fefefe',
    tableHeader: '#222222',
    tableAlt: '#101010',
    divider: '#555555',
    tableDivider: '#333333',
    tableHeaderDivider: '#444444',
    defaultText: '#e1f2f5',
    difficultyText: '#d0d0d0',
    encounterText: '#b4bdff',
    encounterTextNoParse: '#909090',
    dps: '#d1fa99',
  };

  const difficultyMap: Record<number, string> = {
    1: 'LFR',
    3: 'NORMAL',
    4: 'HEROIC',
    5: 'MYTHIC',
  };

  const classIdMap = Object.fromEntries(
    Object.entries(classes).map(([key, value]) => [value.id, key]),
  ) as Record<number, keyof typeof classes>;

  const className = classIdMap[character.classID];
  const classDisplayName = className
    .split('_')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
  const specIconId =
    classes[className].specs[
      zoneRankings.rankings[1].bestSpec as keyof (typeof classes)[typeof className]['specs']
    ];

  // real canvas size
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // background
  ctx.fillStyle = color.background;
  ctx.fillRect(0, 0, width, height);

  // header background
  ctx.fillStyle = color.header;
  ctx.fillRect(0, 0, width, headerDividerY);

  // logo
  const logoPath = path.join(process.cwd(), 'assets/images/wclLogo.png');
  const logo = await loadImage(logoPath);
  const logoXY = headerDividerY - padding * 2;
  ctx.drawImage(logo, width - padding - logoXY, padding, logoXY, logoXY);

  // character name and class
  const headerY = Math.round((headerDividerY - tablePadding * 2) / 2);
  ctx.fillStyle = color.name;
  ctx.font = `bold ${fontSizes.name}px Sans`;
  ctx.fillText(`${character.name} - ${character.server.name}`, padding, headerY);

  const classNameY = headerY + fontSizes.name + tablePadding * 2;
  ctx.fillStyle = classes[className].color;
  ctx.font = `${fontSizes.className}px Sans`;
  ctx.fillText(classDisplayName, padding, classNameY);

  // header divider
  ctx.strokeStyle = color.divider;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, headerDividerY);
  ctx.lineTo(width, headerDividerY);
  ctx.stroke();

  // difficulty
  const difficultyY = classNameY + fontSizes.className + padding * 2;
  const difficultyText = `${difficultyMap[zoneRankings.difficulty]}`;
  ctx.fillStyle = color.difficultyText;
  ctx.font = `bold ${fontSizes.difficulty}px Sans`;
  ctx.textAlign = 'center';
  ctx.fillText(difficultyText, width / 2, difficultyY);
  ctx.textAlign = 'left';

  // best performance average
  const bpfAvgTextY = difficultyY + fontSizes.difficulty + padding;
  ctx.fillStyle = color.defaultText;
  ctx.font = `${fontSizes.bpfAvg}px Sans`;
  const bpfAvgText = 'Best Perf. Avg';
  const bpfAvgTextWidth = ctx.measureText(bpfAvgText).width;
  ctx.fillText(bpfAvgText, padding * 2, bpfAvgTextY);

  const bpfAvgNumberY = bpfAvgTextY + fontSizes.bpfAvg + padding;
  ctx.font = `bold ${fontSizes.bpfAvgNumber}px Sans`;
  if (zoneRankings.bestPerformanceAverage) {
    ctx.fillStyle = getParseColor(zoneRankings.bestPerformanceAverage);
    ctx.textAlign = 'center';
    ctx.fillText(
      zoneRankings.bestPerformanceAverage.toFixed(1),
      padding * 2 + bpfAvgTextWidth / 2,
      bpfAvgNumberY,
    );
    ctx.textAlign = 'left';
  } else {
    ctx.fillStyle = getParseColor(0);
    ctx.fillText('-', width - padding - 50, bpfAvgNumberY);
  }

  // median performance average
  const mpfAvgY = bpfAvgTextY + padding / 4;
  const mpfAvgNumber = zoneRankings.medianPerformanceAverage
    ? zoneRankings.medianPerformanceAverage.toFixed(1)
    : '-';
  ctx.font = `${fontSizes.mpfAvg}px Sans`;
  const mpfAvgNumberWidth = ctx.measureText(mpfAvgNumber).width;
  ctx.fillStyle = color.defaultText;
  ctx.textAlign = 'right';
  ctx.fillText(
    'Median Perf. Avg:',
    width - padding * 2 - mpfAvgNumberWidth - tablePadding,
    mpfAvgY,
  );
  ctx.fillStyle = mpfAvgNumber ? getParseColor(Number(mpfAvgNumber)) : getParseColor(0);
  ctx.fillText(mpfAvgNumber.toString(), width - padding * 2, mpfAvgY);
  ctx.textAlign = 'left';

  // kills logged
  const killsY = mpfAvgY + padding;
  const killsNumberX = width - padding * 2 - mpfAvgNumberWidth;
  ctx.fillStyle = color.defaultText;
  let kills = 0;
  for (const [, r] of zoneRankings.rankings.entries()) {
    kills += r.totalKills;
  }
  const killsText = kills.toString();
  const killsTextLength = ctx.measureText(killsText).width;
  ctx.fillText(killsText, killsNumberX, killsY);
  ctx.textAlign = 'right';
  ctx.fillText('Kills Logged:', killsNumberX - killsTextLength, killsY);
  ctx.textAlign = 'left';

  // table header
  ctx.strokeStyle = color.tableDivider;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, rankingsY - rowHeight * 1.5);
  ctx.lineTo(width - padding, rankingsY - rowHeight * 1.5);
  ctx.stroke();
  ctx.fillStyle = color.tableHeader;
  ctx.fillRect(padding, rankingsY - rowHeight * 1.5, width - padding * 2, rowHeight);
  ctx.fillStyle = color.defaultText;
  ctx.font = `bold ${fontSizes.encounterName}px Sans`;
  ctx.textAlign = 'center';
  const headerTextY = rankingsY - rowHeight + fontSizes.encounterName / 2 - 2;
  ctx.fillText('Boss', padding + (parseColumnX - padding) / 2, headerTextY);
  ctx.fillText('Best %', parseColumnX + (dpsColumnX - parseColumnX) / 2, headerTextY);
  ctx.fillText('Highest DPS', dpsColumnX + (width - padding - dpsColumnX) / 2, headerTextY);
  ctx.textAlign = 'left';

  const specIconsPath = path.join(process.cwd(), 'assets/images/specIcons.jpg');
  const specIcon = await loadImage(specIconsPath);

  // rankings
  for (const [i, r] of zoneRankings.rankings.entries()) {
    const y = rankingsY + i * rowHeight;

    // horizontal table dividers
    ctx.strokeStyle = color.tableDivider;
    ctx.lineWidth = 1;
    ctx.moveTo(padding, y - rowHeight / 2);
    ctx.lineTo(width - padding, y - rowHeight / 2);
    ctx.stroke();

    if (i === zoneRankings.rankings.length - 1) {
      // last horizontal divider
      ctx.moveTo(padding, y + rowHeight / 2);
      ctx.lineTo(width - padding, y + rowHeight / 2);
      ctx.stroke();
    }

    // alternating row background
    if (i % 2 !== 0) {
      ctx.fillStyle = color.tableAlt;
      ctx.fillRect(padding, y - rowHeight / 2, width - padding * 2, rowHeight);
    }

    let parse;
    let showSpecIcon = false;

    // encounter icon
    const bossIconX = padding + tablePadding;
    const bossIconBaseUrl = 'https://assets.rpglogs.com/img/warcraft/bosses/';
    const bossId = r.encounter.id;
    const bossIcon = await loadImage(`${bossIconBaseUrl}${bossId}-icon.jpg`);
    const bossIconSize = 56 / 2 - 2;
    ctx.drawImage(bossIcon, bossIconX, y - bossIconSize / 2, bossIconSize, bossIconSize);

    if (r.rankPercent) {
      showSpecIcon = true;

      // encounter icon draw

      // encounter name
      ctx.fillStyle = color.encounterText;
      ctx.font = `bold ${fontSizes.encounterName}px Sans`;
      ctx.fillText(
        r.encounter.name,
        bossIconX + padding + tablePadding * 3,
        y + fontSizes.encounterName / 2 - 2,
      );

      // parse
      parse = Math.floor(r.rankPercent);
      ctx.fillStyle = getParseColor(parse);

      // spec icon
      ctx.drawImage(
        specIcon,
        36 * specIconId,
        0,
        36,
        36,
        dpsColumnX - specIconSize - iconPadding,
        y - specIconSize / 2,
        specIconSize,
        specIconSize,
      );
      ctx.moveTo(dpsColumnX - specIconSize - iconPadding - 1, y - specIconSize / 2 - 1);
      ctx.lineTo(dpsColumnX - iconPadding + 1, y - specIconSize / 2 - 1);
      ctx.lineTo(dpsColumnX - iconPadding + 1, y + specIconSize / 2 + 1);
      ctx.lineTo(dpsColumnX - specIconSize - iconPadding - 1, y + specIconSize / 2 + 1);
      ctx.lineTo(dpsColumnX - specIconSize - iconPadding - 1, y - specIconSize / 2 - 2);
    } else {
      // grayscale bossIcon if no parse
      applyGrayscale(ctx, bossIconX, y - bossIconSize / 2, bossIconSize, bossIconSize);

      // encounter name
      ctx.fillStyle = color.encounterTextNoParse;
      ctx.font = `bold ${fontSizes.encounterName}px Sans`;
      ctx.fillText(
        r.encounter.name,
        bossIconX + padding + tablePadding * 3,
        y + fontSizes.encounterName / 2 - 2,
      );

      // parse
      parse = '-';
      ctx.fillStyle = getParseColor(0);
    }
    ctx.font = `bold ${fontSizes.parse}px Sans`;
    const parseText = parse.toString();
    const parseWidth = ctx.measureText(parseText).width;
    ctx.fillText(
      parseText,
      dpsColumnX - tablePadding - parseWidth - (showSpecIcon ? specIconSize + iconPadding + 1 : 0),
      y + fontSizes.parse / 2 - 2,
    );

    // DPS column
    ctx.font = `normal ${fontSizes.parse}px Sans`;
    const dpsText = r.bestAmount ? formatDps(r.bestAmount) : '-';
    ctx.fillStyle = r.bestAmount ? color.dps : getParseColor(0);
    ctx.textAlign = 'right';
    ctx.fillText(
      dpsText,
      dpsColumnX + (width - padding - tablePadding - dpsColumnX),
      y + fontSizes.parse / 2 - 2,
    );
    ctx.textAlign = 'left';

    // vertical table dividers
    if (i === zoneRankings.rankings.length - 1) {
      const columnDividersTop = rankingsY - rowHeight * 1.5;
      const tableBottom = height - rowHeight / 2;
      ctx.strokeStyle = color.tableHeaderDivider;
      ctx.lineWidth = 1;
      for (let j = 0; j < 2; j += 1) {
        ctx.beginPath();
        ctx.moveTo(padding + j * (width - padding * 2), headerDividerY);
        ctx.lineTo(padding + j * (width - padding * 2), tableBottom);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(parseColumnX, columnDividersTop);
      ctx.lineTo(parseColumnX, tableBottom);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(dpsColumnX, columnDividersTop);
      ctx.lineTo(dpsColumnX, tableBottom);
      ctx.stroke();
    }
  }

  return canvas.toBuffer('image/png');
}
