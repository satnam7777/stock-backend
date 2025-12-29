const mongoose = require('mongoose');

async function testMongoDB() {
  console.log('🧪 Testing MongoDB Connection...\n');

  try {
    // Connect to MongoDB
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
    console.log('✅ MongoDB disconnected successfully');
    
    console.log('\n🎉 MongoDB test completed successfully!');
    console.log('💡 Your MongoDB is working correctly.');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Make sure MongoDB is installed and running');
    console.log('2. On Windows, check if MongoDB service is running');
    console.log('3. Try starting MongoDB manually');
    console.log('4. Check if port 27017 is available');
  }
}

testMongoDB();
