import { IndustryCard } from "./IndustryCard";

const industries = [
  {
    id: "hoteles",
    icon: "🏨",
    title: "Hoteles y Turismo",
    description: "Recepción virtual autónoma con validación biométrica y gestión integral de reservas.",
    example: "He notado que su vuelo se retrasó. He ajustado su reserva en el Hotel Sol. ¿Necesita cena en la habitación a su llegada?",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=900",
    extendedDescription: "Transforma la experiencia del huésped desde antes de su llegada. iAndrea puede gestionar reservas complejas, upselling de habitaciones, peticiones de room service y check-outs de forma conversacional y en múltiples idiomas, liberando al personal de recepción para ofrecer un trato más personal en el lobby."
  },
  {
    id: "salud",
    icon: "🏥",
    title: "Clínicas y Salud",
    description: "Triage inteligente, reprogramación dinámica y seguimiento proactivo de pacientes.",
    example: "Hola Clara, veo que te toca revisión dental la próxima semana. ¿Te reservo el martes a las 10:00?",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=900",
    extendedDescription: "Reduce el ausentismo en consultas hasta en un 40%. El agente realiza recordatorios proactivos, reagenda automáticamente los huecos libres y puede hacer un triaje básico por voz antes de derivar la llamada al especialista correspondiente, cumpliendo siempre con la normativa de privacidad."
  },
  {
    id: "soporte",
    icon: "☎️",
    title: "Soporte Técnico L1/L2",
    description: "Resolución de incidencias complejas guiando al usuario con voz empática y análisis en tiempo real.",
    example: "He reiniciado su router desde nuestra central. Cuénteme, ¿la luz PON ya está en verde fijo?",
    imageUrl: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=900",
    extendedDescription: "Absorbe hasta el 80% de las consultas técnicas de primer y segundo nivel. iAndrea diagnostica problemas mediante árboles de decisión dinámicos, ejecuta acciones en remoto (vía API) y calma a usuarios frustrados gracias a su modelo de empatía tonal."
  },
  {
    id: "banca",
    icon: "🏦",
    title: "Banca y Finanzas",
    description: "Asesoramiento financiero hiper-personalizado y operaciones por validación de voz en milisegundos.",
    example: "Detecto un cobro inusual de 50€ en su tarjeta. ¿Quiere que la bloqueemos temporalmente?",
    imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=900",
    extendedDescription: "Un nivel de seguridad militar combinado con fluidez natural. El agente identifica al cliente por su huella vocal, le informa sobre el estado de sus cuentas, bloquea tarjetas robadas o le ofrece productos de inversión adaptados a su perfil de riesgo sin esperas telefónicas."
  },
  {
    id: "comercio",
    icon: "🛒",
    title: "Comercio y Ventas",
    description: "Vendedor IA que analiza intenciones de compra y aplica cross-selling dinámico.",
    example: "Esa cámara que buscas está agotada, pero tenemos el modelo superior por solo 20€ más. ¿Te lo envío mañana?",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=900",
    extendedDescription: "Un dependiente estrella disponible a cualquier hora. iAndrea conoce tu catálogo en tiempo real (stock, variantes, precios), asesora al cliente según sus necesidades explicadas de viva voz y cierra la transacción enviando directamente un link de pago seguro."
  },
  {
    id: "automocion",
    icon: "🚗",
    title: "Automoción y Transporte",
    description: "Agente proactivo para revisiones predictivas y optimización de flotas.",
    example: "Tu coche marca bajo nivel de aceite. ¿Te reservo cita en el taller de calle Serrano esta tarde?",
    imageUrl: "https://images.unsplash.com/photo-1562426509-5044a121aa49?auto=format&fit=crop&q=80&w=900",
    extendedDescription: "Conectado a la telemetría de los vehículos o al CRM del taller, iAndrea contacta activamente a los clientes cuando necesitan pasar revisiones (ITV, cambios de aceite) y cuadra la agenda del taller optimizando los tiempos de los mecánicos."
  },
  {
    id: "inmobiliarias",
    icon: "🏠",
    title: "Inmobiliarias",
    description: "Agente virtual inmobiliario capaz de cualificar leads y agendar visitas automáticamente.",
    example: "Según tus preferencias de luz natural, acaban de entrar dos áticos en el centro. ¿Los vemos el jueves?",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900",
    extendedDescription: "El primer filtro perfecto para agencias. iAndrea atiende a los interesados en portales inmobiliarios, hace las preguntas clave (presupuesto, zona, financiación), descarta curiosos y agenda directamente la visita en el calendario del agente inmobiliario asignado."
  },
  {
    id: "rrhh",
    icon: "🧑‍💼",
    title: "Recursos Humanos",
    description: "Gestión autónoma de nóminas, vacaciones y onboarding conversacional para empleados.",
    example: "Te quedan 5 días de vacaciones este año. ¿Quieres que los agende para el puente de diciembre?",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=900",
    extendedDescription: "El soporte ideal para plantillas grandes. Los empleados pueden preguntar a iAndrea por sus días de vacaciones, dudas sobre su nómina o la política de gastos de viaje, resolviendo cuellos de botella en el departamento de talento y RRHH."
  },
  {
    id: "publico",
    icon: "🧾",
    title: "Administración Pública",
    description: "Navegación fluida de trámites burocráticos guiada 100% por voz natural.",
    example: "Para renovar el DNI necesitas el certificado padronal. ¿Quieres que te lo solicite y te agende cita?",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=900",
    extendedDescription: "Democratiza el acceso a la administración. Ciudadanos que no se manejan bien con interfaces web pueden realizar trámites complejos simplemente hablando por teléfono, rompiendo la brecha digital y aliviando el colapso en la atención presencial."
  },
  {
    id: "educacion",
    icon: "🧠",
    title: "Formación y Educación",
    description: "Tutor IA que detecta frustración en la voz y adapta su método de enseñanza al vuelo.",
    example: "Noto que la corriente alterna te está costando un poco. Vamos a verlo con un ejemplo más sencillo, ¿te parece?",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=900",
    extendedDescription: "Más que un contestador, un tutor personal 24/7. Las escuelas y universidades usan iAndrea para dar apoyo académico personalizado a sus alumnos, resolver dudas sobre matriculaciones y mantener motivados a los estudiantes mediante análisis emocional vocal."
  },
];

export const Industries = () => {
  return (
    <section id="industrias" className="py-24 bg-secondary/30 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Capacidad Multi-Sectorial
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Agentes virtuales con contexto experto pre-entrenado para tu industria
          </p>
        </div>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden group">
        {/* Left/Right Fading Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />

        {/* Marquee Content */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {/* Set 1 */}
          <div className="flex gap-6 px-3">
            {industries.map((industry) => (
              <div key={`${industry.id}-1`} className="w-[400px] flex-shrink-0">
                <IndustryCard {...industry} />
              </div>
            ))}
          </div>
          {/* Set 2 (Duplicate for seamless loop) */}
          <div className="flex gap-6 px-3">
            {industries.map((industry) => (
              <div key={`${industry.id}-2`} className="w-[400px] flex-shrink-0">
                <IndustryCard {...industry} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
