import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';
import bcrypt from 'bcryptjs';
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main(){
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if(!email || !password){
        throw new Error(
            'se necesita un correo electrónico y una contraseña para crear el administrador'
        )
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const admin = await prisma.admin.upsert({
        where:{email},
        update: {passwordHash},
        create:{email,passwordHash},

    });
    console.log(`admin listo: ${admin.email}`)
}
main()
.catch((e)=>{
    console.error(e);
    process.exit(1);
})
.finally(async()=>{
    await prisma.$disconnect();
});