import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  imageUrl: string;
  url: string;
}

export default function ProductCard({ id, name, description, price, oldPrice, imageUrl, url }: ProductCardProps) {
  const handleOrderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <Card className="group overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {discount > 0 && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-xl px-3 py-1">
              -{discount}%
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>

        <div className="flex items-baseline space-x-2">
          <span className="font-heading font-bold text-2xl text-foreground">
            {price} ₽
          </span>
          {oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {oldPrice} ₽
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleOrderClick}
          className="w-full rounded-xl bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary transition-all"
        >
          Заказать
        </Button>
      </CardFooter>
    </Card>
  );
}
