"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocations } from "@/hooks/use-locations";
import { useLocationFilters } from "@/hooks/use-location-filters";
import { useCart } from "@/hooks/use-cart";
import { MobileControls } from "@/components/localizacoes/MobileControls";
import { MobileListButton } from "@/components/localizacoes/MobileListButton";
import { LocationSheet } from "@/components/localizacoes/LocationSheet";
import { MapView } from "@/components/localizacoes/MapView";
import { LocationsList } from "@/components/localizacoes/LocationsList";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const CONTAINER_STYLES = {
  minHeight: "calc(100vh - 80px)",
  height: "max(calc(100vh - 80px), 800px)",
} as const;

export default function LocalizacoesPage() {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const isMobile = useIsMobile();
  const { locations, loading } = useLocations();
  const { items } = useCart();
  
  const {
    activeType,
    locationsByType,
    filteredLocations,
    handleTypeChange,
    handleFilterChange,
  } = useLocationFilters({ locations });

  const handleLocationSelect = useCallback(
    (locationId: string) => {
      setSelectedLocationId(locationId);
      if (isMobile) {
        setIsSheetOpen(false);
      }
    },
    [isMobile]
  );

  const handleOpenSheet = useCallback(() => {
    setIsSheetOpen(true);
  }, []);

  const handleSheetOpenChange = useCallback((open: boolean) => {
    setIsSheetOpen(open);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {isMobile && (
        <MobileControls activeType={activeType} onTypeChange={handleTypeChange} />
      )}

      <div
        className="flex-1 flex flex-col md:flex-row relative"
        style={CONTAINER_STYLES}
      >
        {isMobile ? (
          <div className="w-full h-full fixed inset-0 top-[80px] md:relative md:top-0">
            <MapView
              locations={filteredLocations}
              selectedLocationId={selectedLocationId}
              onLocationSelect={handleLocationSelect}
              loading={loading}
            />
            <MobileListButton onClick={handleOpenSheet} />
            <Button
              className="fixed bottom-24 right-6 z-40 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              size="lg"
              onClick={() => setIsCartOpen(true)}
              aria-label="Abrir carrinho"
            >
              <ShoppingCart className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>
          </div>
        ) : (
          <>
            <LocationsList
              activeType={activeType}
              onTypeChange={handleTypeChange}
              locationsByType={locationsByType}
              filteredLocations={filteredLocations}
              selectedLocationId={selectedLocationId}
              onLocationSelect={handleLocationSelect}
              onFilterChange={handleFilterChange}
            />
            <div className="w-full md:w-3/5 lg:w-3/5 flex flex-col overflow-hidden h-auto relative">
              <MapView
                locations={filteredLocations}
                selectedLocationId={selectedLocationId}
                onLocationSelect={handleLocationSelect}
                loading={loading}
              />
              <Button
                className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                size="lg"
                onClick={() => setIsCartOpen(true)}
                aria-label="Abrir carrinho"
              >
                <ShoppingCart className="w-6 h-6" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </div>
          </>
        )}
      </div>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {isMobile && (
        <LocationSheet
          isOpen={isSheetOpen}
          onOpenChange={handleSheetOpenChange}
          activeType={activeType}
          onTypeChange={handleTypeChange}
          locationsByType={locationsByType}
          filteredLocations={filteredLocations}
          selectedLocationId={selectedLocationId}
          onLocationSelect={handleLocationSelect}
          onFilterChange={handleFilterChange}
        />
      )}

      <Footer />
    </div>
  );
}
