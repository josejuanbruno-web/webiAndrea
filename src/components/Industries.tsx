import { IndustryCard } from "./IndustryCard";

const industries = [
  {
    id: "hoteles",
    icon: "🏨",
    title: "Hoteles y Turismo",
    description: "Atención 24/7 en recepción virtual con validación por voz y gestión automatizada.",
    example: "Bienvenido al Hotel Sol. ¿Desea hacer el check-in o hablar con reservas?",
  },
  {
    id: "salud",
    icon: "🏥",
    title: "Clínicas y Salud",
    description: "Gestión automática de citas médicas, recordatorios y confirmaciones.",
    example: "Hola, soy Clara, asistente de la Clínica Vida. ¿Quieres confirmar tu cita del lunes?",
  },
  {
    id: "soporte",
    icon: "☎️",
    title: "Soporte Técnico",
    description: "Filtrado inteligente de incidencias y resolución automática de problemas comunes.",
    example: "Describe el problema con tu conexión y te ayudaré a solucionarlo paso a paso.",
  },
  {
    id: "banca",
    icon: "🏦",
    title: "Banca y Finanzas",
    description: "Consultas y operaciones seguras con validación de identidad por voz.",
    example: "¿Cuál es el saldo de mi cuenta principal? Quiero transferir 50€ a mi cuenta de ahorro.",
  },
  {
    id: "comercio",
    icon: "🛒",
    title: "Comercio y Ventas",
    description: "Asistente de ventas conversacional que recomienda, reserva y cierra pedidos.",
    example: "¿Qué producto buscas hoy? Tenemos la versión Pro con envío en 24h.",
  },
  {
    id: "automocion",
    icon: "🚗",
    title: "Automoción y Transporte",
    description: "Gestión de citas de taller y seguimiento del estado de reparaciones.",
    example: "¿Quieres pedir cita para el taller o saber el estado de tu reparación?",
  },
  {
    id: "inmobiliarias",
    icon: "🏠",
    title: "Inmobiliarias",
    description: "Atención automatizada de interesados con filtrado inteligente de leads.",
    example: "¿Buscas piso en alquiler o en venta? Tengo tres opciones disponibles en el centro.",
  },
  {
    id: "rrhh",
    icon: "🧑‍💼",
    title: "Recursos Humanos",
    description: "Asistente interno para empleados con integración a sistemas de RRHH.",
    example: "Solicita vacaciones del 15 al 20 de octubre. ¿Cuántos días libres me quedan?",
  },
  {
    id: "publico",
    icon: "🧾",
    title: "Administración Pública",
    description: "Guía automatizada de trámites sin intervención humana.",
    example: "¿Quieres pedir cita en el registro civil o consultar tu expediente?",
  },
  {
    id: "educacion",
    icon: "🧠",
    title: "Formación y Educación",
    description: "Tutor o coach virtual que adapta el ritmo de enseñanza.",
    example: "Repasemos el tema de electricidad. ¿Qué sabes sobre corriente alterna?",
  },
];

export const Industries = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Soluciones por Industria
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Agentes virtuales adaptados a las necesidades específicas de tu sector
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
          {industries.map((industry, index) => (
            <div key={industry.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <IndustryCard {...industry} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
