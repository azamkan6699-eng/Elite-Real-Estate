import React from "react";
import { Helmet } from "react-helmet-async";

export function PageShell({ children, pageContext }) {
  const meta = pageContext.pageMeta || {};

  return (
    <>
      <Helmet>
        {/* Title */}
        {meta.title && <title>{meta.title}</title>}

        {/* Favicon */}
        {meta.favicon && <link rel="icon" href={meta.favicon} />}

        {/* Basic Meta */}
        {meta.description && (
          <meta name="description" content={meta.description} />
        )}
        {meta.keywords && (
          <meta name="keywords" content={meta.keywords} />
        )}
        {meta.author && <meta name="author" content={meta.author} />}

        {/* Open Graph */}
        {meta.ogTitle && (
          <meta property="og:title" content={meta.ogTitle} />
        )}
        {meta.ogDescription && (
          <meta property="og:description" content={meta.ogDescription} />
        )}
        {meta.ogType && (
          <meta property="og:type" content={meta.ogType} />
        )}
        {meta.ogUrl && (
          <meta property="og:url" content={meta.ogUrl} />
        )}
        {meta.ogImage && (
          <meta property="og:image" content={meta.ogImage} />
        )}
        {meta.ogImageWidth && (
          <meta property="og:image:width" content={meta.ogImageWidth} />
        )}
        {meta.ogImageHeight && (
          <meta property="og:image:height" content={meta.ogImageHeight} />
        )}

        {/* Twitter */}
        {meta.twitterCard && (
          <meta name="twitter:card" content={meta.twitterCard} />
        )}
        {meta.twitterTitle && (
          <meta name="twitter:title" content={meta.twitterTitle} />
        )}
        {meta.twitterDescription && (
          <meta
            name="twitter:description"
            content={meta.twitterDescription}
          />
        )}
        {meta.twitterImage && (
          <meta name="twitter:image" content={meta.twitterImage} />
        )}

        {/* Canonical */}
        {meta.canonical && (
          <link rel="canonical" href={meta.canonical} />
        )}
      </Helmet>

      {/* Actual Page Content */}
      {children}
    </>
  );
}
