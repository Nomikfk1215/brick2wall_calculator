import { createWallPlan } from "./calculator.js";
import { renderLayout, renderMetrics } from "./renderer.js";

const form = document.querySelector("#wall-form");
const errorBox = document.querySelector("#form-error");
const metrics = document.querySelector("#metrics");
const preview = document.querySelector("#layout-preview");

function readForm() {
  return {
    length: document.getElementById("wall-length").value,
    height: document.getElementById("wall-height").value,
    thickness: document.getElementById("wall-thickness").value
  };
}

function refresh() {
  errorBox.textContent = "";

  try {
    const plan = createWallPlan(readForm());
    renderMetrics(metrics, plan);
    renderLayout(preview, plan);
  } catch (error) {
    errorBox.textContent = error.message;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  refresh();
});

form.addEventListener("input", refresh);

refresh();
