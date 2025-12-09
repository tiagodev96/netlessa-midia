import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type LocationType = "comercial" | "residencial";

interface LocationTypeTabsProps {
  value: LocationType;
  onValueChange: (value: LocationType) => void;
  className?: string;
}

export function LocationTypeTabs({
  value,
  onValueChange,
  className,
}: LocationTypeTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList className={`w-full ${className || ""}`}>
        <TabsTrigger value="comercial" className="flex-1">
          Comerciais
        </TabsTrigger>
        <TabsTrigger value="residencial" className="flex-1">
          Residenciais
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

