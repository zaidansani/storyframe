import { Chart, type ChartOptions, type ChartType } from "chart.js/auto";

export type ChartKind = "line" | "bar" | "pie" | "doughnut" | "radar" | "polarArea" | "scatter" | "bubble";

export type ChartRequest = {
  id: string;
  kind: ChartKind;
  labels?: string[];
  datasets: any[];
};

type Colors = {
  ink: string;
  inkMuted: string;
  grid: string;
  series: string[];
};

function readColors(root: Element): Colors {
  const styles = getComputedStyle(root);
  const get = (name: string) => styles.getPropertyValue(name).trim();
  return {
    ink: get("--chart-ink"),
    inkMuted: get("--chart-ink-muted"),
    grid: get("--chart-grid"),
    series: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => get(`--chart-series-${n}`)),
  };
}

const RADIAL_KINDS: ChartKind[] = ["radar", "polarArea"];
const SLICE_KINDS: ChartKind[] = ["pie", "doughnut", "polarArea"];
const POINT_KINDS: ChartKind[] = ["scatter", "bubble"];

function buildScales(kind: ChartKind, colors: Colors) {
  if (kind === "pie" || kind === "doughnut") return undefined;
  if (RADIAL_KINDS.includes(kind)) {
    return {
      r: {
        ticks: { color: colors.inkMuted, backdropColor: "transparent" },
        grid: { color: colors.grid },
        angleLines: { color: colors.grid },
        pointLabels: { color: colors.ink },
      },
    };
  }
  return {
    x: { ticks: { color: colors.inkMuted }, grid: { color: colors.grid, display: false } },
    y: { ticks: { color: colors.inkMuted }, grid: { color: colors.grid }, beginAtZero: true },
  };
}

function colorizeDatasets(kind: ChartKind, datasets: any[], colors: Colors) {
  if (SLICE_KINDS.includes(kind)) {
    return datasets.map((ds) => ({
      ...ds,
      backgroundColor: ds.data.map((_: unknown, i: number) => colors.series[i % colors.series.length]),
      borderColor: colors.grid,
      borderWidth: 2,
    }));
  }

  return datasets.map((ds, i) => {
    const color = colors.series[i % colors.series.length];
    const base: Record<string, unknown> = {
      ...ds,
      borderColor: color,
      backgroundColor: kind === "bar" ? color : ds.fill ? `${color}33` : color,
      borderWidth: 2,
    };
    if (kind === "line" || kind === "radar") {
      base.pointRadius = 3;
      base.pointHoverRadius = 5;
      base.tension = kind === "line" ? 0.3 : 0;
    }
    if (POINT_KINDS.includes(kind)) {
      base.pointRadius = ds.pointRadius ?? 5;
    }
    return base;
  });
}

function buildConfig(req: ChartRequest, colors: Colors) {
  return {
    type: req.kind as ChartType,
    data: {
      labels: req.labels,
      datasets: colorizeDatasets(req.kind, req.datasets, colors),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: POINT_KINDS.includes(req.kind) ? undefined : { mode: "index", intersect: false },
      plugins: {
        legend: {
          display: SLICE_KINDS.includes(req.kind) || req.datasets.length > 1,
          labels: { color: colors.ink, usePointStyle: true, boxWidth: 8 },
        },
        tooltip: {
          backgroundColor: colors.ink,
          titleColor: colors.grid,
          bodyColor: colors.grid,
          padding: 8,
          cornerRadius: 6,
        },
      },
      scales: buildScales(req.kind, colors),
    } as ChartOptions,
  };
}

export function initChart(req: ChartRequest) {
  const canvas = document.getElementById(req.id) as HTMLCanvasElement | null;
  if (!canvas) return;
  const root = canvas.closest("[data-chart-root]") as HTMLElement;

  const initial = buildConfig(req, readColors(root));
  const chart = new Chart(canvas, initial);

  const observer = new MutationObserver(() => {
    const next = buildConfig(req, readColors(root));
    chart.data = next.data;
    chart.options = next.options;
    chart.update();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
}

declare global {
  interface Window {
    __chartQueue?: ChartRequest[];
  }
}

(window.__chartQueue ?? []).forEach(initChart);
