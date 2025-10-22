import json
import os
from typing import Dict, Any, List
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Бизнес: Получает список товаров из БД с фильтрацией
    Args: event - dict с queryStringParameters (category, search, limit, offset)
    Returns: HTTP ответ со списком товаров
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
    category = params.get('category', '')
    search = params.get('search', '')
    limit = int(params.get('limit', '50'))
    offset = int(params.get('offset', '0'))
    
    database_url = os.environ.get('DATABASE_URL', '')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    query = "SELECT * FROM products WHERE available = true"
    query_params: List[Any] = []
    
    if category:
        query += " AND category = %s"
        query_params.append(category)
    
    if search:
        query += " AND (name ILIKE %s OR description ILIKE %s)"
        search_pattern = f'%{search}%'
        query_params.extend([search_pattern, search_pattern])
    
    query += " ORDER BY created_at DESC LIMIT %s OFFSET %s"
    query_params.extend([limit, offset])
    
    cur.execute(query, query_params)
    products = cur.fetchall()
    
    cur.execute("SELECT COUNT(*) as total FROM products WHERE available = true")
    total = cur.fetchone()['total']
    
    cur.close()
    conn.close()
    
    products_list = []
    for p in products:
        products_list.append({
            'id': p['id'],
            'external_id': p['external_id'],
            'name': p['name'],
            'description': p['description'],
            'price': float(p['price']) if p['price'] else 0,
            'old_price': float(p['old_price']) if p['old_price'] else None,
            'image_url': p['image_url'],
            'category': p['category'],
            'url': p['url']
        })
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'products': products_list,
            'total': total,
            'limit': limit,
            'offset': offset
        })
    }
