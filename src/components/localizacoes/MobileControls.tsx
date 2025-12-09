import { LocationTypeTabs } from "./LocationTypeTabs";

type LocationType = "comercial" | "residencial";

interface MobileControlsProps {
  activeType: LocationType;
  onTypeChange: (type: LocationType) => void;
}

export function MobileControls({
  activeType,
  onTypeChange,
}: MobileControlsProps) {
  return (
    <div className="md:hidden fixed top-20 left-0 right-0 z-40 px-4 pt-2">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-3">
        <LocationTypeTabs value={activeType} onValueChange={onTypeChange} />
      </div>
    </div>
  );
}

