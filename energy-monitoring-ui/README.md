# ⚡️ Energy Monitoring UI

Modern ve ölçeklenebilir bir enerji izleme sistemi için React tabanlı admin paneli.

---

## 🏗️ Temel Altyapı & Mimarisi

> 🧩 **Bu proje, kendi geliştirdiğim [react-admin-architecture-template](https://github.com/erhangocen/react-admin-architecture-template) projesi temel alınarak oluşturulmuştur.**
>
> - Template, modern React projeleri için ölçeklenebilir, domain'den bağımsız bir başlangıç mimarisi sunar.
> - Kolayca kendi iş kurallarınızı ve veri modellerinizi entegre edebilirsiniz.

---

## 🏛️ MVVM Pattern & Avantajları

- **MVVM (Model-View-ViewModel)** yaklaşımı ile kodunuzu katmanlara ayırır:
  - **Model:** Veri ve iş kuralları
  - **View:** UI componentleri
  - **ViewModel:** UI ile model arasındaki mantık ve state yönetimi
- **Avantajları:**
  - Ayrık katmanlar sayesinde okunabilirlik ve sürdürülebilirlik artar
  - Test yazmak ve refactor yapmak kolaylaşır
  - Büyük projelerde ekip çalışmasını kolaylaştırır

---

## 🛠️ Kullanılan Teknolojiler & Kütüphaneler

### 🎨 UI & Componentler
- **Shadcn UI** & **Radix UI** — Modern, erişilebilir ve özelleştirilebilir componentler
- **Lucide React** — Modern ikonlar
- **TailwindCSS** — Utility-first CSS framework
- **Framer Motion** — Animasyonlar

### 🧩 State & Form Yönetimi
- **@tanstack/react-query** — Server state management, cache
- **React Hook Form** — Form yönetimi
- **Zod** — Şema tabanlı doğrulama

### 📊 Grafik & Veri Görselleştirme
- **ECharts** & **Recharts** — Güçlü grafik ve chart kütüphaneleri

### 🔗 Network & API
- **Axios** — HTTP istekleri

### 🛠️ Diğerleri
- **dayjs** — Tarih işlemleri
- **clsx** & **class-variance-authority** — Dinamik className yönetimi
- **jwt-decode** — JWT token çözümleme

---

## ⚡️ Hızlı Başlangıç

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

Uygulama [http://localhost:5173](http://localhost:5173) adresinde çalışacaktır.

---

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

---

## 🚀 Build & Deployment

### Build Scripts
```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm build:prod   # Optimize production build
pnpm preview      # Build preview
```

### Docker ile
```bash
docker-compose --profile dev up   # Development
# veya
docker-compose up --build         # Production
```

---

## 📊 Özellikler

- ✅ Modern React 18 mimarisi
- ✅ MVVM pattern ile sürdürülebilir kod
- ✅ TypeScript ile tip güvenliği
- ✅ Responsive ve accessible UI
- ✅ Dark/Light tema desteği
- ✅ JWT tabanlı kimlik doğrulama
- ✅ Real-time veri görselleştirme
- ✅ Optimized production build
- ✅ Docker desteği
- ✅ Comprehensive error handling
- ✅ Internationalization ready

---

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📞 Destek

- 📖 [Setup Guide](./setup.md) - Detaylı kurulum rehberi
- 🐛 [Issues](https://github.com/your-repo/issues) - Bug reports
- 💬 [Discussions](https://github.com/your-repo/discussions) - Sorular ve öneriler

---

## 📄 Lisans

Bu proje [MIT License](./LICENSE) altında lisanslanmıştır.

---

**Energy Monitoring UI** — Modern enerji izleme sistemi için güçlü ve kullanıcı dostu arayüz.
