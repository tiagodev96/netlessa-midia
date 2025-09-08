import { landingData } from "../data/landing";

export default function Stats() {
  return (
    <div className="flex flex-wrap gap-4">
      {landingData.stats.map((stat: any, index: any) => (
        <div key={index} className="badge">
          <span className="font-bold mr-2">{stat.value}</span>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
