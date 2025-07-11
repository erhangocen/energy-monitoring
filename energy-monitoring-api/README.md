<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">⚡️ Energy Monitoring API</h1>

<p align="center">
  <b>Sayaç okuma ve enerji tüketimi takip sistemi</b>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
  <img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" />
  <img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" />
  <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/>
</p>

---

## 🚀 Proje Hakkında

Energy Monitoring API, enerji sayaçlarının okumalarını takip etmek, tüketim analizleri yapmak ve raporlar oluşturmak için geliştirilmiş modern bir REST API'dir.

---

## 🏗️ Mimaride Kullandığımız Patternler

### 🧩 **Generic Repository Pattern**
- Tüm veri erişim katmanında generic repository yapısı kullanıldı.
- **Avantajları:**
  - Kod tekrarını azaltır, ortak CRUD işlemlerini merkezi hale getirir.
  - Mock repository ile kolayca test edilebilir.
  - Yeni entity eklemek çok hızlı ve güvenli.

### 🏛️ **Domain-Driven Design (DDD) & Modülerlik**
- Her iş alanı (user, meter, organization, vs.) kendi domain, application, infrastructure ve api katmanlarına ayrıldı.
- **Avantajları:**
  - Kodun okunabilirliği ve sürdürülebilirliği artar.
  - Bağımsız geliştirme ve test kolaylığı sağlar.
  - Büyük projelerde ölçeklenebilirlik sunar.

### 🧪 **Teste Uygunluk**
- Repository ve servisler interface üzerinden enjekte edilir.
- Mock repository ile unit test yazmak çok kolaydır.
- Her modül bağımsız olarak test edilebilir.

---

## 🧑‍🔬 Unit Test Desteği

- Tüm repository ve servisler için kolayca unit test yazılabilir.
- Örnek olarak, `PrismaMeterRepository` ve `MeterService` için Jest ile yazılmış test dosyaları mevcuttur.
- Testler mock repository ile çalışır, gerçek veritabanına ihtiyaç duymaz.
- Test örnekleri için: `src/modules/meter/infrastructure/repository/prisma-meter.repository.spec.ts` ve `src/modules/meter/application/use-cases/meter.service.spec.ts`

---

## 🎁 Bonus: UserMeter Modülü

- **UserMeter** modülü, kullanıcıların sayaçlara esnek şekilde atanmasını sağlar.
- Bir kullanıcı birden fazla sayaca, bir sayaç da birden fazla kullanıcıya atanabilir (many-to-many).
- Bu modül, enerji yönetiminde esnek yetkilendirme ve paylaşım senaryoları için geliştirilmiştir.
- Kodun modüler yapısı sayesinde kolayca genişletilebilir ve test edilebilir.

---

## 📚 Özellikler

- ✅ **Kullanıcı Yönetimi** - JWT tabanlı authentication
- ✅ **Organizasyon Yönetimi** - Çoklu organizasyon desteği
- ✅ **Sayaç Yönetimi** - Sayaç ekleme, düzenleme, silme
- ✅ **Okuma Takibi** - Sayaç okumalarını kaydetme ve analiz
- ✅ **Raporlama** - Tüketim raporları ve analizler
- ✅ **Güvenlik** - Rate limiting, input validation, CORS protection
- ✅ **API Dokümantasyonu** - Swagger/OpenAPI desteği

---

## 🛡️ Güvenlik

- Rate Limiting (Throttler)
- Helmet.js (HTTP Headers)
- CORS Protection
- Input Validation
- JWT Authentication
- Password Hashing
- Request Logging
- Error Handling

---

## 🚦 Hızlı Başlangıç

Detaylı kurulum rehberi için [SETUP.md](./SETUP.md) dosyasını inceleyin.

### 🐳 Docker ile (Önerilen)
```bash
# Projeyi klonlayın
git clone <repository-url>
cd energy-monitoring-api

# Docker ile başlatın
npm run docker:dev
```

### 💻 Yerel Kurulum
```bash
# Projeyi klonlayın
git clone <repository-url>
cd energy-monitoring-api

# Bağımlılıkları yükleyin
pnpm install

# Environment variables ayarlayın (.env dosyası oluşturun)
# DATABASE_URL, JWT_SECRET, PORT, ALLOWED_ORIGINS

# Database'i kurun ve seed data ekleyin
npm run db:setup

# Uygulamayı başlatın
pnpm run start:dev
```

---

## 🔑 Default Kullanıcı
- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Role:** `admin`

---

## 🧪 Test Komutları

```bash
# Unit testler
pnpm run test

# e2e testler
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

---

## 📖 API Dokümantasyonu

Swagger arayüzüne erişmek için uygulama çalıştıktan sonra:
- [http://localhost:3000/api](http://localhost:3000/api)

---

## 📝 Lisans

MIT
