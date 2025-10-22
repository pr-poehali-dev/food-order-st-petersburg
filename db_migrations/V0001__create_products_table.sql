-- Создание таблицы для товаров из фида
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    external_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(500) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    old_price DECIMAL(10, 2),
    image_url TEXT,
    category VARCHAR(255),
    url TEXT NOT NULL,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_available ON products(available);
CREATE INDEX IF NOT EXISTS idx_products_external_id ON products(external_id);

-- Таблица для отслеживания последнего обновления фида
CREATE TABLE IF NOT EXISTS feed_updates (
    id SERIAL PRIMARY KEY,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    products_count INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'success'
);