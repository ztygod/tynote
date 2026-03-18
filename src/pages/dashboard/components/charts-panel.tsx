import { PanelCard } from "@/pages/dashboard/components/panel-card";

type ChartPoint = {
  label: string;
  value: number;
};

type Props = { data: ChartPoint[] };

function Sparkline({ data }: { data: ChartPoint[] }) {
  const width = 640;
  const height = 220;

  if (data.length === 0) {
    return (
      <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/20 text-sm text-muted-foreground">
        暂无趋势数据
      </div>
    );
  }

  const values = data.map((item) => item.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const points = data
    .map((item, index) => {
      const x =
        data.length === 1 ? width / 2 : (index / (data.length - 1)) * (width - 24) + 12;
      const y = height - (item.value / max) * (height - 48) - 24;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">峰值</p>
          <p className="mt-1 text-lg font-semibold">{max}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">最低</p>
          <p className="mt-1 text-lg font-semibold">{min}</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">时间范围</p>
          <p className="mt-1 text-lg font-semibold">{data.length} 天</p>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
        <svg
          width="100%"
          height="220"
          viewBox={`0 0 ${width} ${height}`}
          className="text-chart-2"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="dashboard-chart-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1={height - 24}
            x2={width}
            y2={height - 24}
            stroke="currentColor"
            strokeOpacity="0.12"
          />
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            points={points}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            fill="url(#dashboard-chart-fill)"
            points={`${points} ${width - 12},${height - 24} 12,${height - 24}`}
          />
          {data.map((item, index) => {
            const x =
              data.length === 1 ? width / 2 : (index / (data.length - 1)) * (width - 24) + 12;
            const y = height - (item.value / max) * (height - 48) - 24;

            return (
              <g key={item.label}>
                <circle cx={x} cy={y} r="4" fill="currentColor" />
                <text
                  x={x}
                  y={height - 8}
                  fontSize="11"
                  textAnchor="middle"
                  fill="currentColor"
                  fillOpacity="0.7"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export function ChartsPanel({ data }: Props) {
  return (
    <PanelCard
      title="近 7 天更新趋势"
      description="基于快捷链接的最近更新时间生成，帮助判断内容活跃度。"
      className="xl:col-span-2"
    >
      <Sparkline data={data} />
    </PanelCard>
  );
}

export default ChartsPanel;
