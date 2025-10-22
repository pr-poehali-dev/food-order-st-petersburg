import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Бизнес: Получает данные одного товара по ID
    Args: event - dict с queryStringParameters (id)
    Returns: HTTP ответ с данными товара
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
    
    params = event.get('queryStringParameters', {}) or {}
    product_id = params.get('id', '')
    
    if not product_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Product ID is required'})
        }
    
    database_url = os.environ.get('DATABASE_URL', '')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT * FROM products WHERE id = %s AND available = true", (product_id,))
    product = cur.fetchone()
    
    cur.close()
    conn.close()
    
    if not product:
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Product not found'})
        }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'id': product['id'],
            'external_id': product['external_id'],
            'name': product['name'],
            'description': product['description'],
            'price': float(product['price']) if product['price'] else 0,
            'old_price': float(product['old_price']) if product['old_price'] else None,
            'image_url': product['image_url'],
            'category': product['category'],
            'url': product['url']
        })
    }
