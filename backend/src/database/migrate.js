import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, testConnection } from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runMigrations = async () => {
  try {
    console.log('🔄 Starting database migrations...');
    
    // Test connection first
    const connected = await testConnection();
    if (!connected) {
      process.exit(1);
    }

    // Read and execute schema
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await query(statement);
          console.log('✅ Executed:', statement.substring(0, 50) + '...');
        } catch (error) {
          // Skip if table already exists
          if (error.message.includes('already exists')) {
            console.log('⚠️  Skipped (already exists):', statement.substring(0, 50) + '...');
          } else {
            throw error;
          }
        }
      }
    }

    console.log('✅ Database migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
};

// Run migrations if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations();
}

export default runMigrations;
