import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface IndustryCardProps {
  icon: string;
  title: string;
  description: string;
  example: string;
  id: string;
}

export const IndustryCard = ({ icon, title, description, example, id }: IndustryCardProps) => {
  return (
    <Card
      id={id}
      className="group p-6 hover:shadow-soft transition-all duration-300 hover:border-primary/30 bg-gradient-card"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {description}
            </p>
          </div>
        </div>

        <div className="pl-[76px]">
          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <p className="text-sm font-medium text-foreground/80 mb-2">Ejemplo:</p>
            <p className="text-sm text-muted-foreground italic">"{example}"</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-primary text-sm font-medium pl-[76px] opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Ver más</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  );
};
