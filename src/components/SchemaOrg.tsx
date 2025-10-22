import { Helmet } from 'react-helmet';

interface OrganizationSchemaProps {
  type: 'organization';
}

interface ProductSchemaProps {
  type: 'product';
  product: {
    name: string;
    description: string;
    image: string;
    price: number;
    oldPrice?: number | null;
    url: string;
  };
}

interface WebsiteSchemaProps {
  type: 'website';
}

type SchemaOrgProps = OrganizationSchemaProps | ProductSchemaProps | WebsiteSchemaProps;

export default function SchemaOrg(props: SchemaOrgProps) {
  let schemaData: any = {};

  if (props.type === 'organization') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Еда на дом',
      url: 'https://eda-nadom.ru',
      logo: 'https://eda-nadom.ru/favicon.svg',
      description: 'Доставка вкусной еды в Санкт-Петербурге',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Санкт-Петербург',
        addressRegion: 'Санкт-Петербург',
        addressCountry: 'RU'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '59.9343',
        longitude: '30.3351'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+7-812-123-45-67',
        contactType: 'customer service',
        areaServed: 'RU',
        availableLanguage: 'Russian'
      },
      sameAs: []
    };
  } else if (props.type === 'product') {
    const { product } = props;
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image,
      offers: {
        '@type': 'Offer',
        url: product.url,
        priceCurrency: 'RUB',
        price: product.price,
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Еда на дом'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.5',
        reviewCount: '120'
      }
    };
  } else if (props.type === 'website') {
    schemaData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Еда на дом',
      url: 'https://eda-nadom.ru',
      description: 'Доставка вкусной еды в Санкт-Петербурге',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://eda-nadom.ru/catalog?search={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}
