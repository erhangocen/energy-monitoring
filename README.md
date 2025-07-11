# Energy Monitoring Monorepo

Bu repoda hem backend (API) hem de frontend (UI) projeleri birlikte yer almaktadır.

## Klasör Yapısı

- `/energy-monitoring-api` — NestJS tabanlı backend API
- `/energj-monitoring-ui` — React tabanlı frontend arayüz

---

## Hızlı Başlangıç

### Gereksinimler

- Node.js (v18+ önerilir)
- pnpm (veya npm/yarn)
- Docker & Docker Compose (opsiyonel, kolay kurulum için önerilir)

### Tüm Projeleri Tek Komutla Başlatmak

Her iki projeyi de Docker Compose ile tek komutla başlatabilirsiniz:

```bash
docker-compose up --build
```

> Not: Ana dizindeki `docker-compose.yml` dosyası ile iki servisi birden ayağa kaldırabilirsiniz.

---

## Projeleri Tek Tek Çalıştırmak

### Backend (API)

```bash
cd energy-monitoring-api
pnpm install
pnpm run start:dev
```

- .env dosyasını `env.example`'dan kopyalayarak oluşturmayı unutmayın.

### Frontend (UI)

```bash
cd energj-monitoring-ui
pnpm install
pnpm run dev
```

- .env dosyasını `env.example`'dan kopyalayarak oluşturmayı unutmayın.

---

## Docker ile Çalıştırmak

Her iki klasörde de kendi Dockerfile ve docker-compose.yml dosyaları mevcut. Dilerseniz her birini ayrı ayrı da başlatabilirsiniz:

```bash
cd energy-monitoring-api
docker-compose up --build
# Yeni terminalde:
cd energj-monitoring-ui
docker-compose up --build
```

---

## Ortak Komutlar

- `pnpm install` — Bağımlılıkları yükler
- `pnpm run dev` — Geliştirme modunda başlatır
- `docker-compose up --build` — Docker ile başlatır

---

## Ek Bilgiler

Her bir projenin kendi README dosyasında daha detaylı kurulum ve kullanım bilgileri bulabilirsiniz:

- [energy-monitoring-api/README.md](energy-monitoring-api/README.md)
- [energj-monitoring-ui/README.md](energj-monitoring-ui/README.md)

---

## Sıkça Sorulan Sorular

**S: Tek komutla her iki projeyi de başlatmak mümkün mü?**  
C: Evet, ana dizindeki Docker Compose ile bu mümkün. Aşağıdaki gibi bir `docker-compose.yml` dosyası ana dizinde mevcut:

```yaml
version: '3.8'
services:
  api:
    build: ./energy-monitoring-api
    ports:
      - "3000:3000"
    env_file:
      - ./energy-monitoring-api/env.example
  ui:
    build: ./energj-monitoring-ui
    ports:
      - "5173:5173"
    env_file:
      - ./energj-monitoring-ui/env.example
```

Ve ardından:

```bash
docker-compose up --build
```

---

## Katkı ve İletişim

Her türlü öneri, hata bildirimi veya katkı için lütfen iletişime geçin veya PR açın.

--- 