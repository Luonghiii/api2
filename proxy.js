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

  // Get query parameters
  const { action, province_name, district_name, old_ward_name, new_ward_name, old_district_name, old_province_name, new_province_name } = req.query;

  if (!action) {
    return res.status(400).json({ error: 'Missing action parameter' });
  }

  try {
    // Build API URL
    let apiUrl = `https://34tinhthanh.com/address-api.php?action=${action}`;
    
    if (province_name) apiUrl += `&province_name=${encodeURIComponent(province_name)}`;
    if (district_name) apiUrl += `&district_name=${encodeURIComponent(district_name)}`;
    if (old_ward_name) apiUrl += `&old_ward_name=${encodeURIComponent(old_ward_name)}`;
    if (old_district_name) apiUrl += `&old_district_name=${encodeURIComponent(old_district_name)}`;
    if (old_province_name) apiUrl += `&old_province_name=${encodeURIComponent(old_province_name)}`;
    if (new_ward_name) apiUrl += `&new_ward_name=${encodeURIComponent(new_ward_name)}`;
    if (new_province_name) apiUrl += `&new_province_name=${encodeURIComponent(new_province_name)}`;

    // Fetch from actual API
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Return data
    return res.status(200).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch data',
      message: error.message 
    });
  }
}
