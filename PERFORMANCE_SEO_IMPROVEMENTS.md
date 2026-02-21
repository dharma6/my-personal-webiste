# Performance & SEO Improvement Plan for dharmabandaru.com

## 🎯 HIGH PRIORITY IMPROVEMENTS

### 1. Image Optimization (Save ~6MB, Improve LCP)

**Current Issue:** Book cover images are 1-2.5MB each
**Target:** Reduce to 200-400KB each

**Solution:**

```bash
# Install sharp for image optimization
npm install sharp

# Create optimization script
node scripts/optimize-images.js
```

**Next.js Config Update:**

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};
```

**Expected Impact:**

- 70% faster image loading
- Better Core Web Vitals (LCP)
- Lower bandwidth costs

---

### 2. Update Sitemap (Add Missing Pages)

**Current Issue:** Sitemap missing `/demos` page and has outdated dates

**Fix:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dharmabandaru.com</loc>
    <lastmod>2026-02-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dharmabandaru.com/demos</loc>
    <lastmod>2026-02-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

---

### 3. Add Missing SEO Assets

**Missing Files:**

- `/public/og-image.jpg` (1200x630px) - For social sharing
- `/public/icon.svg` - Favicon
- `/public/apple-touch-icon.png` (180x180px)

**Action:** Create these images with your branding

---

### 4. Add Structured Data (Schema.org)

**Add to layout.js:**

```javascript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dharma Teja Bandaru',
  alternateName: 'Dharma Bandaru',
  url: 'https://dharmabandaru.com',
  image: 'https://dharmabandaru.com/og-image.jpg',
  jobTitle: 'Sr.Software Engineer - Gen AI',
  worksFor: {
    '@type': 'Organization',
    name: 'Your Company',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Austin',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  sameAs: [
    'https://linkedin.com/in/yourprofile',
    'https://github.com/yourusername',
  ],
  knowsAbout: ['AWS', 'Gen-AI', 'Backend Development', 'Cloud Architecture'],
};
```

---

## 🚀 MEDIUM PRIORITY IMPROVEMENTS

### 5. Enable Next.js Image Optimization

**Update Work.jsx to use optimized images:**

```javascript
<Image
  src={`/${project.bgImage}`}
  alt={project.altText}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
  priority={index < 2} // Prioritize first 2 images
  quality={85}
/>
```

---

### 6. Add Analytics & Performance Monitoring

**Google Analytics 4:**

```javascript
// app/layout.js
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

---

### 7. Implement Lazy Loading

**For below-the-fold content:**

```javascript
// Use dynamic imports
const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => <div>Loading...</div>,
});
```

---

### 8. Add Blog Section (SEO Boost)

**Create `/app/blog` directory:**

- Write technical articles about your projects
- Share insights on AWS, Gen-AI, backend development
- Each article = new indexed page = more SEO value

---

## 💡 LOW PRIORITY (Nice to Have)

### 9. Add RSS Feed

- Helps with content distribution
- Good for SEO

### 10. Implement Service Worker

- Offline functionality
- Better PWA score

### 11. Add Breadcrumbs

- Better navigation
- SEO benefit

### 12. Create Video Thumbnails

- Generate poster images for Vimeo embeds
- Faster perceived loading

---

## 📈 Expected Results

### Performance Metrics (Before → After):

- **Page Load Time:** 3-4s → 1-2s
- **Largest Contentful Paint (LCP):** 3.5s → 1.5s
- **First Input Delay (FID):** Good → Good
- **Cumulative Layout Shift (CLS):** 0.1 → 0.05
- **Lighthouse Score:** 75 → 95+

### SEO Improvements:

- ✅ Better social media previews
- ✅ Rich snippets in search results
- ✅ Improved crawlability
- ✅ Better mobile experience
- ✅ More indexed pages (with blog)

---

## 🛠️ Implementation Order

1. **Week 1:** Image optimization + Sitemap update
2. **Week 2:** Add missing SEO assets + Structured data
3. **Week 3:** Analytics + Performance monitoring
4. **Week 4:** Blog section (optional but recommended)

---

## 📊 Tools to Monitor Progress

- **Google PageSpeed Insights:** https://pagespeed.web.dev/
- **Google Search Console:** Monitor indexing and search performance
- **Lighthouse:** Built into Chrome DevTools
- **GTmetrix:** https://gtmetrix.com/
- **WebPageTest:** https://www.webpagetest.org/

---

## 🎓 Additional Resources

- Next.js Image Optimization: https://nextjs.org/docs/app/building-your-application/optimizing/images
- Core Web Vitals: https://web.dev/vitals/
- Schema.org: https://schema.org/Person
