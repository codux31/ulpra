
import { seedAllData, checkAdminCredentials } from '@/lib/supabase';

export const initializeDatabase = async () => {
  console.log('Checking and seeding database if needed...');
  try {
    // Check if admin credentials are working, if not log an informative message
    const demoCredentials = {
      email: 'admin@ulpra.com',
      password: 'Admin123!'
    };
    
    console.log('Verifying demo admin credentials...');
    const isValidCredentials = checkAdminCredentials(demoCredentials.email, demoCredentials.password);
    
    if (isValidCredentials) {
      console.log('Demo admin credentials are valid and ready to use:');
      console.log('Email: admin@ulpra.com');
      console.log('Password: Admin123!');
    } else {
      console.warn('Demo admin credentials configuration issue detected!');
      console.warn('Please make sure to use: admin@ulpra.com / Admin123!');
    }
    
    // Seed the entire database
    await seedAllData();
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};
