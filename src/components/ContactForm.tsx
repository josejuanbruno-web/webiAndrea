import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, AtSign, Briefcase, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
  email: z.string().email("Email inválido").max(255),
  phone: z.string().min(9, "Teléfono inválido").max(20),
  company: z.string().max(100).optional(),
  message: z.string().max(500).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad para continuar" }),
  }),
  // Honeypot: campo oculto para usuarios humanos, los bots suelen rellenar todos los inputs.
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof formSchema>;

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      consent: undefined,
      website: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // Honeypot: si un bot ha rellenado este campo oculto, descartamos el envío silenciosamente.
    if (data.website) {
      return;
    }

    setIsSubmitting(true);
    const { website, consent, ...payload } = data;

    try {
      const response = await fetch(
        "https://services.thehotels.tv/webhook/pruebazammad2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: "webiAndrea-contact-form",
            submittedAt: new Date().toISOString(),
            payload,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          errorText || `Webhook request failed with status ${response.status}`,
        );
      }

      toast({
        title: "¡Solicitud Enviada!",
        description: "Nos pondremos en contacto contigo muy pronto.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Hubo un problema. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
      
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Empieza Ahora
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Configura tu agente IA en minutos. Sin compromisos.
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-elegant animate-slide-up">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo *</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="tu@empresa.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input className="pl-10" placeholder="+34 600 000 000" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa (opcional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="Nombre de tu empresa" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿En qué podemos ayudarte? (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cuéntanos sobre tu necesidad..."
                        className="min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Honeypot anti-spam: oculto para humanos, los bots suelen rellenarlo */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="website">No rellenar este campo</label>
                <input
                  type="text"
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  {...form.register("website")}
                />
              </div>

              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value === true}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal text-sm text-muted-foreground">
                        He leído y acepto la{" "}
                        <a href="/aviso-legal" className="text-primary underline hover:no-underline">
                          política de privacidad
                        </a>{" "}
                        y el tratamiento de mis datos para poder contactarme. *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gradient-hero hover:shadow-glow transition-all text-lg group"
              >
                {isSubmitting ? "Enviando..." : "Solicitar Demo Personalizada"}
                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Respuesta en menos de 24 horas • Sin compromiso
              </p>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
