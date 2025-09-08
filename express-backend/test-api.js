// Simple API test script
const API_BASE_URL = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testing Express Backend API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);
    console.log('');

    // Test WiFi list endpoint
    console.log('2. Testing WiFi list endpoint...');
    const wifiResponse = await fetch(`${API_BASE_URL}/simulation/wifi-list`);
    const wifiData = await wifiResponse.json();
    console.log('✅ WiFi networks found:', wifiData.networks.length);
    console.log('');

    // Test device info endpoint
    console.log('3. Testing device info endpoint...');
    const deviceResponse = await fetch(`${API_BASE_URL}/system/device-info`);
    const deviceData = await deviceResponse.json();
    console.log('✅ Device info:', deviceData.mac_address);
    console.log('');

    // Test password strength endpoint
    console.log('4. Testing password strength endpoint...');
    const passwordResponse = await fetch(`${API_BASE_URL}/passwords/strength`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'TestPassword123!' })
    });
    const passwordData = await passwordResponse.json();
    console.log('✅ Password strength:', passwordData.label);
    console.log('');

    // Test news endpoint
    console.log('5. Testing news endpoint...');
    const newsResponse = await fetch(`${API_BASE_URL}/news/feed?q=cybersecurity`);
    const newsData = await newsResponse.json();
    console.log('✅ News articles found:', newsData.articles.length);
    console.log('');

    // Test data export endpoints
    console.log('6. Testing data export endpoints...');
    const csvResponse = await fetch(`${API_BASE_URL}/data/csv`);
    const csvData = await csvResponse.json();
    console.log('✅ CSV export:', csvData.filename);

    const jsonResponse = await fetch(`${API_BASE_URL}/data/json`);
    const jsonData = await jsonResponse.json();
    console.log('✅ JSON export: data structure available');
    console.log('');

    console.log('🎉 All API tests passed! The Express backend is working correctly.');
    console.log('📝 You can now start the frontend and test the full application.');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('💡 Make sure the Express backend is running on port 3001');
    console.log('   Run: cd express-backend && npm run dev');
  }
}

// Run the test
testAPI();
