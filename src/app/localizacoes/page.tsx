"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationsMap, { Location } from "@/components/LocationsMap";
import LocationsGrid from "@/components/LocationsGrid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LocationFilters from "@/components/LocationFilters";

export default function LocalizacoesPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'comercial' | 'residencial'>('comercial');

  useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => {
        const processedData = data.map((loc: Location) => ({
          ...loc,
          latitude:
            typeof loc.latitude === "string"
              ? parseFloat(loc.latitude)
              : loc.latitude,
          longitude:
            typeof loc.longitude === "string"
              ? parseFloat(loc.longitude)
              : loc.longitude,
          preco:
            typeof loc.preco === "string" ? parseFloat(loc.preco) : loc.preco,
          tipo: loc.tipo || 'comercial',
        }));
        setLocations(processedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
        setLoading(false);
      });
  }, []);

  const locationsByType = useMemo(() => {
    return locations.filter((loc) => loc.tipo === activeTab);
  }, [locations, activeTab]);

  useEffect(() => {
    if (locationsByType.length > 0) {
      setFilteredLocations(locationsByType);
    }
  }, [locationsByType]);

  const handleLocationSelect = useCallback((locationId: string) => {
    setSelectedLocationId(locationId);
  }, []);

  const handleFilterChange = useCallback((filtered: Location[]) => {
    setFilteredLocations(filtered);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row" style={{ minHeight: 'calc(100vh - 80px)', height: 'max(calc(100vh - 80px), 800px)' }}>
        <div className="w-full md:w-2/5 lg:w-2/5 border-r border-gray-200 bg-white flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-white">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'comercial' | 'residencial')}>
              <TabsList className="w-full">
                <TabsTrigger value="comercial" className="flex-1">
                  Comerciais
                </TabsTrigger>
                <TabsTrigger value="residencial" className="flex-1">
                  Residenciais
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <LocationFilters key={activeTab} locations={locationsByType} onFilterChange={handleFilterChange} />
          <LocationsGrid
            locations={filteredLocations}
            selectedLocationId={selectedLocationId}
            onLocationSelect={handleLocationSelect}
          />
        </div>
        <div className="w-full md:w-3/5 lg:w-3/5 flex flex-col overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600">Carregando localizações...</p>
            </div>
          ) : filteredLocations.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600 text-lg">Sem locais cadastrados no momento</p>
            </div>
          ) : (
            <LocationsMap
              locations={filteredLocations}
              selectedLocationId={selectedLocationId}
              onLocationSelect={handleLocationSelect}
              height="100%"
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
