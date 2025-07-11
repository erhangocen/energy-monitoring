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
      name: 'Default Organization',
    },
  });

  console.log('✅ Organization created:', organization.name);

  // Default admin oluştur
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@example.com',
      passwordHash: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Default user oluştur
  const userHashedPassword = await bcrypt.hash('user123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'User',
      email: 'user@example.com',
      organizationId: organization.id,
      passwordHash: userHashedPassword,
      role: 'user',
    },
  });

  console.log('✅ User user created:', user.email);

  // Default meter oluştur
  const defaultMeter = await prisma.meter.upsert({
    where: {
      name_organizationId: {
        name: 'METER-001',
        organizationId: organization.id,
      },
    },
    update: {},
    create: {
      name: 'METER-001',
      organizationId: organization.id,
    },
  });

  console.log('✅ Default meter created:', defaultMeter.name);

  // user'ı default meter'a bağla
  await prisma.userMeter.upsert({
    where: {
      userId_meterId: {
        userId: user.id,
        meterId: defaultMeter.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      meterId: defaultMeter.id,
      isDeleted: false,
    },
  });

  console.log('✅ User-Meter connection created');

  const now = new Date();
  let previousIndexKwh = 100; // initial indexKwh

  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000); // each hour
    // indexKwh increases randomly by 5-20
    const increment = Math.floor(Math.random() * 16) + 5; // between 5 and 20
    const currentIndexKwh = previousIndexKwh + increment;
    const consumptionKwh = currentIndexKwh - previousIndexKwh;

    await prisma.meterReading.create({
      data: {
        meterId: defaultMeter.id,
        timestamp,
        indexKwh: currentIndexKwh,
        consumptionKwh,
      },
    });
    previousIndexKwh = currentIndexKwh;
  }

  console.log('✅ 24 hourly sample meter readings created');

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
