import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const AvisoLegal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-white mb-8">Aviso Legal</h1>
        <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), a continuación se exponen los datos identificativos de la empresa.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Datos Identificativos</h2>
          <p>
            El presente portal web "iAndrea" es un producto desarrollado y operado por <strong>Comunica Soluciones S.L.</strong> (en adelante, "Comunica").
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Denominación Social:</strong> Comunica Soluciones S.L.</li>
            <li><strong>Sitio Web Matriz:</strong> <a href="https://www.comunica.com/aviso-legal/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">https://www.comunica.com</a></li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Propiedad Intelectual e Industrial</h2>
          <p>
            Todos los contenidos del sitio web iAndrea (incluyendo, sin carácter limitativo, bases de datos, imágenes y fotografías, dibujos, gráficos y archivos de texto) son propiedad de Comunica o de los proveedores de contenidos, habiendo sido, en este último caso, objeto de licencia o cesión por parte de los mismos, y están protegidos por las normas nacionales o internacionales de propiedad intelectual.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Exclusión de Responsabilidad</h2>
          <p>
            Comunica no garantiza la disponibilidad continua y permanente de los servicios de iAndrea, quedando de este modo exonerado de cualquier responsabilidad por posibles daños y perjuicios causados como consecuencia de la falta de disponibilidad del servicio por motivos de fuerza mayor o errores en las redes telemáticas de transferencia de datos, ajenos a su voluntad.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Política de Privacidad</h2>
          <p>
            Toda la información referente a la política de privacidad y protección de datos se rige por las políticas corporativas de Comunica. Para obtener más información sobre el tratamiento de sus datos personales, le invitamos a visitar el Aviso Legal y Política de Privacidad completos en la web corporativa de Comunica.
          </p>
          
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 mt-12">
            <p className="text-sm">
              Para consultar el Aviso Legal completo, detallado y actualizado de nuestra empresa matriz, por favor diríjase a: <br/>
              <a href="https://www.comunica.com/aviso-legal/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-medium mt-2 inline-block">Ver Aviso Legal en Comunica.com</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AvisoLegal;
