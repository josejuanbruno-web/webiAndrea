import { Button } from "@/components/ui/button";
import { Phone, Sparkles, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
      
      {/* Floating elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="space-y-8 animate-fade-in text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Agente Autónomo de Voz Multimodal (Generación 2026)</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block text-foreground">iAndrea responde,</span>
              <span className="block mt-2">
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  razona y agenda
                </span>
                {" "}por ti
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Impulsada por modelos fundacionales de última generación. Convierte interacciones en ventas con latencia ultra-baja y empatía hiperrealista.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-hero hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all text-lg px-8 border-none"
              >
                <a href="#contacto">
                  <Phone className="w-5 h-5 mr-2" />
                  Despliega tu Agente
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <a href="https://youtu.be/k-5RIOFANAY" target="_blank" rel="noopener noreferrer">
                  Ver Demo en Vivo
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-8 opacity-80">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Latencia &lt; 100ms</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Inteligencia Emocional</span>
              </div>
            </div>
          </div>

          {/* Visual Element - Right Side */}
          <div className="hidden lg:flex justify-center items-center relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {/* Glass Container */}
            <div className="relative w-96 h-96 rounded-full border border-primary/20 bg-background/30 backdrop-blur-3xl flex items-center justify-center shadow-elegant">
              {/* Inner animated rings */}
              <div className="absolute inset-4 rounded-full border border-primary/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-accent/20 animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Voice Waves Visualization */}
              <div className="flex items-center gap-2 h-24">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-3 bg-gradient-hero rounded-full"
                    style={{ 
                      height: `${30 + Math.random() * 70}%`,
                      animation: `float ${1 + Math.random() * 2}s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute top-10 right-0 bg-background/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
              <span className="text-sm font-medium text-emerald-400">● Escuchando...</span>
            </div>
            <div className="absolute bottom-10 left-0 bg-background/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg animate-float" style={{ animationDelay: "2s" }}>
              <span className="text-sm font-medium">Integración CRM ✓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
