import { LocationTypeTabs } from "./LocationTypeTabs";
import LocationFilters from "@/components/LocationFilters";
import LocationsGrid from "@/components/LocationsGrid";
import { Location } from "@/components/LocationsMap";

type LocationType = "comercial" | "residencial";

interface LocationsListProps {
  activeType: LocationType;
  onTypeChange: (type: LocationType) => void;
  locationsByType: Location[];
  filteredLocations: Location[];
  selectedLocationId: string | null;
  onLocationSelect: (locationId: string) => void;
  onFilterChange: (filtered: Location[]) => void;
}

export function LocationsList({
  activeType,
  onTypeChange,
  locationsByType,
  filteredLocations,
  selectedLocationId,
  onLocationSelect,
  onFilterChange,
}: LocationsListProps) {
  return (
    <div className="w-full md:w-2/5 lg:w-2/5 border-r border-gray-200 bg-white flex flex-col overflow-hidden md:max-h-[calc(100vh-80px)]">
      <div className="p-4 border-b border-gray-200 bg-white flex-shrink-0">
        <LocationTypeTabs value={activeType} onValueChange={onTypeChange} />
      </div>
      <LocationFilters
        key={activeType}
        locations={locationsByType}
        onFilterChange={onFilterChange}
      />
      <LocationsGrid
        locations={filteredLocations}
        selectedLocationId={selectedLocationId}
        onLocationSelect={onLocationSelect}
      />
    </div>
  );
}

