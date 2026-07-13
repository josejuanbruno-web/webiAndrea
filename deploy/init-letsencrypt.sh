#!/bin/sh
# Arranque en frío: emite el primer certificado antes de levantar el stack definitivo.
# Solo hace falta ejecutar esto una vez por servidor (o si se borra el volumen certbot-conf).
set -e

DOMAIN="iandrea.ai"
WWW_DOMAIN="www.iandrea.ai"
OTP_DOMAIN="otp.iandrea.ai"

if [ -z "$CERTBOT_EMAIL" ]; then
    echo "Define CERTBOT_EMAIL (ej: export CERTBOT_EMAIL=tu@email.com) antes de ejecutar este script." >&2
    exit 1
fi

cd "$(dirname "$0")/.."

echo "== 1/3: arrancando nginx en modo bootstrap (solo puerto 80) =="
docker compose run --rm -d --no-deps \
    --name iandrea-nginx-bootstrap \
    -p 80:80 \
    -v "$(pwd)/deploy/nginx-bootstrap.conf:/etc/nginx/conf.d/default.conf:ro" \
    --entrypoint "nginx -g 'daemon off;'" \
    web

sleep 3

echo "== 2/3: solicitando certificado con certbot =="
docker compose run --rm --no-deps \
    -e CERTBOT_EMAIL="$CERTBOT_EMAIL" \
    --entrypoint "certbot certonly --webroot --webroot-path=/var/www/certbot --email $CERTBOT_EMAIL --agree-tos --no-eff-email -d $DOMAIN -d $WWW_DOMAIN -d $OTP_DOMAIN --expand" \
    certbot

echo "== 3/3: parando el bootstrap y levantando el stack definitivo =="
docker stop iandrea-nginx-bootstrap
docker compose up -d

echo "Listo. Certificado emitido y stack completo corriendo en https://$DOMAIN"
