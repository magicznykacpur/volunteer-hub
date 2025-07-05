import { prisma } from "../src/config/prisma.config";
import { Opportunity, Role, User } from "../src/generated/prisma";
import { v4 as uuidv4 } from "uuid";

const organization: User = {
  id: uuidv4(),
  createdAt: new Date(),
  updatedAt: new Date(),
  email: "organization.user@mail.com",
  emailVerified: true,
  hashedPassword: "b2Jl1BMapL4Msdja1ldazot592",
  role: Role.ORGANIZATION,
};

const opportunities: Opportunity[] = [
  {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "New opportunity",
    description: "This is a great opportunity my man, check it out quick!",
    location: "New Mexico",
    date: new Date(),
    organizationId: organization.id,
  },
];

const main = async () => {
  await prisma.user.create({ data: organization });
  await prisma.opportunity.createMany({ data: opportunities });
};

main()
  .catch((e) => {
    console.log("im here dawg");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
