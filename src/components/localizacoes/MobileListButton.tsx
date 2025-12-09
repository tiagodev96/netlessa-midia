import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

interface MobileListButtonProps {
  onClick: () => void;
}

export function MobileListButton({ onClick }: MobileListButtonProps) {
  return (
    <Button
      className="md:hidden fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      size="lg"
      onClick={onClick}
      aria-label="Ver lista de localizações"
    >
      <List className="w-6 h-6" />
    </Button>
  );
}

