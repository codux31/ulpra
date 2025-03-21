
import { seedAllData } from '@/lib/supabase';

export const initializeDatabase = async () => {
  console.log('Checking and seeding database if needed...');
  try {
    await seedAllData();
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};
