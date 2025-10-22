import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ReviewsSchema from './ReviewsSchema';

const reviewsData = [
  {
    author: 'Анна Смирнова',
    rating: 5,
    text: 'Заказываем регулярно! Всегда свежие продукты, быстрая доставка. Курьеры вежливые, все упаковано аккуратно. Особенно нравятся роллы и супы.',
    date: '2024-10-15'
  },
  {
    author: 'Дмитрий Петров',
    rating: 5,
    text: 'Отличный сервис доставки! Заказ привезли даже раньше обещанного времени. Качество блюд на высоте, порции большие. Рекомендую!',
    date: '2024-10-18'
  },
  {
    author: 'Елена Волкова',
    rating: 4,
    text: 'Хороший выбор блюд, адекватные цены. Один раз была задержка с доставкой, но предупредили заранее. В остальном все отлично!',
    date: '2024-10-20'
  },
  {
    author: 'Максим Кузнецов',
    rating: 5,
    text: 'Пользуюсь уже полгода. Удобное приложение, быстрая доставка, вкусная еда. Особенно радуют акции и скидки для постоянных клиентов.',
    date: '2024-10-21'
  }
];

export default function ReviewsSection() {
  const avgRating = reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length;

  return (
    <section className="bg-gradient-to-br from-accent/30 to-white py-16">
      <ReviewsSchema reviews={reviewsData} />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Отзывы наших клиентов
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={24}
                  className={i < Math.floor(avgRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-lg font-semibold">{avgRating.toFixed(1)} из 5</span>
            <span className="text-muted-foreground">({reviewsData.length} отзывов)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviewsData.map((review, index) => (
            <Card key={index} className="rounded-2xl border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-lg">{review.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString('ru-RU', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
