#!/bin/sh
set -e

DOMAIN="iandrea.ai"
WWW_DOMAIN="www.iandrea.ai"
OTP_DOMAIN="otp.iandrea.ai"
EMAIL="${CERTBOT_EMAIL:?La variable de entorno CERTBOT_EMAIL es obligatoria}"

if [ ! -d "/etc/letsencrypt/live/$DOMAIN" ]; then
    echo "No existe certificado para $DOMAIN, solicitando uno nuevo..."
    certbot certonly \
        --webroot --webroot-path=/var/www/certbot \
        --email "$EMAIL" --agree-tos --no-eff-email \
        -d "$DOMAIN" -d "$WWW_DOMAIN" -d "$OTP_DOMAIN" --expand
else
    echo "Certificado para $DOMAIN ya existe, se omite la emisión inicial."
    echo "(Si falta un SAN nuevo, p.ej. $OTP_DOMAIN, ver deploy/README.md: ampliar con --expand)"
fi

echo "Certbot arrancado. Comprobando renovación cada 24h."
while :; do
    certbot renew --webroot --webroot-path=/var/www/certbot --quiet
    sleep 24h
done
