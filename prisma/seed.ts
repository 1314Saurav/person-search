import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.person.deleteMany()

  // Seed users
  const users = [
    { name: 'John Doe', phoneNumber: '0422018632', email: 'john@example.com' },
    { name: 'Jane Smith', phoneNumber: '0433129743', email: 'jane@example.com' },
    { name: 'Bob Johnson', phoneNumber: '0444240854', email: 'bob@example.com' },
    { name: 'Alice Brown', phoneNumber: '0455351965', email: 'alice@example.com' },
    { name: 'Charlie Davis', phoneNumber: '0466463076', email: 'charlie@example.com' },
    { name: 'Eva Wilson', phoneNumber: '0477574187', email: 'eva@example.com' },
    { name: 'Frank Miller', phoneNumber: '0478901234', email: 'frank@example.com' },
    { name: 'Grace Lee', phoneNumber: '0489012345', email: 'grace@example.com' },
    { name: 'Henry Moore', phoneNumber: '0490123456', email: 'henry@example.com' },
    { name: 'Isabella Young', phoneNumber: '0401234567', email: 'isabella@example.com' },
  ]

  for (const user of users) {
    await prisma.person.create({
      data: user,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })