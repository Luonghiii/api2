// Vercel Serverless Function - Test Proxy (không call PHP)

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
  const { action } = req.query;

  console.log('Received action:', action);
  console.log('All params:', req.query);

  // Trả về data tĩnh để test
  if (!action || action === '') {
    return res.status(400).json({ 
      error: 'Tham số không hợp lệ',
      message: 'Action parameter is required'
    });
  }

  if (action === 'districts') {
    return res.status(200).json([
      { "name": "Huyện Cờ Đỏ" },
      { "name": "Huyện Phong Điền" },
      { "name": "Huyện Thới Lai" },
      { "name": "Quận Ninh Kiều" }
    ]);
  }

  if (action === 'wards') {
    return res.status(200).json([
      { "name": "Xã Trung An" },
      { "name": "Xã Đông Hiệp" },
      { "name": "Xã Đông Thắng" }
    ]);
  }

  if (action === 'convert') {
    return res.status(200).json({
      "old_ward_name": "Xã Trung An",
      "old_district_name": "Huyện Cờ Đỏ",
      "old_province_name": "Thành phố Cần Thơ",
      "new_ward_name": "Phường Trung Nhứt",
      "new_province_name": "Thành phố Cần Thơ"
    });
  }

  if (action === 'new_wards') {
    return res.status(200).json([
      { "name": "Phường Cửa Lò" },
      { "name": "Phường Hoàng Mai" },
      { "name": "Phường Tây Hiếu" }
    ]);
  }

  if (action === 'convert-reverse') {
    return res.status(200).json([
      {
        "old_ward_name": "Xã Nghĩa Tiến",
        "old_district_name": "Thị xã Thái Hoà",
        "old_province_name": "Tỉnh Nghệ An"
      },
      {
        "old_ward_name": "Phường Quang Tiến",
        "old_district_name": "Thị xã Thái Hoà",
        "old_province_name": "Tỉnh Nghệ An"
      }
    ]);
  }

  // Action không hợp lệ
  return res.status(400).json({
    error: 'Invalid action',
    message: `Action '${action}' is not supported`
  });
}
