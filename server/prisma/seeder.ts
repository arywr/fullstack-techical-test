import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ethnicGroups = [
  'Javanese',
  'Sundanese',
  'Batak',
  'Madurese',
  'Betawi',
  'Minangkabau',
  'Bugis',
  'Bantenese',
  'Banjar',
  'Balinese',
  'Acehnese',
  'Dayak',
  'Sasak',
  'Papuan',
  'Torajan',
  'Makasar',
  'Maluku',
  'Tionghoa-Indonesia (Chinese-Indonesian)'
];

const educationGroups = [
  "SD",
  "SMP",
  "SMA/SMK",
  "D1",
  "D2",
  "D3",
  "D4",
  "S1",
  "S2",
  "S3",
];

const religionGroups = [
  "Islam",
  "Kristen Protestan",
  "Katolik",
  "Hindu",
  "Buddha",
  "Konghucu",
  "Kepercayaan (Aliran Kepercayaan)"
];

const locationGroups = [
  { province: "DKI Jakarta", city: "Jakarta", regency: "Jakarta Selatan" },
  { province: "Jawa Barat", city: "Bandung", regency: "Kabupaten Bandung" },
  { province: "Jawa Tengah", city: "Semarang", regency: "Kabupaten Semarang" },
  { province: "Jawa Timur", city: "Surabaya", regency: "Kabupaten Gresik" },
  { province: "Bali", city: "Denpasar", regency: "Kabupaten Badung" },
  { province: "Sumatera Utara", city: "Medan", regency: "Kabupaten Deli Serdang" },
  { province: "Sulawesi Selatan", city: "Makassar", regency: "Kabupaten Gowa" },
];

const fakerCitizen = (): any => {
  return {
    nik: faker.string.uuid(),
    name: `${faker.person.fullName()} ${faker.person.lastName()}`,
    age: faker.number.int({ min: 10, max: 80 }),
    education_level: faker.helpers.arrayElement(educationGroups), // SD, SMP, SMA/SMK, D1, D2, D3, D4, S1, S2, S3
    occupation: faker.person.jobTitle(),
    race: faker.helpers.arrayElement(ethnicGroups),
    sex: faker.person.sex(),
    religion: faker.helpers.arrayElement(religionGroups),
    address: faker.location.streetAddress(),
    ...faker.helpers.arrayElement(locationGroups)
  }
}

const BATCH_SIZE = 10_000;
const TOTAL_RECORDS = 50_000;

const main = async () => {
  const count = await prisma.citizens.count();
  if (count === 0) {
    for (let i = 0; i < TOTAL_RECORDS / BATCH_SIZE; i++) {
      const dataBatch = Array.from({ length: BATCH_SIZE }, () => fakerCitizen());
  
      console.time(`Batch ${i + 1}`);
  
      await prisma.citizens.createMany({
        data: dataBatch,
        skipDuplicates: true,
      });
  
      console.timeEnd(`Batch ${i + 1}`);
      console.log(`Inserted batch ${i + 1} of ${TOTAL_RECORDS / BATCH_SIZE}`);
    }
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });