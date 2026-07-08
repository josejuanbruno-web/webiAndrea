import { Clock, TrendingUp, Shield, Zap, Users, Globe } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Latencia Cero & Multi-Hilo",
    description: "Gestiona miles de llamadas simultáneas impulsada por la última generación de LLMs sin retrasos en la voz.",
    className: "md:col-span-2 md:row-span-1 bg-gradient-to-br from-primary/10 to-transparent",
  },
  {
    icon: TrendingUp,
    title: "Inteligencia Emocional de Voz",
    description: "Adapta el tono, la empatía y la velocidad de respuesta según el estado de ánimo de tu cliente para máxima conversión.",
    className: "md:col-span-2 md:row-span-2 bg-background/50 backdrop-blur-sm border-primary/20",
  },
  {
    icon: Clock,
    title: "Disponibilidad 24/7 Real",
    description: "Autonomía completa fuera de horario. iAndrea razona, resuelve problemas y cierra ventas sin supervisión humana.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Shield,
    title: "Integración Total 2026",
    description: "Sincronización en tiempo real con CRM, agendas Apple/Microsoft/Google y plataformas empresariales modernas.",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: Users,
    title: "Decisiones Estratégicas",
    description: "Delega las gestiones rutinarias para que tu equipo escale el negocio de forma inteligente.",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    icon: Globe,
    title: "Aprendizaje Contextual",
    description: "Absorbe el conocimiento de tu industria para dar respuestas precisas.",
    className: "md:col-span-2 md:row-span-1",
  },
];

export const Benefits = () => {
  return (
    <section id="beneficios" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Por qué elegir{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              iAndrea
            </span>
            ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Arquitectura de nueva generación para comunicaciones empresariales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`group p-8 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md hover:bg-card/80 hover:border-primary/30 hover:shadow-elegant transition-all duration-500 animate-fade-in flex flex-col justify-between ${benefit.className || ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-hero flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
