const { PrismaClient } = require('@prisma/client');

async function check(password, dbName) {
    const url = `postgresql://postgres:${password}@localhost:5432/${dbName}?schema=public`;
    process.env.DATABASE_URL = url;
    const prisma = new PrismaClient({ datasources: { db: { url } } });
    try {
        await prisma.$connect();
        console.log(`SUCCESS: password='${password}' db='${dbName}'`);
        await prisma.$disconnect();
        return true;
    } catch (e) {
        return false;
    }
}

async function run() {
    const passwords = ['postgres', 'password', 'admin', 'root', '123456', 'chesma', ''];
    const dbs = ['chesma', 'postgres', 'mydb'];
    for (const p of passwords) {
        for (const db of dbs) {
            if (await check(p, db)) return;
        }
    }
    console.log("FAILED ALL");
}
run();
