import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div className="flex items-center gap-2">
            <Link to="/">
              <img
                src="/logo-iandrea.png"
                alt="iAndrea Logo"
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/#inicio" className="text-white hover:text-cyan-400 transition-colors">
              Inicio
            </a>
            
            <a href="/#industrias" className="text-white hover:text-cyan-400 transition-colors">
              Industrias
            </a>

            <a href="/#beneficios" className="text-white hover:text-cyan-400 transition-colors">
              Beneficios
            </a>
            
            <Button asChild className="bg-gradient-hero hover:shadow-glow transition-all">
              <a href="/#contacto">Solicita información</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <a
              href="/#inicio"
              className="block px-4 py-2 hover:bg-slate-800 rounded-lg text-white"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </a>
            <a
              href="/#industrias"
              className="block px-4 py-2 hover:bg-slate-800 rounded-lg text-white"
              onClick={() => setIsOpen(false)}
            >
              Industrias
            </a>
            <a
              href="/#beneficios"
              className="block px-4 py-2 hover:bg-slate-800 rounded-lg text-white"
              onClick={() => setIsOpen(false)}
            >
              Beneficios
            </a>
            <div className="px-4">
              <Button asChild className="w-full bg-gradient-hero">
                <a href="/#contacto" onClick={() => setIsOpen(false)}>
                  Solicita información
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
