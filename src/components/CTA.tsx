import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="block text-foreground mb-2">¿Listo para que iAndrea</span>
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              responda por ti?
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automatiza tu atención telefónica sin perder calidad. 
            Convierte llamadas en oportunidades de negocio reales.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button
              asChild
              size="lg"
              className="bg-gradient-hero hover:shadow-glow transition-all text-lg px-10 group"
            >
              <a href="#contacto">
                <Phone className="w-5 h-5 mr-2" />
                Configura tu Agente IA Ahora
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 hover:border-primary transition-all"
              asChild
            >
              <a href="https://www.youtube.com/watch?v=94Lp6Zbwv7Y" target="_blank" rel="noopener noreferrer">
                Ver Demo en Vivo
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            Integración con tu sistema • Personalización incluida • Soporte técnico dedicado
          </p>
        </div>
      </div>
    </section>
  );
};
