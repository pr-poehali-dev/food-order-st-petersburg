import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SchemaOrg from '@/components/SchemaOrg';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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

export default function Home() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://functions.poehali.dev/4fcc1708-1d4a-49d6-bebc-0468a45af101?limit=8')
      .then(res => res.json())
      .then(data => {
        setPopularProducts(data.products || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SchemaOrg type="website" />
      <SchemaOrg type="organization" />
      <Header />

      <section className="relative bg-gradient-to-br from-accent via-orange-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmNmIzNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-heading font-bold text-5xl md:text-6xl leading-tight">
                Вкусная еда <br />
                <span className="text-primary">прямо к вам</span>
              </h1>
              <p className="text-lg text-foreground/80">
                Доставка любимых блюд в Санкт-Петербурге. Быстро, свежо и с любовью.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/catalog">
                  <Button size="lg" className="rounded-xl bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary transition-all">
                    Смотреть меню
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/promotions">
                  <Button size="lg" variant="outline" className="rounded-xl">
                    Акции
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/dff7b718-fb8d-4438-8167-82bef2cb6b22/files/9c0951b4-8842-4e9b-9a67-4e7aa36b8240.jpg"
                alt="Вкусная еда"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center mb-4">
              <Icon name="Clock" size={32} className="text-white" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">Быстрая доставка</h3>
            <p className="text-muted-foreground">Привезем за 30-60 минут</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center mb-4">
              <Icon name="ShieldCheck" size={32} className="text-white" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">Качество</h3>
            <p className="text-muted-foreground">Только свежие продукты</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center mb-4">
              <Icon name="Star" size={32} className="text-white" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">Выбор</h3>
            <p className="text-muted-foreground">Большое разнообразие блюд</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-3xl md:text-4xl">Популярные блюда</h2>
          <Link to="/catalog">
            <Button variant="ghost" className="rounded-xl">
              Все блюда
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-96 bg-muted rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                oldPrice={product.old_price}
                imageUrl={product.image_url}
                url={product.url}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}