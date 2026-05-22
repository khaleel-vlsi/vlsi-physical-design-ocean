import React from 'react';

/**
 * StructuredData renders JSON‑LD script tags for SEO.
 * It includes Organization, Course, and FAQ schema as needed.
 * Props determine which schemas are emitted.
 */
const StructuredData = ({ organization, course, faq, breadcrumb }) => {
  const scripts = [];
  if (organization) {
    scripts.push(
      <script
        key="org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    );
  }
  if (course) {
    scripts.push(
      <script
        key="course"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(course) }}
      />
    );
  }
  if (faq) {
    scripts.push(
      <script
        key="faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    );
  }
  if (breadcrumb) {
    scripts.push(
      <script
        key="breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    );
  }
  return <>{scripts}</>;
};

export default StructuredData;
