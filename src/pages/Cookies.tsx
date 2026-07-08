import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Cookies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-white mb-8">Política de Cookies</h1>
        <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
          <p>
            El sitio web de iAndrea (producto de Comunica Soluciones S.L.) utiliza cookies propias y de terceros para mejorar la experiencia del usuario, ofrecer contenidos personalizados y analizar el tráfico de la web.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">¿Qué son las cookies?</h2>
          <p>
            Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Tipos de cookies que utilizamos</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cookies técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de la página web y la utilización de las diferentes opciones o servicios que en ella existen.</li>
            <li><strong>Cookies de análisis y métricas sin cookies:</strong> Utilizamos herramientas de analítica respetuosas con la privacidad como <strong>Overtracking</strong>. Esta herramienta funciona de manera <em>cookieless</em> (sin cookies), lo que significa que no almacena información personal ni rastrea a los usuarios a través de sus dispositivos, garantizando el cumplimiento del RGPD desde el primer momento sin necesidad de instalar cookies de rastreo en su navegador.</li>
            <li><strong>Cookies de personalización:</strong> Son aquellas que permiten recordar información para que el usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Gestión y Política completa</h2>
          <p>
            iAndrea se adhiere a la estricta política de cookies y privacidad establecida por nuestra entidad matriz, Comunica. Para obtener información detallada sobre la configuración de las cookies en los distintos navegadores, los plazos de conservación y la identidad de los terceros que las utilizan, le remitimos a nuestra política corporativa completa.
          </p>

          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 mt-12">
            <p className="text-sm">
              Para consultar la Política de Cookies completa, detallada y acceder al panel de configuración proporcionado por nuestra empresa matriz, por favor diríjase a: <br/>
              <a href="https://www.comunica.com/aviso-de-cookies/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-medium mt-2 inline-block">Ver Aviso de Cookies en Comunica.com</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
