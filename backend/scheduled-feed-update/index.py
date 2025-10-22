import json
import os
import urllib.request
import xml.etree.ElementTree as ET
from typing import Dict, Any, List
import psycopg2
from psycopg2.extras import execute_batch

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Бизнес: Автоматическое ежедневное обновление товаров из XML фида
    Args: event - dict с httpMethod или trigger
          context - объект с request_id
    Returns: HTTP ответ с результатом обновления
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    feed_url = 'http://export.admitad.com/ru/webmaster/websites/2521782/products/export_adv_products/?user=OlegTishin&code=87b774593f&feed_id=23393&format=xml'
    
    try:
        with urllib.request.urlopen(feed_url, timeout=30) as response:
            xml_data = response.read()
        
        root = ET.fromstring(xml_data)
        products: List[tuple] = []
        
        for offer in root.findall('.//offer'):
            external_id = offer.get('id', '')
            if not external_id:
                continue
            
            name = offer.findtext('name', '').strip()
            price_text = offer.findtext('price', '0')
            price = float(price_text) if price_text else 0.0
            old_price_text = offer.findtext('oldprice', '')
            old_price = float(old_price_text) if old_price_text else None
            
            description = offer.findtext('description', '').strip()
            image_url = offer.findtext('picture', '')
            category = offer.findtext('categoryId', 'Разное')
            url = offer.findtext('url', '')
            available = offer.get('available', 'true') == 'true'
            
            products.append((
                external_id, name, description, price, old_price,
                image_url, category, url, available
            ))
        
        database_url = os.environ.get('DATABASE_URL', '')
        
        conn = psycopg2.connect(database_url)
        conn.autocommit = False
        cur = conn.cursor()
        
        insert_query = '''
            INSERT INTO products (external_id, name, description, price, old_price, image_url, category, url, available, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP)
            ON CONFLICT (external_id) 
            DO UPDATE SET 
                name = EXCLUDED.name,
                description = EXCLUDED.description,
                price = EXCLUDED.price,
                old_price = EXCLUDED.old_price,
                image_url = EXCLUDED.image_url,
                category = EXCLUDED.category,
                url = EXCLUDED.url,
                available = EXCLUDED.available,
                updated_at = CURRENT_TIMESTAMP
        '''
        
        execute_batch(cur, insert_query, products, page_size=100)
        
        cur.execute(
            "INSERT INTO feed_updates (last_update, products_count, status) VALUES (CURRENT_TIMESTAMP, %s, 'success')",
            (len(products),)
        )
        
        conn.commit()
        
        sitemap_url = os.environ.get('SITEMAP_FUNCTION_URL', '')
        if sitemap_url:
            try:
                urllib.request.urlopen(sitemap_url, timeout=10)
            except Exception:
                pass
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'products_count': len(products),
                'message': f'Обновлено {len(products)} товаров, sitemap обновлен'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': False,
                'error': str(e)
            })
        }
