import json
import os
from typing import Dict, Any
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Бизнес: Генерирует sitemap.xml со всеми товарами для SEO
    Args: event - dict с httpMethod
          context - объект с request_id
    Returns: HTTP ответ с XML sitemap
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    database_url = os.environ.get('DATABASE_URL', '')
    base_url = 'https://eda-nadom.ru'
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT id, updated_at FROM products WHERE available = true ORDER BY id")
    products = cur.fetchall()
    
    cur.close()
    conn.close()
    
    now = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S+00:00')
    
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        '  <url>',
        f'    <loc>{base_url}/</loc>',
        f'    <lastmod>{now}</lastmod>',
        '    <changefreq>daily</changefreq>',
        '    <priority>1.0</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{base_url}/catalog</loc>',
        f'    <lastmod>{now}</lastmod>',
        '    <changefreq>daily</changefreq>',
        '    <priority>0.9</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{base_url}/promotions</loc>',
        f'    <lastmod>{now}</lastmod>',
        '    <changefreq>weekly</changefreq>',
        '    <priority>0.8</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{base_url}/delivery</loc>',
        f'    <lastmod>{now}</lastmod>',
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.7</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{base_url}/contacts</loc>',
        f'    <lastmod>{now}</lastmod>',
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.7</priority>',
        '  </url>',
        '  <url>',
        f'    <loc>{base_url}/about</loc>',
        f'    <lastmod>{now}</lastmod>',
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.6</priority>',
        '  </url>'
    ]
    
    for product in products:
        product_id = product['id']
        updated = product['updated_at'].strftime('%Y-%m-%dT%H:%M:%S+00:00') if product['updated_at'] else now
        
        xml_lines.extend([
            '  <url>',
            f'    <loc>{base_url}/product/{product_id}</loc>',
            f'    <lastmod>{updated}</lastmod>',
            '    <changefreq>daily</changefreq>',
            '    <priority>0.8</priority>',
            '  </url>'
        ])
    
    xml_lines.append('</urlset>')
    
    sitemap_xml = '\n'.join(xml_lines)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600'
        },
        'body': sitemap_xml
    }
