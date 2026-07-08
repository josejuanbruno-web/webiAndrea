import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface IndustryCardProps {
  icon: string;
  title: string;
  description: string;
  example: string;
  id: string;
  imageUrl?: string;
  extendedDescription?: string;
}

export const IndustryCard = ({ icon, title, description, example, id, imageUrl, extendedDescription }: IndustryCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          id={id}
          className="group p-6 hover:shadow-soft transition-all duration-300 hover:border-primary/30 bg-gradient-card whitespace-normal cursor-pointer text-left w-full h-full"
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
      </DialogTrigger>

      <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border/50">
        <div className="grid md:grid-cols-2">
          {/* Left Side: Image */}
          <div className="relative h-64 md:h-full w-full bg-secondary">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center text-7xl">
                {icon}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 md:right-0">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{icon}</span>
                <DialogTitle className="text-3xl font-bold text-foreground">
                  {title}
                </DialogTitle>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="p-8 md:p-10 flex flex-col justify-center space-y-8">
            <div>
              <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                {extendedDescription || description}
              </DialogDescription>
            </div>

            <div className="bg-secondary/40 rounded-xl p-5 border border-border/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <p className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Conversación en Tiempo Real
              </p>
              <p className="text-base text-foreground/90 italic">"{example}"</p>
            </div>

            <div className="pt-2">
              <Button 
                className="w-full h-auto whitespace-normal text-base py-4 px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group"
                onClick={() => {
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                  // Find the close button and click it to dismiss modal
                  const closeBtn = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
                  if (closeBtn) closeBtn.click();
                }}
              >
                <span className="flex-1 text-center">Implementar en {title}</span>
                <ArrowRight className="ml-2 w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
