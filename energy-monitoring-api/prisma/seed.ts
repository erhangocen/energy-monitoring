import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Default organization oluştur
  const organization = await prisma.organization.upsert({
    where: { id: 'default-org-id' },
    update: {},
    create: {
      id: 'default-org-id',
      name: 'Default Organization',
      isDeleted: false,
    },
  });

  console.log('✅ Organization created:', organization.name);

  // Default admin user oluştur
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: hashedPassword,
      role: 'admin',
      organizationId: organization.id,
      isDeleted: false,
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Default meter oluştur
  const defaultMeter = await prisma.meter.upsert({
    where: { id: 'default-meter-id' },
    update: {},
    create: {
      id: 'default-meter-id',
      name: 'METER-001',
      organizationId: organization.id,
      isDeleted: false,
    },
  });

  console.log('✅ Default meter created:', defaultMeter.name);

  // Admin user'ı default meter'a bağla
  await prisma.userMeter.upsert({
    where: {
      userId_meterId: {
        userId: adminUser.id,
        meterId: defaultMeter.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      meterId: defaultMeter.id,
      isDeleted: false,
    },
  });

  console.log('✅ User-Meter connection created');

  // Sample meter reading oluştur
  const sampleReading = await prisma.meterReading.create({
    data: {
      meterId: defaultMeter.id,
      timestamp: new Date(),
      indexKwh: 100,
      consumptionKwh: 100,
      isDeleted: false,
    },
  });

  console.log('✅ Sample meter reading created:', sampleReading.id);

  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('📋 Default credentials:');
  console.log('   Email: admin@example.com');
  console.log('   Password: admin123');
  console.log('   Role: admin');
  console.log('');
  console.log('⚠️  Please change the default password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
