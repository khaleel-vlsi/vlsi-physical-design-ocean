import React from 'react';
import { Helmet } from 'react-helmet-async';
import StructuredData from './StructuredData';

/**
 * SEO component renders meta tags and optionally structured data.
 * Props:
 *   - title: page title fragment
 *   - description: meta description
 *   - url: path for canonical URL
 *   - isArticle: boolean for og:type
 *   - keywords: array of keyword strings
 *   - structuredData: React element (e.g., <StructuredData .../>)
 */
const SEO = ({ title, description, url, isArticle, keywords, structuredData }) => {
  const defaultTitle = 'VLSI Physical Design Ocean – Professional Guide';
  const defaultDescription = 'VLSI Physical Design Ocean – A structured learning platform for ASIC & VLSI design from basics to advanced physical design.';
  const domain = 'https://vlsiphysicaldesignocean.com';

  const seoTitle = title ? `${title} | VLSI Physical Design Ocean` : defaultTitle;
  const seoDescription = description || defaultDescription;
  
  // Normalize URL: remove trailing slash if present (except for root)
  const normalizedPath = url && url !== '/' ? url.replace(/\/$/, '') : (url === '/' ? '' : url);
  const canonicalUrl = normalizedPath ? `${domain}${normalizedPath}` : domain;
  const metaKeywords = keywords ? keywords.join(', ') : '';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content={isArticle ? 'article' : 'website'} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={seoTitle} />
        <meta property="twitter:description" content={seoDescription} />
      </Helmet>
      {structuredData}
    </>
  );
};

export default SEO;
