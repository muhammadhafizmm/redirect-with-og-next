import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const settingsData: Prisma.SettingCreateInput[] = [
  {
    type: 'REGULAR',
    og_title: `Bergabung bersama dengan menggunakan referral code {code} untuk hadiah menarik lainnya`,
    og_description: `Daftar sekarang dengan referral code {code}, untuk mendapatkan hadiah menarik!`,
    og_image: `/KV Referee.png`,
    redirect_url: 'https://google.com',
  },
  {
    type: 'JURAGAN',
    og_title: `Bergabung bersama dengan menggunakan referral code {code} untuk hadiah menarik lainnya`,
    og_description: `Daftar sekarang dengan referral code {code}, untuk mendapatkan hadiah menarik!`,
    og_image: `/KV Referee.png`,
    redirect_url: 'https://google.com',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const s of settingsData) {
    const setting = await prisma.setting.create({
      data: s,
    })
    console.log(`Created setting with id: ${setting.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })