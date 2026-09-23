// backend/src/seedAdmin.js
import dns from 'node:dns';
// Force Node.js to use Google DNS so local ISP cannot block MongoDB SRV lookups
dns.setServers(['8.8.8.8', '8.8.4.4']);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Business from './models/Business.js';

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://begaindia559_db_user:Begaindia%40123@cluster0.gyla7wc.mongodb.net/begaindia?retryWrites=true&w=majority&appName=Cluster0';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    const adminEmail = 'admin@begaindia.org';
    const plainPassword = 'BegaAdmin@2026';

    // Hash the password once
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // Upsert admin user bypassing the Mongoose pre-save double-hash hook
    await User.findOneAndUpdate(
      { email: adminEmail },
      {
        $set: {
          name: 'BEGA Master Admin',
          email: adminEmail,
          mobile: '+917387877820',
          password: hashedPassword,
          role: 'admin',
          applicationNumber: 'BEGA-ADMIN-2026',
          district: 'Chhatrapati Sambhajinagar',
          taluka: 'Aurangabad',
          isVerified: true,
          isBlocked: false,
          membership: {
            plan: 'BEGA Central Core Committee',
            status: 'Active',
          },
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('\n========================================');
    console.log('Master Admin Account Ready:');
    console.log(`Email:    ${adminEmail}`);
    console.log(`Password: ${plainPassword}`);
    console.log('========================================\n');

    // Seed Initial Directory Entries
    const adminUser = await User.findOne({ email: adminEmail });
    const sampleBusinesses = [
      {
        companyName: 'SW Multimedia Group',
        category: 'Digital & IT Solutions',
        district: 'Chhatrapati Sambhajinagar',
        taluka: 'Aurangabad',
        description: 'Enterprise IT architecture, software engineering, and digital growth marketing.',
        mobile: '+919876543210',
        email: 'contact@swmultimedia.com',
        status: 'Approved',
        isFeatured: true,
      },
      {
        companyName: 'Patil Precision Forgings Pvt Ltd',
        category: 'Manufacturing & Industrial',
        district: 'Chhatrapati Sambhajinagar',
        taluka: 'Waluj MIDC',
        description: 'High-tensile automotive forged components and CNC precision machining.',
        mobile: '+919822012345',
        email: 'info@patilforgings.in',
        status: 'Approved',
        isFeatured: true,
      },
      {
        companyName: 'Sahyadri Organic Agro Foods',
        category: 'Agro & Food Processing',
        district: 'Nashik',
        taluka: 'Niphad',
        description: 'Certified organic spices, cold-pressed oils, and export agro packaging.',
        mobile: '+919423098765',
        email: 'sales@sahyadriagro.com',
        status: 'Approved',
        isFeatured: false,
      },
    ];

    for (const b of sampleBusinesses) {
      const exists = await Business.findOne({ companyName: b.companyName });
      if (!exists) {
        await Business.create({ ...b, user: adminUser._id });
        console.log(`Seeded Business: ${b.companyName}`);
      }
    }

    console.log('Seeding Completed Successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();