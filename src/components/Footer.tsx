import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Link to="/">
                <img
                  src="/logo-iandrea.png"
                  alt="iAndrea Logo"
                  loading="lazy"
                  className="h-12 md:h-14 w-auto object-contain hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
            <p className="text-slate-300 max-w-sm">
              Asistente virtual de voz con IA que responde, agenda y convierte
              cada llamada en una oportunidad de negocio.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Producto</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="/#beneficios" className="hover:text-cyan-400 transition-colors">Características</a></li>
              <li><a href="/#industrias" className="hover:text-cyan-400 transition-colors">Casos de uso</a></li>
              <li><a href="/#contacto" className="hover:text-cyan-400 transition-colors">Ponte en contacto con nosotros</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Empresa</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="https://www.comunica.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Sobre Comunica</a></li>
              <li><a href="/#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm gap-4">
          <p>© {new Date().getFullYear()} iAndrea (COMUNICA). Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link to="/aviso-legal" className="hover:text-cyan-400 transition-colors">Aviso Legal</Link>
            <Link to="/cookies" className="hover:text-cyan-400 transition-colors">Política de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
