const SVG_NS = "http://www.w3.org/2000/svg";

function clear(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function appendMetric(container, label, value) {
  const item = document.createElement("div");
  const strong = document.createElement("strong");
  const span = document.createElement("span");

  strong.textContent = value;
  span.textContent = label;
  item.append(strong, span);
  container.append(item);
}

export function renderMetrics(container, plan) {
  container.replaceChildren();

  appendMetric(container, "推荐灰缝", `${plan.mortarSize}mm`);
  appendMetric(container, "采购总砖数", `${plan.purchaseBricks} 块`);
  appendMetric(container, "实际墙高", `${plan.usedHeight}mm`);
  appendMetric(container, "实际墙长", `${plan.usedLength}mm`);
  appendMetric(container, "排布层数", `${plan.rows} 层`);
  appendMetric(container, "墙厚方向", `${plan.wythes} 皮`);
}

export function renderLayout(svg, plan) {
  clear(svg);

  const padding = 20;
  const width = plan.input.length;
  const height = plan.usedHeight;
  svg.setAttribute("viewBox", `${-padding} ${-padding} ${width + padding * 2} ${height + padding * 2}`);

  const background = document.createElementNS(SVG_NS, "rect");
  background.setAttribute("x", "0");
  background.setAttribute("y", "0");
  background.setAttribute("width", String(width));
  background.setAttribute("height", String(height));
  background.setAttribute("rx", "6");
  background.setAttribute("class", "wall-background");
  svg.append(background);

  for (const brick of plan.bricks.filter((item) => item.wythe === 0)) {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", String(brick.x));
    rect.setAttribute("y", String(height - brick.y - brick.height));
    rect.setAttribute("width", String(brick.length));
    rect.setAttribute("height", String(brick.height));
    rect.setAttribute("rx", "4");
    rect.setAttribute("class", brick.kind === "half" ? "brick brick-half" : "brick brick-full");
    svg.append(rect);
  }
}
