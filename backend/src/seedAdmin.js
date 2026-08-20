// backend/src/seedAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Business from './models/Business.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // 1. Seed Master SuperAdmin
    const adminEmail = 'admin@begaindia.org';
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('BegaAdmin@2026', salt);

      adminUser = await User.create({
        name: 'BEGA Master Admin',
        email: adminEmail,
        mobile: '+917387877820',
        password: hashedPassword,
        role: 'admin',
        applicationNumber: 'BEGA-ADMIN-2026',
        district: 'Chhatrapati Sambhajinagar',
        taluka: 'Aurangabad',
        isVerified: true,
        membership: {
          plan: 'Executive Board',
          status: 'Active',
        },
      });
      console.log('Master Admin Created: admin@begaindia.org / BegaAdmin@2026');
    } else {
      adminUser.role = 'admin';
      await adminUser.save();
      console.log('Master Admin Account Verified');
    }

    // 2. Seed Initial Verified Business Directory Entries
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