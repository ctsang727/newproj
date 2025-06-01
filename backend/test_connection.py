import httpx
import asyncio

async def test_connection():
    test_urls = [
        "https://www.google.com",  # Basic internet test
        "https://pokeapi.co/api/v2/pokemon/1",
        "http://pokeapi.co/api/v2/pokemon/1"
    ]
    
    async with httpx.AsyncClient() as client:
        for url in test_urls:
            try:
                r = await client.get(url, timeout=10)
                print(f"✅ {url} - Status: {r.status_code}")
            except Exception as e:
                print(f"❌ {url} - Error: {str(e)}")

asyncio.run(test_connection())