import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const industries = [
  { name: "Hoteles y Turismo", icon: "🏨", href: "#hoteles" },
  { name: "Clínicas y Salud", icon: "🏥", href: "#salud" },
  { name: "Soporte Técnico", icon: "☎️", href: "#soporte" },
  { name: "Banca y Finanzas", icon: "🏦", href: "#banca" },
  { name: "Comercio y Ventas", icon: "🛒", href: "#comercio" },
  { name: "Automoción", icon: "🚗", href: "#automocion" },
  { name: "Inmobiliarias", icon: "🏠", href: "#inmobiliarias" },
  { name: "Recursos Humanos", icon: "🧑‍💼", href: "#rrhh" },
  { name: "Administración Pública", icon: "🧾", href: "#publico" },
  { name: "Formación y Educación", icon: "🧠", href: "#educacion" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              iAndrea
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </a>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Industrias</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-2 p-4 w-[500px]">
                      {industries.map((industry) => (
                        <a
                          key={industry.name}
                          href={industry.href}
                          className="flex items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <span className="text-2xl">{industry.icon}</span>
                          <span className="text-sm font-medium">{industry.name}</span>
                        </a>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <a href="#beneficios" className="text-foreground hover:text-primary transition-colors">
              Beneficios
            </a>
            
            <Button className="bg-gradient-hero hover:shadow-glow transition-all">
              Prueba Gratis
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <a
              href="#inicio"
              className="block px-4 py-2 hover:bg-secondary rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </a>
            <div className="px-4 py-2 font-medium text-sm text-muted-foreground">
              Industrias
            </div>
            <div className="grid grid-cols-1 gap-2 px-4">
              {industries.slice(0, 5).map((industry) => (
                <a
                  key={industry.name}
                  href={industry.href}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{industry.icon}</span>
                  <span className="text-sm">{industry.name}</span>
                </a>
              ))}
            </div>
            <a
              href="#beneficios"
              className="block px-4 py-2 hover:bg-secondary rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Beneficios
            </a>
            <div className="px-4">
              <Button className="w-full bg-gradient-hero">Prueba Gratis</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
