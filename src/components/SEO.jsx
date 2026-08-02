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
const SEO = ({ title, description, url, isArticle, keywords, structuredData, noindex, image }) => {
  const defaultTitle = 'VLSI Physical Design Ocean – PnR, STA, Synthesis & ASIC Video Modules';
  const defaultDescription = 'Master VLSI Physical Design (PnR, STA, Synthesis, CTS, Floorplanning) with 59+ comprehensive modules, complete PnR execution video playlists, industrial tool guides, and interview prep.';
  const domain = 'https://vlsiphysicaldesignocean.com';
  const defaultImage = `${domain}/favicon.svg`;

  const defaultKeywords = [
    "vlsi physical design", "pnr video modules", "place and route tutorial", "pnr workshop",
    "asic design flow", "static timing analysis", "sta tutorial", "logic synthesis",
    "innovus tutorial", "icc2 tutorial", "primetime tutorial", "cts clock tree synthesis",
    "floorplanning in vlsi", "routing in vlsi", "drc lvs physical verification", "vlsi video courses"
  ];

  const seoTitle = title ? `${title} | VLSI Physical Design Ocean` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image ? (image.startsWith('http') ? image : `${domain}${image}`) : defaultImage;
  
  // Normalize URL: remove trailing slash if present (except for root)
  const normalizedPath = url && url !== '/' ? url.replace(/\/$/, '') : (url === '/' ? '' : url);
  const canonicalUrl = normalizedPath ? `${domain}${normalizedPath}` : domain;
  const combinedKeywords = keywords ? [...keywords, ...defaultKeywords] : defaultKeywords;
  const metaKeywords = combinedKeywords.join(', ');

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="theme-color" content="#090d16" />
        {noindex && <meta name="robots" content="noindex, nofollow" />}

        {/* Open Graph */}
        <meta property="og:site_name" content="VLSI Physical Design Ocean" />
        <meta property="og:type" content={isArticle ? 'article' : 'website'} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={seoTitle} />
        <meta property="twitter:description" content={seoDescription} />
        <meta property="twitter:image" content={seoImage} />
      </Helmet>
      {structuredData}
    </>
  );
};

export default SEO;
