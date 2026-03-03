# VibeCheck Mobile App Challenge

Bu proje, öğrencilerin ruhsal iyi oluşlarını desteklemek ve güvenli bir alan sağlamak amacıyla geliştirilmiş yenilikçi bir mobil uygulamadır. Üniversite öğrencilerini merkeze alarak tasarlanan uygulama, stres, anksiyete, bağımlılık gibi konularda yol gösterici bir destek mekanizması sunar. Verilen tasarım kurallarına (glassmorphism/cam efekti, derin mor-mavi gradyanlar, interaktif mikro animasyonlar) sadık kalınarak, kullanıcıda güven ve huzur uyandıran modern bir arayüz inşa edilmiştir.

## Proje Notu
Hedef kitlemiz dijital çağın getirdiği zorluklarla mücadele eden genç yetişkinler ve üniversite öğrencileridir. Bu uygulama ile öğrencilerin yalnız olmadıklarını hissetmeleri, doğru bilgiye anonim ve güvenli bir şekilde ulaşmaları amaçlanmıştır. Tasarımda istenilen soft geçişler, saydam kartlar ve neon parıltılar ile yenilikçi bir kullanıcı deneyimi (UX) sağlanmıştır.

## Faz 2 - Gelişmiş Özellikler & Dinamik UX
Proje ikinci bir faza geçerek **Tamamen Dinamik** bir altyapıya kavuşmuştur:
- **Özet Not:** Dinamik veri akışı ve her modüle özel interaktif araçlar eklendi.
- **Özelleştirilmiş Kategori İçerikleri:** Her kategori, kendine özel açıklamalar, etkileşimli "Action Butonları" ve ipuçları barındırır.
- **Etkileşimli Animasyonlar:** Anasayfadaki butonlara dokunulduğunda küçülme (scale) efektleri ve ekstra derinlik sağlayan gölgelendirmeler eklendi.
- **Yükleme Simülasyonu:** Kullanıcı deneyimini güçlendirmek için açılışta 2 saniyelik bir yükleme (Loading) simülasyonu çalıştırılır.
- **Etkileşim Geri Bildirimi:** Detay sayfasında yıldızlama veya form gönderimlerinde, özel tasarımlı animasyonlu "Toast / Modal" mesajları sunularak başarılı veri iletimi kullanıcıya hissettirilmektedir.

## Kullanılan Teknolojiler
- **React Native & Expo SDK 54** (En güncel sürüm)
- **React Navigation v6** (Native Stack)
- **Expo Linear Gradient** (Modern arka planlar)
- **Expo Vector Icons** (Arayüz ikonları)

## Kurulum ve Yerelde Çalıştırma
Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Depoyu Klonlayın veya İndirin:**
   ```bash
   git clone <repo-url>
   cd VibeCheck
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Uygulamayı Başlatın:**
   ```bash
   npx expo start
   ```

   Terminalde beliren QR kodu telefonunuzdaki **Expo Go** uygulaması ile okutarak projeyi test edebilirsiniz. (Dilerseniz `a` tuşuna basarak Android Emulator üzerinde veya `i` tuşuna basarak iOS Simulator üzerinde çalıştırabilirsiniz).

## Proje Tanıtım Videosu
**YouTube Linki:** [BURAYA YOUTUBE LİNKİ GELECEK]

## Derlenmiş Uygulama Dosyaları
- **APK (Android):** `[APK DOSYA YOLU VEYA LİNKİ BURAYA GELECEK]`
- **IPA (iOS):** `[IPA DOSYA YOLU VEYA LİNKİ BURAYA GELECEK]`

## Klasör Yapısı (Modüler Mimari)
Uygulama, sürdürülebilir olması adına temiz bir mimariyle oluşturulmuştur:
- `/src/components`: Tekrar kullanılabilir arayüz elemanları (`GlassCard`, `GradientBackground`, `TabBar`).
- `/src/constants`: Proje genelinde kullanılan renk teması (`theme.js`).
- `/src/data`: İstekleri simüle eden Mock data & Context Api yapısı (`mockContext.js`).
- `/src/navigation`: Ekranları yöneten yığın yapısı (`AppNavigator.js`).
- `/src/screens`: Uygulama sayfaları (`SplashScreen`, `ListScreen`, `DetailScreen`).

---
*Bu proje "Mobile App Challenge" kapsamında başarıyla tamamlanmıştır.*
