from flask import Flask, jsonify
import requests
from flask_cors import CORS
import time
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/api/pokemon/<int:id>', methods=['GET'])
def get_pokemon(id):
    max_retries = 3
    retry_delay = 1  # seconds
    
    for attempt in range(max_retries):
        try:
            response = requests.get(
                f'https://pokeapi.co/api/v2/pokemon/{id}',
                timeout=10,
                headers={
                    'User-Agent': 'MyPokemonApp/1.0',
                    'Accept': 'application/json'
                }
            )
            response.raise_for_status()
            
            data = response.json()
            return jsonify({
                'id': data['id'],
                'name': data['name'],
                'sprite': data['sprites']['front_default'],
                'types': [t['type']['name'] for t in data['types']]
            })
            
        except requests.exceptions.RequestException as e:
            logger.warning(f"Attempt {attempt + 1} failed: {str(e)}")
            if attempt < max_retries - 1:
                time.sleep(retry_delay * (attempt + 1))
                continue
            return jsonify({'error': 'Failed to fetch Pokémon data'}), 502

if __name__ == '__main__':
    app.run(port=8000, debug=True)