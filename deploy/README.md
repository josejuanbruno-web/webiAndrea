# Despliegue con Docker (iandrea.ai)

Stack de 2 contenedores:

- **web**: build de producción de la landing servido por Nginx, con TLS en el puerto 443.
- **certbot**: emite y renueva el certificado de Let's Encrypt para `iandrea.ai` y `www.iandrea.ai`,
  comprobando cada 24h si toca renovar (Let's Encrypt solo renueva de verdad cuando quedan
  ≤30 días para la expiración; el resto de comprobaciones son no-op).

## Requisitos previos

- El DNS de `iandrea.ai` y `www.iandrea.ai` debe apuntar ya a la IP pública de este servidor
  (Let's Encrypt valida el dominio contactando al puerto 80 desde fuera).
- Puertos 80 y 443 abiertos y libres en el servidor.
- Docker + Docker Compose instalados.

## Primer despliegue (arranque en frío)

La primera vez hay que emitir el certificado antes de poder levantar el stack completo
(Nginx no puede arrancar el bloque 443 sin un certificado ya existente):

```sh
export CERTBOT_EMAIL=tu-email@ejemplo.com
chmod +x deploy/init-letsencrypt.sh
./deploy/init-letsencrypt.sh
```

Esto:
1. Levanta Nginx temporalmente solo en el puerto 80 (config `deploy/nginx-bootstrap.conf`).
2. Pide el certificado a Let's Encrypt vía HTTP-01 challenge.
3. Para el Nginx temporal y levanta el stack definitivo (`docker compose up -d`) ya con TLS.

## Despliegues siguientes

Con el certificado ya emitido (persiste en el volumen `certbot-conf`), basta con:

```sh
export CERTBOT_EMAIL=tu-email@ejemplo.com   # o crea un .env a partir de .env.example
docker compose up -d --build
```

## Renovación del certificado

El contenedor `certbot` corre en bucle: comprueba cada 24h si el certificado necesita
renovarse (`certbot renew`, que es un no-op si aún no está cerca de expirar). El contenedor
`web` recarga la configuración de Nginx cada 6h para recoger el certificado renovado sin
necesidad de reiniciar el contenedor.

Para forzar una renovación manual:

```sh
docker compose exec certbot certbot renew --force-renewal
docker compose exec web nginx -s reload
```

## Comandos útiles

```sh
docker compose logs -f web        # logs de nginx
docker compose logs -f certbot     # logs de certbot
docker compose ps                  # estado de los servicios
docker compose down                # parar todo (los certificados persisten en el volumen)
```
