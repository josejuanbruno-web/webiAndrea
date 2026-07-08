# iAndrea — Landing page

Landing page del producto **iAndrea**, un agente de voz con IA para automatizar la atención
telefónica (recepción, reservas, soporte, ventas), operado por Comunica Soluciones S.L.

## Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Desarrollo local

Requisito: Node.js y npm instalados ([instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# Clona el repositorio
git clone https://github.com/josejuanbruno-web/webiAndrea.git
cd webiAndrea

# Instala las dependencias
npm i

# Arranca el servidor de desarrollo
npm run dev
```

## Build de producción

```sh
npm run build
npm run preview
```

## Despliegue (Docker)

El sitio se despliega en `https://iandrea.ai` como contenedores Docker (Nginx + Certbot,
con renovación automática del certificado cada 24h). Instrucciones completas en
[deploy/README.md](./deploy/README.md).

```sh
export CERTBOT_EMAIL=tu-email@ejemplo.com
./deploy/init-letsencrypt.sh   # solo la primera vez en un servidor nuevo
docker compose up -d --build   # despliegues siguientes
```

Más contexto del proyecto, decisiones y pendientes en [CLAUDE.md](./CLAUDE.md).
