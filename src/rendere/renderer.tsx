// renderer/renderer.tsx
import ReactDOMServer from 'react-dom/server'
import React from 'react'

export { render }

function render(pageContext: any) {
  const { Page, pageProps } = pageContext

  // Default meta (آپ کا current code)
  const defaultMeta = {
    title: "Sky Elite Real Estate | Dubai Property Investment & Luxury Real Estate",
    description: "Invest in Dubai's premium real estate with Sky Elite. Off-plan properties, ready investments, and luxury villas with guaranteed returns. RERA-backed, tax-efficient long-term partnerships for global investors.",
    keywords: "Dubai real estate, property investment Dubai, luxury villas Dubai, off-plan properties, EMAAR properties, DAMAC properties, real estate investment, Dubai apartments",
    author: "Sky Elite Real Estate",
    ogTitle: "Luxurious 3-Bedroom Apartment in Downtown Dubai",
    ogDescription: "Connecting global investors to Dubai's performance-driven properties. Structured, tax-efficient, RERA-backed investments with guaranteed returns.",
    ogType: "website",
    ogUrl: "https://elite-real-estate-five.vercel.app/?v=2",
    ogImage: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2",
    ogImageWidth: "1200",
    ogImageHeight: "630",
    twitterCard: "summary_large_image",
    twitterTitle: "Sky Elite Real Estate | Dubai Property Investment",
    twitterDescription: "Premium Dubai real estate investments with guaranteed returns. Off-plan properties and luxury villas.",
    twitterImage: "https://elite-real-estate-five.vercel.app/share-image.jpg?v=2",
    canonical: "https://elite-real-estate-five.vercel.app/?v=2",
    favicon: "/favicon.png"
  }

  // Use page-specific meta if provided, otherwise use default
  const meta = pageContext.pageMeta || defaultMeta

  const appHtml = ReactDOMServer.renderToString(<Page {...pageProps} />)

  return {
    documentHtml: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${meta.title}</title>
          <link rel="icon" href="${meta.favicon}" />
          <meta name="description" content="${meta.description}" />
          <meta name="keywords" content="${meta.keywords}" />
          <meta name="author" content="${meta.author}" />

          <!-- Open Graph / Facebook -->
          <meta property="og:title" content="${meta.ogTitle}" />
          <meta property="og:description" content="${meta.ogDescription}" />
          <meta property="og:type" content="${meta.ogType}" />
          <meta property="og:url" content="${meta.ogUrl}" />
          <meta property="og:image" content="${meta.ogImage}" />
          <meta property="og:image:width" content="${meta.ogImageWidth}" />
          <meta property="og:image:height" content="${meta.ogImageHeight}" />

          <!-- Twitter Card -->
          <meta name="twitter:card" content="${meta.twitterCard}" />
          <meta name="twitter:title" content="${meta.twitterTitle}" />
          <meta name="twitter:description" content="${meta.twitterDescription}" />
          <meta name="twitter:image" content="${meta.twitterImage}" />

          <!-- Canonical -->
          <link rel="canonical" href="${meta.canonical}" />
        </head>
        <body>
          <div id="app">${appHtml}</div>
        </body>
      </html>
    `
  }
}
