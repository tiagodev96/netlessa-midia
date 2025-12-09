import { useState, useEffect, useMemo, useCallback } from "react";
import { Location } from "@/components/LocationsMap";

type LocationType = "comercial" | "residencial";

interface UseLocationFiltersProps {
  locations: Location[];
  initialType?: LocationType;
}

export function useLocationFilters({
  locations,
  initialType = "comercial",
}: UseLocationFiltersProps) {
  const [activeType, setActiveType] = useState<LocationType>(initialType);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  const locationsByType = useMemo(() => {
    return locations.filter((location) => location.tipo === activeType);
  }, [locations, activeType]);

  useEffect(() => {
    if (locationsByType.length > 0) {
      setFilteredLocations(locationsByType);
    } else {
      setFilteredLocations([]);
    }
  }, [locationsByType]);

  const handleFilterChange = useCallback((filtered: Location[]) => {
    setFilteredLocations(filtered);
  }, []);

  const handleTypeChange = useCallback((type: LocationType) => {
    setActiveType(type);
  }, []);

  return {
    activeType,
    locationsByType,
    filteredLocations,
    handleTypeChange,
    handleFilterChange,
  };
}

