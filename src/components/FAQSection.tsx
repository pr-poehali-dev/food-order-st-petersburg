import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from './FAQSchema';

const faqData = [
  {
    question: 'Как сделать заказ?',
    answer: 'Выберите понравившиеся блюда в каталоге, нажмите кнопку "Заказать" и вы будете перенаправлены на страницу оформления заказа. Укажите адрес доставки и способ оплаты.'
  },
  {
    question: 'Сколько стоит доставка?',
    answer: 'Доставка бесплатная при заказе от 1000 рублей. При заказе от 500 до 1000 рублей стоимость доставки составляет 150 рублей.'
  },
  {
    question: 'Как быстро привезут заказ?',
    answer: 'Среднее время доставки составляет 30-60 минут с момента подтверждения заказа. В часы пик доставка может занять до 90 минут.'
  },
  {
    question: 'Какие способы оплаты доступны?',
    answer: 'Вы можете оплатить заказ онлайн картой при оформлении, наличными или картой курьеру при получении.'
  },
  {
    question: 'Куда вы доставляете?',
    answer: 'Мы доставляем еду по всему Санкт-Петербургу и ближайшим пригородам в пределах КАД.'
  },
  {
    question: 'Можно ли вернуть заказ?',
    answer: 'Если вы получили некачественный или неполный заказ, свяжитесь с нами в течение 30 минут после получения. Мы заменим блюда или вернем деньги.'
  }
];

export default function FAQSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <FAQSchema items={faqData} />
      
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-8">
          Часто задаваемые вопросы
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-2xl px-6 bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
