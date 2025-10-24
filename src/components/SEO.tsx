import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export default function SEO({
  title = 'AI Transfer Credit Evaluation Software | TCEvaluator',
  description = 'TCEvaluator uses AI to automate transfer credit evaluations—cut review time, increase accuracy, and scale decisions for colleges and universities.',
  canonical = 'https://tcevaluator.com/',
  ogImage = 'https://tcevaluator.com/tcevaluator_dashboard.webp'
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
