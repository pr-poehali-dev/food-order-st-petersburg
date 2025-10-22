import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-600">
                <Icon name="UtensilsCrossed" size={24} className="text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-white">Еда на дом</span>
            </Link>
            <p className="text-secondary-foreground/80 text-sm">
              Доставка вкусной еды в Санкт-Петербурге
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Меню</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Акции
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Доставка
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  О нас
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/offer" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Публичная оферта
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Пользовательское соглашение
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link to="/personal-data" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Обработка персональных данных
                </Link>
              </li>
              <li>
                <Link to="/payment-rules" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                  Правила оплаты и возврата
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Контакты</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <Icon name="MapPin" size={16} />
                <span>Санкт-Петербург</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <Icon name="Phone" size={16} />
                <span>+7 (812) 123-45-67</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <Icon name="Mail" size={16} />
                <span>info@eda-nadom.ru</span>
              </li>
            </ul>
            <a 
              href="https://metrika.yandex.ru/stat/?id=104783055&amp;from=informer" 
              target="_blank" 
              rel="nofollow"
            >
              <img 
                src="https://informer.yandex.ru/informer/104783055/3_0_EFEFEFFF_EFEFEFFF_0_pageviews"
                style={{ width: '88px', height: '31px', border: 0 }}
                alt="Яндекс.Метрика"
                title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)"
                className="ym-advanced-informer" 
                data-cid="104783055" 
                data-lang="ru"
              />
            </a>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-8 pt-8 text-center text-sm text-secondary-foreground/60">© 2025 Еда на дом. Все права защищены.</div>
      </div>
    </footer>
  );
}