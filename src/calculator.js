export const STANDARD_BRICK = Object.freeze({
  length: 240,
  width: 115,
  height: 53
});

export const MORTAR = Object.freeze({
  min: 8,
  max: 12
});

function parsePositiveNumber(value, label) {
  const number = Number(value);

  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${label}必须是正数`);
  }

  return number;
}

function fitCount(total, unit, mortar) {
  return Math.max(1, Math.floor((total + mortar) / (unit + mortar)));
}

function usedLength(count, unit, mortar) {
  return count * unit + Math.max(0, count - 1) * mortar;
}

export function normalizeWallInput(input) {
  const length = parsePositiveNumber(input.length, "墙长");
  const height = parsePositiveNumber(input.height, "墙高");
  const thickness = parsePositiveNumber(input.thickness, "墙厚");

  if (length < STANDARD_BRICK.length) {
    throw new Error(`墙长至少需要 ${STANDARD_BRICK.length}mm`);
  }

  if (height < STANDARD_BRICK.height) {
    throw new Error(`墙高至少需要 ${STANDARD_BRICK.height}mm`);
  }

  if (thickness < STANDARD_BRICK.width) {
    throw new Error(`墙厚至少需要 ${STANDARD_BRICK.width}mm`);
  }

  return { length, height, thickness };
}

export function chooseMortar(values) {
  let best = null;

  for (let size = MORTAR.min; size <= MORTAR.max; size += 1) {
    const columns = fitCount(values.length, STANDARD_BRICK.length, size);
    const rows = fitCount(values.height, STANDARD_BRICK.height, size);
    const lengthWaste = values.length - usedLength(columns, STANDARD_BRICK.length, size);
    const heightWaste = values.height - usedLength(rows, STANDARD_BRICK.height, size);
    const score = Math.abs(lengthWaste) + Math.abs(heightWaste) * 2 + Math.abs(size - 10) * 12;

    if (!best || score < best.score) {
      best = { size, columns, rows, lengthWaste, heightWaste, score };
    }
  }

  return best;
}

function createRowPattern(wallLength, mortar, staggered) {
  const bricks = [];
  let cursor = 0;

  if (staggered) {
    bricks.push({ x: cursor, length: STANDARD_BRICK.length / 2, kind: "half" });
    cursor += STANDARD_BRICK.length / 2 + mortar;
  }

  while (cursor + STANDARD_BRICK.length <= wallLength) {
    bricks.push({ x: cursor, length: STANDARD_BRICK.length, kind: "full" });
    cursor += STANDARD_BRICK.length + mortar;
  }

  if (wallLength - cursor >= STANDARD_BRICK.length / 2) {
    bricks.push({ x: cursor, length: STANDARD_BRICK.length / 2, kind: "half" });
  }

  return bricks;
}

export function createWallPlan(rawInput) {
  const input = normalizeWallInput(rawInput);
  const mortar = chooseMortar(input);
  const rows = mortar.rows;
  const wythes = Math.max(1, Math.round((input.thickness + mortar.size) / (STANDARD_BRICK.width + mortar.size)));
  const bricks = [];
  let fullBricks = 0;
  let halfBricks = 0;

  for (let row = 0; row < rows; row += 1) {
    const rowPattern = createRowPattern(input.length, mortar.size, row % 2 === 1);

    for (let wythe = 0; wythe < wythes; wythe += 1) {
      for (const brick of rowPattern) {
        if (brick.kind === "half") {
          halfBricks += 1;
        } else {
          fullBricks += 1;
        }

        bricks.push({
          id: `${row}-${wythe}-${brick.x}`,
          row,
          wythe,
          x: brick.x,
          y: row * (STANDARD_BRICK.height + mortar.size),
          z: wythe * (STANDARD_BRICK.width + mortar.size),
          length: brick.length,
          width: STANDARD_BRICK.width,
          height: STANDARD_BRICK.height,
          kind: brick.kind
        });
      }
    }
  }

  return {
    input,
    mortarSize: mortar.size,
    rows,
    wythes,
    bricks,
    fullBricks,
    halfBricks,
    pieceCount: fullBricks + halfBricks,
    purchaseBricks: fullBricks + Math.ceil(halfBricks / 2),
    usedHeight: usedLength(rows, STANDARD_BRICK.height, mortar.size),
    usedLength: usedLength(mortar.columns, STANDARD_BRICK.length, mortar.size)
  };
}
