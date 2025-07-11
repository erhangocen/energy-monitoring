# Energy Monitoring UI - Setup Guide

Bu doküman, Energy Monitoring UI projesini local geliştirme ortamında hızlıca ayağa kaldırmak için hazırlanmıştır.

## 📋 Gereksinimler

### Sistem Gereksinimleri
- **Node.js**: 18.x veya üzeri
- **pnpm**: 9.x veya üzeri (önerilen) veya npm/yarn
- **Git**: 2.x veya üzeri
- **Docker**: 20.x veya üzeri (opsiyonel)

### Node.js Kurulumu
```bash
# macOS (Homebrew)
brew install node

# Windows (Chocolatey)
choco install nodejs

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# pnpm kurulumu
npm install -g pnpm
```

## 🚀 Hızlı Başlangıç

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd energy-monitoring-ui
```

### 2. Environment Variables Ayarlayın
```bash
# Örnek environment dosyasını kopyalayın
cp env.example .env

# .env dosyasını düzenleyin
# API URL'nizi ve diğer ayarları güncelleyin
```

### 3. Bağımlılıkları Yükleyin
```bash
# pnpm kullanarak (önerilen)
pnpm install

# veya npm kullanarak
npm install

# veya yarn kullanarak
yarn install
```

### 4. Geliştirme Sunucusunu Başlatın
```bash
# pnpm ile
pnpm dev

# veya npm ile
npm run dev

# veya yarn ile
yarn dev
```

Uygulama http://localhost:5174 adresinde çalışacaktır.

## 🐳 Docker ile Kurulum

### Development Ortamı
```bash
# Development container'ı başlatın
docker-compose --profile dev up

# veya sadece build edin
docker build -f Dockerfile.dev -t energy-monitoring-ui-dev .
docker run -p 5174:5174 -v $(pwd):/app energy-monitoring-ui-dev
```

### Production Ortamı
```bash
# Production build
docker-compose up --build

# veya manuel olarak
docker build -t energy-monitoring-ui .
docker run -p 3000:80 energy-monitoring-ui
```

## ⚙️ Environment Variables

### Gerekli Environment Variables
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# Application Configuration
VITE_APP_NAME=Energy Monitoring UI
VITE_APP_VERSION=1.0.0-beta.1
VITE_APP_ENVIRONMENT=development

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=true

# Authentication
VITE_AUTH_TOKEN_KEY=jwtToken
VITE_REFRESH_TOKEN_KEY=refreshToken

# Development
VITE_DEV_PORT=5174
VITE_DEV_HOST=localhost
```

### Environment Dosyaları
- `.env`: Local development
- `.env.local`: Local overrides
- `.env.production`: Production settings
- `.env.staging`: Staging settings

## 📦 Available Scripts

### Development Scripts
```bash
pnpm dev          # Development server başlatır
pnpm build        # Production build
pnpm build:prod   # Production build (optimized)
pnpm preview      # Build preview
pnpm preview:prod # Production preview
```

### Code Quality Scripts
```bash
pnpm lint         # ESLint kontrolü
pnpm lint:fix     # ESLint otomatik düzeltme
pnpm format       # Prettier format
pnpm format:check # Prettier kontrolü
pnpm type-check   # TypeScript tip kontrolü
```

### Docker Scripts
```bash
pnpm docker:build # Docker image build
pnpm docker:run   # Docker container çalıştır
```

## 🏗️ Proje Yapısı

```
energy-monitoring-ui/
├── src/
│   ├── components/     # UI componentleri
│   ├── pages/         # Sayfa componentleri
│   ├── hooks/         # Custom React hooks
│   ├── data/          # Veri modelleri ve sabitler
│   ├── lib/           # Yardımcı fonksiyonlar
│   ├── network/       # API ve network işlemleri
│   └── assets/        # Statik dosyalar
├── public/            # Public assets
├── dist/              # Build çıktısı
├── Dockerfile         # Production Docker
├── Dockerfile.dev     # Development Docker
├── docker-compose.yml # Docker Compose
├── nginx.conf         # Nginx konfigürasyonu
└── setup.md           # Bu dosya
```

## 🔧 Konfigürasyon

### Vite Konfigürasyonu
- `vite.config.ts`: Build ve development ayarları
- Port: 5174 (development)
- Host: Tüm ağ arayüzleri
- Source maps: Development'ta aktif

### TypeScript Konfigürasyonu
- `tsconfig.json`: TypeScript ayarları
- Strict mode: Aktif
- Path aliases: `@/` -> `src/`

### Tailwind CSS
- `tailwind.config.js`: Tailwind ayarları
- Custom theme: Aktif
- Dark mode: Destekleniyor

## 🚀 Production Deployment

### Build Process
```bash
# Production build
pnpm build:prod

# Build çıktısı dist/ klasöründe
```

### Docker Deployment
```bash
# Production image build
docker build -t energy-monitoring-ui .

# Container çalıştır
docker run -d -p 3000:80 --name energy-ui energy-monitoring-ui
```

### Nginx Configuration
- Static file serving
- Gzip compression
- Security headers
- Client-side routing support
- Cache optimization

## 🔍 Troubleshooting

### Yaygın Sorunlar

#### Port 5174 Kullanımda
```bash
# Farklı port kullanın
VITE_DEV_PORT=3000 pnpm dev
```

#### Node Modules Sorunu
```bash
# node_modules'ü silin ve yeniden yükleyin
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Docker Build Hatası
```bash
# Docker cache'i temizleyin
docker system prune -a
docker build --no-cache -t energy-monitoring-ui .
```

#### Environment Variables Çalışmıyor
```bash
# .env dosyasının doğru konumda olduğunu kontrol edin
# VITE_ prefix'inin eklendiğinden emin olun
```

### Debug Mode
```bash
# Debug modunu aktifleştirin
VITE_ENABLE_DEBUG_MODE=true pnpm dev
```

## 📚 Ek Kaynaklar

### Dokümantasyon
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)

### IDE Ayarları
- **VS Code Extensions**:
  - ESLint
  - Prettier
  - TypeScript Importer
  - Tailwind CSS IntelliSense

### Git Hooks (Opsiyonel)
```bash
# Pre-commit hooks kurulumu
pnpm install -D husky lint-staged
npx husky install
npx husky add .husky/pre-commit "pnpm lint-staged"
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Bu dokümanı kontrol edin
2. GitHub Issues'da arama yapın
3. Yeni issue açın

---

**Not**: Bu setup guide sürekli güncellenmektedir. En güncel versiyon için repository'yi kontrol edin. 