import assert from "node:assert/strict";
import test from "node:test";
import { createWallPlan, chooseMortar, normalizeWallInput } from "../src/calculator.js";

test("normalizes wall input numbers", () => {
  assert.deepEqual(normalizeWallInput({ length: "2400", height: "1200", thickness: "240" }), {
    length: 2400,
    height: 1200,
    thickness: 240
  });
});

test("chooses an integer mortar size from 8mm to 12mm", () => {
  const mortar = chooseMortar({ length: 2400, height: 1200, thickness: 240 });

  assert.equal(Number.isInteger(mortar.size), true);
  assert.equal(mortar.size >= 8, true);
  assert.equal(mortar.size <= 12, true);
});

test("creates staggered rows with half bricks", () => {
  const plan = createWallPlan({ length: 2400, height: 630, thickness: 115 });
  const secondRow = plan.bricks.filter((brick) => brick.row === 1);

  assert.equal(secondRow.some((brick) => brick.kind === "half"), true);
});

test("counts odd half bricks as purchased whole bricks", () => {
  const plan = createWallPlan({ length: 2400, height: 600, thickness: 115 });
  const expectedPurchaseCount = plan.fullBricks + Math.ceil(plan.halfBricks / 2);

  assert.equal(plan.purchaseBricks, expectedPurchaseCount);
});
