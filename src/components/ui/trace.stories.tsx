import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { parseGpx, toSvg } from "@/lib/gpx";
import { Trace } from "./trace";

// A synthetic loop with a climb, so the story needs no file.
const pts = Array.from({ length: 120 }, (_, i) => {
  const t = (i / 119) * Math.PI * 2;
  const lat = 45.9 + 0.02 * Math.sin(t) + 0.004 * Math.sin(5 * t);
  const lon = 6.4 + 0.03 * Math.cos(t);
  const ele = 1200 + 600 * Math.max(0, Math.sin(t)) + 40 * Math.sin(9 * t);
  return `<trkpt lat="${lat}" lon="${lon}"><ele>${ele}</ele></trkpt>`;
}).join("");
const trace = toSvg(parseGpx(`<gpx><trk><name>Synthetic loop</name><trkseg>${pts}</trkseg></trk></gpx>`));

const meta = {
  title: "UI/Trace",
  component: Trace,
  args: { trace, label: "Synthetic loop" },
} satisfies Meta<typeof Trace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loop: Story = {
  render: (args) => (
    <div className="max-w-[240px]">
      <Trace {...args} />
    </div>
  ),
};
