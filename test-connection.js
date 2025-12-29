const mongoose = require('mongoose');
const fetch = require('node-fetch');

async function testConnection() {
  console.log('🧪 Testing Backend Connection...\n');

  // Test 1: MongoDB Connection
  console.log('1️⃣ Testing MongoDB Connection...');
  try {
    await mongoose.connect('mongodb://localhost:27017/admin-dashboard');
    console.log('✅ MongoDB connected successfully');
    
    // Test if we can create a collection
    const testCollection = mongoose.connection.collection('test');
    await testCollection.insertOne({ test: 'data', timestamp: new Date() });
    console.log('✅ Database write test successful');
    
    // Clean up test data
    await testCollection.deleteOne({ test: 'data' });
    console.log('✅ Database cleanup successful');
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('💡 Make sure MongoDB is running on your system');
    return;
  }

  // Test 2: Backend Server
  console.log('\n2️⃣ Testing Backend Server...');
  try {
    const response = await fetch('http://localhost:5000/api/health');
    const data = await response.json();
    console.log('✅ Backend server is running');
    console.log('📊 Health check response:', data);
  } catch (error) {
    console.error('❌ Backend server not responding:', error.message);
    console.log('💡 Make sure the backend server is running (npm run dev)');
    return;
  }

  // Test 3: Signup Endpoint
  console.log('\n3️⃣ Testing Signup Endpoint...');
  try {
    const testUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });

    const data = await response.json();
    console.log('📊 Signup response status:', response.status);
    console.log('📊 Signup response:', data);

    if (response.ok) {
      console.log('✅ Signup endpoint working correctly');
    } else {
      console.log('⚠️ Signup endpoint returned error (might be expected if user exists)');
    }
  } catch (error) {
    console.error('❌ Signup endpoint test failed:', error.message);
  }

  console.log('\n🎉 Connection tests completed!');
}

testConnection().catch(console.error);
