# ─── Base : PHP 8.3 ──────────────────────────────────────────
FROM php:8.3-cli-alpine

# Extensions PHP nécessaires pour Laravel
RUN apk add --no-cache \
        bash \
        curl \
        zip \
        unzip \
        git \
        libpng-dev \
        libzip-dev \
        oniguruma-dev \
        postgresql-dev \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        pdo_pgsql \
        mbstring \
        zip \
        gd \
        bcmath

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY composer*.json ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

COPY . .

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage \
    && chmod -R 755 /var/www/bootstrap/cache

EXPOSE 10000

# Lance les migrations puis démarre le serveur HTTP sur le port de Render
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
