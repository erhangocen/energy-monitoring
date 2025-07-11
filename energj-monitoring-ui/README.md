# Energy Monitoring UI

Modern ve ölçeklenebilir bir enerji izleme sistemi için React tabanlı admin paneli.

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18.x+
- pnpm 9.x+ (önerilen)

### Kurulum
```bash
# Projeyi klonlayın
git clone <repository-url>
cd energy-monitoring-ui

# Environment variables ayarlayın
cp env.example .env

# Bağımlılıkları yükleyin
pnpm install

# Geliştirme sunucusunu başlatın
pnpm dev
```

Uygulama http://localhost:5174 adresinde çalışacaktır.

## 📚 Detaylı Kurulum

Kapsamlı kurulum rehberi için [setup.md](./setup.md) dosyasını inceleyin.

## 🐳 Docker ile Kurulum

### Development
```bash
docker-compose --profile dev up
```

### Production
```bash
docker-compose up --build
```

## 🛠️ Kullanılan Teknolojiler

### Frontend Framework
- **React 18** - Modern React hooks ve concurrent features
- **TypeScript** - Tip güvenliği
- **Vite** - Hızlı build tool

### UI & Styling
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Erişilebilir component primitives
- **Lucide React** - Modern ikonlar
- **Framer Motion** - Animasyonlar

### State Management & Data Fetching
- **@tanstack/react-query** - Server state management
- **React Hook Form** - Form yönetimi
- **Zod** - Şema doğrulama

### Charts & Data Visualization
- **ECharts** - Güçlü grafik kütüphanesi
- **Recharts** - React tabanlı grafikler

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks (opsiyonel)

## 📁 Proje Yapısı

```
src/
├── components/     # UI componentleri
│   ├── ui/        # Radix UI tabanlı componentler
│   ├── custom/    # Özel componentler
│   └── icons/     # İkon componentleri
├── pages/         # Sayfa componentleri
│   ├── auth/      # Kimlik doğrulama sayfaları
│   ├── dashboard/ # Dashboard sayfaları
│   └── errors/    # Hata sayfaları
├── hooks/         # Custom React hooks
├── data/          # Veri modelleri ve sabitler
├── lib/           # Yardımcı fonksiyonlar
├── network/       # API ve network işlemleri
└── assets/        # Statik dosyalar
```

## 🔧 Konfigürasyon

### Environment Variables
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# Application
VITE_APP_NAME=Energy Monitoring UI
VITE_APP_ENVIRONMENT=development
```

### Build Scripts
```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm build:prod   # Optimized production build
pnpm preview      # Build preview
```

## 🚀 Production Deployment

### Docker ile
```bash
# Production build
docker build -t energy-monitoring-ui .
docker run -p 3000:80 energy-monitoring-ui
```

### Manual Build
```bash
pnpm build:prod
# dist/ klasöründeki dosyaları web sunucusuna deploy edin
```

## 🔍 Code Quality

```bash
pnpm lint         # ESLint kontrolü
pnpm lint:fix     # Otomatik düzeltme
pnpm format       # Prettier format
pnpm type-check   # TypeScript kontrolü
```

## 📊 Özellikler

- ✅ Modern React 18 mimarisi
- ✅ TypeScript ile tip güvenliği
- ✅ Responsive ve accessible UI
- ✅ Dark/Light tema desteği
- ✅ JWT tabanlı kimlik doğrulama
- ✅ Real-time veri görselleştirme
- ✅ Optimized production build
- ✅ Docker desteği
- ✅ Comprehensive error handling
- ✅ Internationalization ready

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 Destek

- 📖 [Setup Guide](./setup.md) - Detaylı kurulum rehberi
- 🐛 [Issues](https://github.com/your-repo/issues) - Bug reports
- 💬 [Discussions](https://github.com/your-repo/discussions) - Sorular ve öneriler

## 📄 Lisans

Bu proje [MIT License](./LICENSE) altında lisanslanmıştır.

---

**Energy Monitoring UI** - Modern enerji izleme sistemi için güçlü ve kullanıcı dostu arayüz.
