# 🚀 Energy Monitoring API - Kurulum Rehberi

Bu rehber, Energy Monitoring API projesini yerel geliştirme ortamınızda nasıl kuracağınızı açıklar.

## 📋 Gereksinimler

### Seçenek 1: Docker ile (Önerilen)
- **Docker** (v20 veya üzeri)
- **Docker Compose** (v2 veya üzeri)

### Seçenek 2: Yerel Kurulum
- **Node.js** (v18 veya üzeri)
- **PostgreSQL** (v12 veya üzeri)
- **pnpm** (npm alternatifi, daha hızlı)

## 🔧 Kurulum Adımları

### 🐳 Docker ile Kurulum (Önerilen)

#### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd energy-monitoring-api
```

#### 2. Uygulamayı Başlatın
```bash
# Development modunda başlat
npm run docker:dev
```

Bu komut şunları yapar:
- PostgreSQL container'ını başlatır
- API container'ını build eder ve başlatır
- Database'i otomatik kurar ve seed data ekler
- Hot reload ile development server'ı başlatır

#### 3. Uygulamayı Durdurun
```bash
# Container'ları durdur
npm run docker:dev:down
```

#### 4. Production Modunda Çalıştırma
```bash
# Environment variables ayarlayın
cp .env.example .env
# .env dosyasını düzenleyin

# Production modunda başlat
npm run docker:prod
```

### 💻 Yerel Kurulum

#### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd energy-monitoring-api
```

#### 2. Bağımlılıkları Yükleyin
```bash
pnpm install
```

#### 3. Environment Variables Ayarlayın
`.env` dosyası oluşturun:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/energy_monitoring"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"

# Server
PORT=3000
NODE_ENV=development

# CORS
ALLOWED_ORIGINS="http://localhost:5174,http://localhost:3000"
```

#### 4. Database'i Kurun ve Seed Data Ekleyin
```bash
# Database'i sıfırla, migration'ları at ve seed data ekle
npm run db:setup
```

#### 5. Uygulamayı Başlatın
```bash
# Development modunda başlat
pnpm run start:dev
```

## 🔑 Default Kullanıcı Bilgileri

Setup tamamlandıktan sonra şu bilgilerle giriş yapabilirsiniz:

- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Role:** `admin`

## 📊 Oluşturulan Sample Data

Setup sırasında şu veriler otomatik olarak oluşturulur:

- **Organization:** Default Organization
- **User:** Admin User (admin@example.com)
- **Meter:** METER-001
- **Sample Reading:** İlk meter okuması (100 kWh)

## 🛠️ Kullanışlı Komutlar

### 🐳 Docker Komutları
```bash
# Development
npm run docker:dev      # Development modunda başlat
npm run docker:dev:down # Development container'larını durdur

# Production
npm run docker:prod     # Production modunda başlat
npm run docker:prod:down # Production container'larını durdur

# Temizlik
npm run docker:clean    # Container'ları ve volume'ları temizle
```

### 💻 Yerel Komutlar
```bash
# Database işlemleri
npm run db:reset    # Database'i sıfırla
npm run db:seed     # Sadece seed data ekle
npm run db:setup    # Tam setup (reset + seed)

# Development
pnpm run start:dev  # Development server
pnpm run build      # Production build
pnpm run lint       # Code linting
pnpm run test       # Unit tests

# Prisma
npx prisma studio   # Database GUI
npx prisma generate # Prisma client'ı yeniden oluştur
npx prisma migrate dev # Yeni migration oluştur
```

## 🔒 Güvenlik Özellikleri

Proje aşağıdaki güvenlik önlemleriyle korunmaktadır:

- **Rate Limiting:** API isteklerini sınırlar
- **Helmet.js:** HTTP güvenlik headers'ları
- **CORS Protection:** Cross-origin request koruması
- **Input Validation:** Tüm input'lar validate edilir
- **JWT Authentication:** Token-based authentication
- **Password Hashing:** bcrypt ile şifre hashleme
- **Request Logging:** Tüm istekler loglanır
- **Error Handling:** Merkezi hata yönetimi

## 📝 API Dokümantasyonu

Uygulama çalıştıktan sonra Swagger dokümantasyonuna şu adresten erişebilirsiniz:

```
http://localhost:3000/api
```

## 🐛 Sorun Giderme

### Database Bağlantı Hatası
```bash
# PostgreSQL servisinin çalıştığından emin olun
brew services start postgresql  # macOS
sudo systemctl start postgresql # Linux
```

### Port Kullanımda Hatası
```bash
# 3000 portunu kullanan process'i bulun ve sonlandırın
lsof -ti:3000 | xargs kill -9
```

### Prisma Client Hatası
```bash
# Prisma client'ı yeniden oluşturun
npx prisma generate
```

---