import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = 'Gridline Digital - Jasa Pembuatan Website & Aplikasi Terbaik', 
  description = 'Gridline Digital adalah agensi spesialis pembuatan website profesional, aplikasi mobile, dan sistem informasi khusus untuk kebutuhan bisnis Anda.', 
  url = 'https://gridlinedigital.site/',
  image = 'https://gridlinedigital.site/og-image.jpg',
  type = 'website',
  structuredData = null
}) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
