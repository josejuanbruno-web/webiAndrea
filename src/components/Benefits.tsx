import { Clock, TrendingUp, Shield, Zap, Users, Globe } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Nunca Pierdas una Llamada",
    description: "iAndrea atiende 24/7. Ninguna oportunidad de negocio se escapa, incluso fuera de horario.",
  },
  {
    icon: TrendingUp,
    title: "Convierte Atención en Ventas",
    description: "Transforma cada llamada en una reserva, cita o lead calificado de forma automática.",
  },
  {
    icon: Shield,
    title: "Integración Total",
    description: "Conecta con tu CRM, agendas Apple, Microsoft, Google y sistemas de reservas existentes.",
  },
  {
    icon: Zap,
    title: "Atención Simultánea",
    description: "Gestiona múltiples llamadas al mismo tiempo sin colapsar ni perder precisión.",
  },
  {
    icon: Users,
    title: "Libera a tu Equipo",
    description: "Automatiza tareas repetitivas para que tu equipo se centre en decisiones estratégicas.",
  },
  {
    icon: Globe,
    title: "Personalización por Sector",
    description: "Configurable según las necesidades específicas de tu industria y procesos.",
  },
];

export const Benefits = () => {
  return (
    <section id="beneficios" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Por qué elegir{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              iAndrea
            </span>
            ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La aliada perfecta para tus comunicaciones empresariales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
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
