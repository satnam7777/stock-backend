const fs = require('fs');
const path = require('path');

const envContent = `# Server Configuration
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/admin-dashboard

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=development
`;

const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('📁 Location:', envPath);
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('📝 Please create a .env file manually with the following content:');
  console.log(envContent);
}
