import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export default function SEO({
  title = 'TCEvaluator - Modern Transfer Credit Evaluation Software',
  description = 'Streamline your transfer credit evaluation process with TCEvaluator. Fast, accurate, and efficient transfer credit management for higher education institutions.',
  keywords = 'transfer credit evaluation, higher education software, credit transfer, academic evaluation, transcript evaluation',
  ogImage = '/tcevaluator_dashboard.webp',
  canonical
}: SEOProps) {
  const siteUrl = 'https://tcevaluator.com';
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={fullUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {canonical && <link rel="canonical" href={fullUrl} />}

      <link rel="icon" type="image/png" href="/tce_favicon.png" />
    </Helmet>
  );
}
