// Vercel Serverless Function - CORS Proxy for 34tinhthanh.com API

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Build API URL with all query params
    const params = new URLSearchParams(req.query).toString();
    const apiUrl = `https://34tinhthanh.com/address-api.php?${params}`;

    console.log('Proxying to:', apiUrl);

    // Fetch from actual API
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });

    // Get response data
    const data = await response.json();
    
    console.log('Response status:', response.status);
    
    // Return data with same status code
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch data',
      message: error.message 
    });
  }
}
