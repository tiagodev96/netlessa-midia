import LocationsMap, { Location } from "@/components/LocationsMap";

interface MapViewProps {
  locations: Location[];
  selectedLocationId: string | null;
  onLocationSelect: (locationId: string) => void;
  loading: boolean;
}

export function MapView({
  locations,
  selectedLocationId,
  onLocationSelect,
  loading,
}: MapViewProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <p className="text-gray-600">Carregando localizações...</p>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <p className="text-gray-600 text-lg">Sem locais cadastrados no momento</p>
      </div>
    );
  }

  return (
    <LocationsMap
      locations={locations}
      selectedLocationId={selectedLocationId}
      onLocationSelect={onLocationSelect}
      height="100%"
    />
  );
}

