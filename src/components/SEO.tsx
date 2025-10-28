import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  schema?: object;
}

export default function SEO({
  title = 'TCEvaluator - AI-Powered Transfer Credit Evaluation Software',
  description = 'Transform your transfer credit evaluation process with TCEvaluator\'s AI-powered platform. Automate credit transfer analysis, streamline transcript evaluation, and save hours of manual work. Trusted by leading higher education institutions.',
  keywords = 'AI credit transfer analysis, AI credit transfer evaluation, transfer credit evaluation software, automated transcript evaluation, credit transfer analysis tool, AI transcript evaluation, transfer credit management, higher education software, academic credit evaluation, AI-powered credit transfer',
  ogImage = '/tcevaluator_dashboard.webp',
  canonical,
  schema
}: SEOProps) {
  const siteUrl = 'https://tcevaluator.com';
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta name="author" content="TCEvaluator" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TCEvaluator" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:site" content="@TCEvaluator" />

      <link rel="canonical" href={fullUrl} />
      <link rel="icon" type="image/png" href="/tce_favicon.png" />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
