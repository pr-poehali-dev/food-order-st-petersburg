import { Helmet } from 'react-helmet';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewsSchemaProps {
  reviews: Review[];
}

export default function ReviewsSchema({ reviews }: ReviewsSchemaProps) {
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Еда на дом',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1'
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      datePublished: review.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: review.text
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
