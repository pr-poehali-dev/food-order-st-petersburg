# Настройка автоматического обновления фида

## Функция обновления фида
URL: `https://functions.poehali.dev/4237fdcb-0cff-43ff-86ae-f1fb456ee244`

## Как настроить ежедневное обновление

### Вариант 1: Использовать внешний cron-сервис (рекомендуется)

1. **cron-job.org** (бесплатно):
   - Зарегистрируйтесь на https://cron-job.org
   - Создайте новый Cronjob
   - URL: `https://functions.poehali.dev/4237fdcb-0cff-43ff-86ae-f1fb456ee244`
   - Method: POST
   - Schedule: `0 3 * * *` (каждый день в 3:00 UTC)
   - Сохраните

2. **EasyCron** (бесплатно до 20 задач):
   - Зарегистрируйтесь на https://www.easycron.com
   - Создайте новый Cron Job
   - URL: `https://functions.poehali.dev/4237fdcb-0cff-43ff-86ae-f1fb456ee244`
   - Cron Expression: `0 3 * * *`
   - HTTP Method: POST
   - Сохраните

3. **UptimeRobot** (бесплатно):
   - Зарегистрируйтесь на https://uptimerobot.com
   - Создайте HTTP(s) монитор
   - URL: `https://functions.poehali.dev/4237fdcb-0cff-43ff-86ae-f1fb456ee244`
   - Monitoring Interval: каждые 24 часа
   - Method: POST

### Вариант 2: GitHub Actions (если используете GitHub)

Создайте файл `.github/workflows/update-feed.yml`:

```yaml
name: Update Product Feed

on:
  schedule:
    - cron: '0 3 * * *'  # Каждый день в 3:00 UTC
  workflow_dispatch:  # Можно запустить вручную

jobs:
  update-feed:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger feed update
        run: |
          curl -X POST https://functions.poehali.dev/4237fdcb-0cff-43ff-86ae-f1fb456ee244
```

### Вариант 3: Запуск вручную

Выполните команду:
```bash
curl -X POST https://functions.poehali.dev/4237fdcb-0cff-43ff-86ae-f1fb456ee244
```

## Что происходит при обновлении

1. Загружается XML фид от Admitad
2. Парсятся все товары (название, цена, описание, изображения)
3. Товары сохраняются/обновляются в базе данных
4. Автоматически обновляется sitemap.xml для поисковых систем

## Проверка работы

Чтобы убедиться, что обновление работает:
1. Откройте https://functions.poehali.dev/4237fdcb-0cff-43ff-86ae-f1fb456ee244 (запустит обновление)
2. Проверьте ответ - должно быть `{"success": true, "products_count": 83, ...}`
3. Откройте каталог на сайте - товары должны обновиться

## Sitemap для SEO

Sitemap автоматически генерируется и доступен по адресу:
- `https://functions.poehali.dev/6606b5f5-2b30-4f96-80bb-af7561d589bd`
- Или через редирект: `https://eda-nadom.ru/sitemap.xml`

Добавьте sitemap в Яндекс.Вебмастер и Google Search Console для лучшей индексации.
