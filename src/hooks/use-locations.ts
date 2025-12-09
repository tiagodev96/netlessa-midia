import { useState, useEffect } from "react";
import { Location } from "@/components/LocationsMap";

interface ProcessedLocation extends Location {
  latitude: number;
  longitude: number;
  preco: number;
  tipo: "comercial" | "residencial";
}

function processLocationData(location: Location): ProcessedLocation {
  return {
    ...location,
    latitude:
      typeof location.latitude === "string"
        ? parseFloat(location.latitude)
        : location.latitude,
    longitude:
      typeof location.longitude === "string"
        ? parseFloat(location.longitude)
        : location.longitude,
    preco:
      typeof location.preco === "string" ? parseFloat(location.preco) : location.preco,
    tipo: location.tipo || "comercial",
  };
}

export function useLocations() {
  const [locations, setLocations] = useState<ProcessedLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/locations");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch locations: ${response.statusText}`);
        }
        
        const data = await response.json();
        const processedData = data.map(processLocationData);
        setLocations(processedData);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { locations, loading, error };
}

