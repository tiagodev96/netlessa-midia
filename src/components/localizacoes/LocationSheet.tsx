import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { LocationTypeTabs } from "./LocationTypeTabs";
import LocationFilters from "@/components/LocationFilters";
import LocationsGrid from "@/components/LocationsGrid";
import { Location } from "@/components/LocationsMap";

type LocationType = "comercial" | "residencial";

interface LocationSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activeType: LocationType;
  onTypeChange: (type: LocationType) => void;
  locationsByType: Location[];
  filteredLocations: Location[];
  selectedLocationId: string | null;
  onLocationSelect: (locationId: string) => void;
  onFilterChange: (filtered: Location[]) => void;
}

export function LocationSheet({
  isOpen,
  onOpenChange,
  activeType,
  onTypeChange,
  locationsByType,
  filteredLocations,
  selectedLocationId,
  onLocationSelect,
  onFilterChange,
}: LocationSheetProps) {
  const locationCount = filteredLocations.length;
  const locationText =
    locationCount === 1 ? "localização encontrada" : "localizações encontradas";

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0">
        <SheetHeader className="p-4 border-b border-gray-200 pb-3">
          <SheetTitle className="text-xl">Localizações</SheetTitle>
          <p className="text-sm text-gray-600 mt-1">
            {locationCount} {locationText}
          </p>
        </SheetHeader>
        <div className="h-full overflow-y-auto">
          <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <LocationTypeTabs
              value={activeType}
              onValueChange={onTypeChange}
              className="mb-4"
            />
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
      </SheetContent>
    </Sheet>
  );
}

