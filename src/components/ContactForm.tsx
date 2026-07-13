import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, AtSign, Briefcase, Send, ShieldCheck, ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Servicio OTP central (addon otp-service). En desarrollo local se puede
// apuntar a la instancia local creando .env.local con VITE_OTP_API_URL.
const OTP_API_URL = import.meta.env.VITE_OTP_API_URL ?? "https://otp.iandrea.ai";
const SITE_ID = "iandrea";
const RESEND_COOLDOWN_SECONDS = 60;

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

async function postJson(path: string, body: unknown) {
  const response = await fetch(`${OTP_API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

export const ContactForm = () => {
  const [step, setStep] = useState<"form" | "code">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);
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

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [resendIn]);

  const requestCode = async (phone: string): Promise<boolean> => {
    try {
      const { ok, data } = await postJson("/v1/otp/request", {
        siteId: SITE_ID,
        phone,
      });
      if (ok) {
        setResendIn(RESEND_COOLDOWN_SECONDS);
        setCode("");
        setCodeError(null);
        return true;
      }
      if (data.error === "invalid_phone") {
        form.setError("phone", {
          message: "Introduce un número de móvil válido",
        });
        setStep("form");
        return false;
      }
      if (data.error === "rate_limited") {
        const wait = data.retryAfterSeconds ?? 60;
        setResendIn(Math.min(wait, RESEND_COOLDOWN_SECONDS));
        toast({
          title: "Espera un momento",
          description: `Ya te hemos enviado un código. Podrás pedir otro en ${wait} segundos.`,
        });
        return true; // seguimos en el paso de código, el anterior sigue siendo válido
      }
      throw new Error(data.error ?? "unknown");
    } catch (error) {
      console.error("Error solicitando código OTP:", error);
      toast({
        title: "Error",
        description: "No hemos podido enviarte el SMS. Inténtalo de nuevo.",
        variant: "destructive",
      });
      return false;
    }
  };

  const onSubmit = async (data: FormData) => {
    // Honeypot: si un bot ha rellenado este campo oculto, descartamos el envío silenciosamente.
    if (data.website) {
      return;
    }
    setIsSubmitting(true);
    const sent = await requestCode(data.phone);
    if (sent) {
      setStep("code");
      toast({
        title: "Código enviado",
        description: "Revisa tu móvil: te hemos enviado un SMS con un código de 6 dígitos.",
      });
    }
    setIsSubmitting(false);
  };

  const onVerify = async () => {
    if (!/^\d{6}$/.test(code)) {
      setCodeError("Introduce el código de 6 dígitos del SMS");
      return;
    }
    setIsVerifying(true);
    setCodeError(null);
    const values = form.getValues();
    try {
      const { ok, data } = await postJson("/v1/otp/verify", {
        siteId: SITE_ID,
        phone: values.phone,
        code,
        lead: {
          name: values.name,
          email: values.email,
          company: values.company,
          message: values.message,
        },
      });
      if (ok) {
        toast({
          title: "¡Teléfono verificado!",
          description:
            "Hemos recibido tu solicitud. Te llegará un email con el resumen y nos pondremos en contacto contigo muy pronto.",
        });
        form.reset();
        setCode("");
        setStep("form");
        return;
      }
      switch (data.error) {
        case "invalid_code":
          setCodeError(
            `Código incorrecto. Te quedan ${data.attemptsLeft} intento${data.attemptsLeft === 1 ? "" : "s"}.`,
          );
          break;
        case "expired":
          setCodeError("El código ha caducado. Pide uno nuevo con “Reenviar código”.");
          break;
        case "too_many_attempts":
          setCodeError("Demasiados intentos. Pide un código nuevo con “Reenviar código”.");
          break;
        case "delivery_failed":
          setCodeError("No hemos podido registrar tu solicitud. Vuelve a intentarlo en unos segundos.");
          break;
        default:
          throw new Error(data.error ?? "unknown");
      }
    } catch (error) {
      console.error("Error verificando código OTP:", error);
      setCodeError("Ha ocurrido un error. Inténtalo de nuevo.");
    } finally {
      setIsVerifying(false);
    }
  };

  const onResend = async () => {
    if (resendIn > 0) return;
    setIsVerifying(true);
    await requestCode(form.getValues().phone);
    setIsVerifying(false);
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
          {step === "form" ? (
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
                        <FormLabel>Teléfono móvil *</FormLabel>
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
                  {isSubmitting ? "Enviando SMS..." : "Solicitar Demo Personalizada"}
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Verificaremos tu móvil con un SMS • Respuesta en menos de 24 horas • Sin compromiso
                </p>
              </form>
            </Form>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">Verifica tu teléfono</h3>
                <p className="text-muted-foreground">
                  Hemos enviado un SMS con un código de 6 dígitos al{" "}
                  <span className="font-medium text-foreground">{form.getValues().phone}</span>
                </p>
              </div>

              <div className="space-y-2">
                <Input
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setCodeError(null);
                  }}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-2xl tracking-[0.5em] font-semibold h-14"
                  aria-label="Código de verificación de 6 dígitos"
                />
                {codeError && (
                  <p className="text-sm font-medium text-destructive text-center">{codeError}</p>
                )}
              </div>

              <Button
                onClick={onVerify}
                size="lg"
                disabled={isVerifying || code.length !== 6}
                className="w-full bg-gradient-hero hover:shadow-glow transition-all text-lg"
              >
                {isVerifying ? "Verificando..." : "Verificar y enviar solicitud"}
              </Button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setStep("form");
                    setCode("");
                    setCodeError(null);
                  }}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Cambiar teléfono
                </button>
                <button
                  type="button"
                  onClick={onResend}
                  disabled={resendIn > 0 || isVerifying}
                  className="text-primary hover:underline disabled:text-muted-foreground disabled:no-underline transition-colors"
                >
                  {resendIn > 0 ? `Reenviar código (${resendIn}s)` : "Reenviar código"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
