
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductPage from "./pages/ProductPage";
import StaticPage from "./pages/StaticPage";
import SitemapRedirect from "./pages/SitemapRedirect";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/promotions" element={<StaticPage title="Акции" content={<p>Следите за нашими специальными предложениями и акциями!</p>} />} />
          <Route path="/delivery" element={<StaticPage title="Доставка" content={<><p>Мы доставляем еду по всему Санкт-Петербургу за 30-60 минут.</p><p>Минимальная сумма заказа - 500 рублей. Доставка бесплатная при заказе от 1000 рублей.</p></>} />} />
          <Route path="/contacts" element={<StaticPage title="Контакты" content={<><p>Телефон: +7 (812) 123-45-67</p><p>Email: info@eda-nadom.ru</p><p>Адрес: Санкт-Петербург</p></>} />} />
          <Route path="/about" element={<StaticPage title="О нас" content={<p>Мы - команда профессионалов, которая любит готовить и доставлять вкусную еду жителям Санкт-Петербурга.</p>} />} />
          <Route path="/offer" element={<StaticPage title="Публичная оферта" content={<p>Условия использования сервиса доставки еды.</p>} />} />
          <Route path="/terms" element={<StaticPage title="Пользовательское соглашение" content={<p>Правила пользования сайтом.</p>} />} />
          <Route path="/privacy" element={<StaticPage title="Политика конфиденциальности" content={<p>Мы уважаем вашу конфиденциальность и защищаем ваши данные.</p>} />} />
          <Route path="/personal-data" element={<StaticPage title="Политика обработки персональных данных" content={<p>Информация о том, как мы обрабатываем ваши персональные данные.</p>} />} />
          <Route path="/payment-rules" element={<StaticPage title="Правила оплаты и возврата" content={<p>Условия оплаты и возврата товаров.</p>} />} />
          <Route path="/sitemap.xml" element={<SitemapRedirect />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;