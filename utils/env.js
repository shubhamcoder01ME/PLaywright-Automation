const dotenv = require('dotenv');
const path = require('path');

// Adjusted path to include the .env folder
const envFile = path.resolve(process.cwd(), `.env/.env.${process.env.NODE_ENV || 'qa'}`);
console.log('Loading env file:', envFile);

dotenv.config({ path: envFile });

module.exports = {
  BASE_URL: process.env.BASE_URL,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
};
