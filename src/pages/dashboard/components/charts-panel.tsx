import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type Props = { data?: number[] };

function Sparkline({ data = [3, 6, 2, 8, 5, 9, 6] }: { data?: number[] }) {
  const width = 320;
  const height = 120;
  const max = Math.max(...data, 1);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (d / max) * (height - 16) - 8;
      return `${x},${y}`;
    })
    .join(" ");

  const min = Math.min(...data);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x={width - 6}
        y={14}
        fontSize={10}
        textAnchor="end"
        fill="currentColor"
      >
        {`max ${max}`}
      </text>
      <text
        x={width - 6}
        y={height - 6}
        fontSize={10}
        textAnchor="end"
        fill="currentColor"
      >
        {`min ${min}`}
      </text>
    </svg>
  );
}

export function ChartsPanel({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Charts</CardTitle>
        <CardDescription>近期趋势</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <Sparkline data={data} />
        </div>
      </CardContent>
    </Card>
  );
}

export default ChartsPanel;
