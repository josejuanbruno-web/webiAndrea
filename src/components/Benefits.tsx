import { Clock, TrendingUp, Shield, Zap, Users, Globe } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Disponibilidad 24/7",
    description: "Tu equipo nunca duerme. Atiende llamadas a cualquier hora del día o la noche.",
  },
  {
    icon: TrendingUp,
    title: "Escalabilidad Infinita",
    description: "Gestiona 1 o 10,000 llamadas simultáneas sin contratar más personal.",
  },
  {
    icon: Shield,
    title: "Seguridad y Privacidad",
    description: "Cumplimiento GDPR y encriptación de datos sensibles en todas las conversaciones.",
  },
  {
    icon: Zap,
    title: "Implementación Rápida",
    description: "Configura tu agente virtual en minutos y empieza a atender llamadas hoy mismo.",
  },
  {
    icon: Users,
    title: "Experiencia Natural",
    description: "Conversaciones fluidas con IA que entiende contexto, sentimientos y necesidades.",
  },
  {
    icon: Globe,
    title: "Multiidioma",
    description: "Atiende en español, inglés, francés y más de 20 idiomas adicionales.",
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
              VoiceAgent AI
            </span>
            ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnología de vanguardia al servicio de tu negocio
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
