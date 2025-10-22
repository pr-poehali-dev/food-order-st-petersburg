import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaOrg from '@/components/SchemaOrg';
import BreadcrumbsSchema from '@/components/BreadcrumbsSchema';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
  id: number;
  external_id: string;
  name: string;
  description: string;
  price: number;
  old_price: number | null;
  image_url: string;
  category: string;
  url: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    fetch(`https://functions.poehali.dev/91e85aef-6fcb-4eab-8d59-fe06cd9871e1?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          setProduct(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading product:', err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const handleOrderClick = () => {
    if (product) {
      window.open(product.url, '_blank', 'noopener,noreferrer');
    }
  };

  const discount = product?.old_price 
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-16 w-1/2" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <Icon name="AlertCircle" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h1 className="font-heading font-bold text-3xl mb-4">Товар не найден</h1>
          <Link to="/catalog">
            <Button className="rounded-xl">Вернуться в каталог</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SchemaOrg 
        type="product" 
        product={{
          name: product.name,
          description: product.description,
          image: product.image_url || '/placeholder.svg',
          price: product.price,
          oldPrice: product.old_price,
          url: product.url
        }}
      />
      <BreadcrumbsSchema 
        items={[
          { name: 'Главная', url: '/' },
          { name: 'Каталог', url: '/catalog' },
          { name: product.name, url: `/product/${product.id}` }
        ]}
      />
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Link to="/catalog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад в каталог
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative">
            <img
              src={product.image_url || '/placeholder.svg'}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-2xl shadow-lg"
            />
            {discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-xl px-4 py-2 text-lg">
                -{discount}%
              </Badge>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3 rounded-xl">
                {product.category}
              </Badge>
              <h1 className="font-heading font-bold text-4xl mb-4">{product.name}</h1>
              <p className="text-lg text-foreground/80 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline space-x-3">
                <span className="font-heading font-bold text-5xl text-foreground">
                  {product.price} ₽
                </span>
                {product.old_price && (
                  <span className="text-2xl text-muted-foreground line-through">
                    {product.old_price} ₽
                  </span>
                )}
              </div>

              <Button
                onClick={handleOrderClick}
                size="lg"
                className="w-full md:w-auto rounded-xl bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary transition-all px-12"
              >
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Заказать
              </Button>
            </div>

            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Icon name="Clock" size={20} />
                <span>Доставка за 30-60 минут</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Icon name="ShieldCheck" size={20} />
                <span>Гарантия качества</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Icon name="MapPin" size={20} />
                <span>Доставка по Санкт-Петербургу</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}