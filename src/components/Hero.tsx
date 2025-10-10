import { Button } from "@/components/ui/button";
import { Phone, Sparkles, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
      
      {/* Floating elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Asistente virtual de voz con IA</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="block text-foreground">iAndrea responde por ti,</span>
            <span className="block mt-2">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                agenda por ti
              </span>
              {" "}y nunca pierde una oportunidad
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Convierte llamadas en reservas, citas y leads calificados. 
            Libera a tu equipo para centrarse en lo que realmente importa.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-gradient-hero hover:shadow-glow transition-all text-lg px-8">
              <Phone className="w-5 h-5 mr-2" />
              Prueba Gratis
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 hover:border-primary transition-all">
              Ver Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-12 opacity-60">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Atención simultánea ilimitada</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Integración con CRM y calendarios</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">+15 idiomas disponibles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
