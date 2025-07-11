# ⚡️ Energy Monitoring Monorepo

**Energy Monitoring** projesine hoş geldiniz! Bu monorepo, modern ve tam kapsamlı bir enerji izleme çözümü için hem backend API'yi hem de frontend UI'ı içerir.

---

## 🚀 Genel Bakış

Enerji tüketimini izleyin, analiz edin ve yönetin! Kurumlar ve bireyler için gerçek zamanlı enerji takibi ve raporlama sunan, ölçeklenebilir ve kullanıcı dostu bir platform.

---

## 🗂️ Proje Yapısı

```
energy-monitoring/
├── energy-monitoring-api/   # NestJS tabanlı backend API
└── energy-monitoring-ui/    # React tabanlı frontend UI
```

- **/energy-monitoring-api** — NestJS & Prisma ile güçlü REST API
- **/energy-monitoring-ui**  — Modern, şık React tabanlı gösterge paneli

---

## 🛠️ Kullanılan Teknolojiler

### Backend
- 🟦 **Node.js** (v18+)
- 🚀 **NestJS**
- 🟪 **Prisma ORM**
- 🐘 **PostgreSQL** (varsayılan, değiştirilebilir)
- 🔒 **JWT Auth**
- 🐳 **Docker** & **Docker Compose**

### Frontend
- ⚛️ **React** (Vite ile)
- 💅 **TailwindCSS**
- 🧩 **TypeScript**
- 📦 **pnpm** (veya npm/yarn)

---

## ⚡️ Hızlı Başlangıç

### 1️⃣ Gereksinimler
- Node.js (v18+ önerilir)
- pnpm (veya npm/yarn)
- Docker & Docker Compose (opsiyonel, kolay kurulum için önerilir)

### 2️⃣ Tüm Projeleri Tek Komutla Başlat

```bash
docker-compose up --build
```

> ℹ️ Ana dizindeki `docker-compose.yml` dosyası ile hem API hem de UI servisini birlikte başlatabilirsiniz.

Başlattıktan sonra aşağıdaki adreslerden uygulamaları görüntüleyebilirsiniz:

- [http://localhost:3000/api](http://localhost:3000/api) — 📖 API dokümantasyonu (Swagger arayüzü)
- [http://localhost:5173](http://localhost:5173) — 🖥️ Kullanıcı Arayüzü (Dashboard)

---

## 🧑‍💻 Projeleri Tek Tek Çalıştırmak

### Backend (API)

```bash
cd energy-monitoring-api
pnpm install
pnpm run start:dev
```
- Başlatmadan önce `.env` dosyasını `env.example`'dan kopyalayın.

### Frontend (UI)

```bash
cd energy-monitoring-ui
pnpm install
pnpm run dev
```
- Başlatmadan önce `.env` dosyasını `env.example`'dan kopyalayın.

---

## 🐳 Docker ile Çalıştırmak

Her projenin kendi Dockerfile ve docker-compose.yml dosyası vardır. Dilerseniz ayrı ayrı da başlatabilirsiniz:

```bash
cd energy-monitoring-api
docker-compose up --build
# Yeni bir terminalde:
cd energy-monitoring-ui
docker-compose up --build
```

---

## 📦 Ortak Komutlar

- `pnpm install` — Bağımlılıkları yükler
- `pnpm run dev` — Geliştirme modunda başlatır
- `docker-compose up --build` — Docker ile başlatır

---

## 📚 Daha Fazla Bilgi

Her projenin kendi README dosyasında detaylı kurulum ve kullanım bilgileri bulabilirsiniz:
- [energy-monitoring-api/README.md](energy-monitoring-api/README.md)
- [energy-monitoring-ui/README.md](energy-monitoring-ui/README.md)

---

## ❓ SSS

**S: Tek komutla her iki projeyi de başlatabilir miyim?**  
C: Evet! Ana dizindeki Docker Compose dosyasını kullanın:

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
    build: ./energy-monitoring-ui
    ports:
      - "5173:5173"
    env_file:
      - ./energy-monitoring-ui/env.example
```

Ardından:

```bash
docker-compose up --build
```

---

## 🤝 Katkı & İletişim

Her türlü öneri, hata bildirimi veya katkı için lütfen issue açın veya PR gönderin!

---

✨ İyi kodlamalar! ✨ 