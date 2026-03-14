import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noIndex?: boolean;
}

const SITE_NAME = "BGHE Education – Forbesganj, Bihar";
const BASE_URL = "https://bghe.in";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

const SEOHead = ({
  title,
  description = "BGHE Education – DRCC admission center in Forbesganj, Bihar. Get college admission with Student Credit Card loan up to ₹4 lakh. B.Tech, BCA, MBA, Nursing & more.",
  keywords = "DRCC admission Forbesganj, student credit card Bihar, BGHE Education, private university admission Bihar, college admission Forbesganj",
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  structuredData,
  noIndex = false,
}: SEOHeadProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;

// Common structured data builders
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "BGHE Education",
  alternateName: "Bharat Group of Higher Education",
  url: "https://bghe.in",
  logo: "https://bghe.in/favicon.png",
  description: "Trusted education guidance organization for DRCC student credit card admissions in Bihar.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near T.V. Tower, Block Road",
    addressLocality: "Forbesganj",
    addressRegion: "Bihar",
    addressCountry: "IN",
  },
  telephone: "7546935196",
  email: "bgheofficial@zohomail.in",
  areaServed: {
    "@type": "State",
    name: "Bihar",
  },
  sameAs: [],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "BGHE Education",
  image: "https://bghe.in/favicon.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near T.V. Tower, Block Road",
    addressLocality: "Forbesganj",
    addressRegion: "Bihar",
    addressCountry: "IN",
  },
  telephone: "7546935196",
  email: "bgheofficial@zohomail.in",
  url: "https://bghe.in",
  openingHours: "Mo-Sa 09:00-18:00",
  priceRange: "₹",
  geo: {
    "@type": "GeoCoordinates",
    latitude: "26.3066",
    longitude: "87.2669",
  },
};
