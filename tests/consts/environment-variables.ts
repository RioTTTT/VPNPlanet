/* eslint-disable prettier/prettier */
const isCI = process.env.CI === 'true' || process.env.CI === '1';
process.env.USE_LOCAL_BROWSER = process.env.USE_LOCAL_BROWSER || (isCI ? 'false' : 'true');
process.env.env = process.env.env || '';
process.env.FRONT_URL = process.env.FRONT_URL || `https://personal.freevpnplanet.com/ `; //process.env need to extends it to different test-environments 

export const config = {
  PROJECT_NAME: process.env.PROJECT_NAME || 'ui-test',
  USE_LOCAL_BROWSER: process.env.USE_LOCAL_BROWSER === 'true',
  env: process.env.env || '',
  FRONT_URL: process.env.FRONT_URL,
}
