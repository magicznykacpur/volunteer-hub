import { prisma } from "../src/config/prisma.config";
import { Opportunity, Role, User } from "../src/generated/prisma";
import { v4 as uuidv4 } from "uuid";
import { hashSync } from "bcrypt-ts";

const organization: User = {
  id: uuidv4(),
  createdAt: new Date(),
  updatedAt: new Date(),
  email: "organization.user@mail.com",
  emailVerified: true,
  hashedPassword: hashSync("password123"),
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
  {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Great opportunity",
    description: "So good, so great, check it out now!",
    location: "San Diego",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    organizationId: organization.id,
  },
  {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Looking for a thing or two",
    description: "Looking for some stuff...",
    location: "New York",
    date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    organizationId: organization.id,
  },
  {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Biiiiiiiiiiiiiiiiiiiiig Titleeeeeeeeeeeeee",
    description: "This is big title opportunity!",
    location: "Austin",
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    organizationId: organization.id,
  },
  {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Quite Normal Title",
    description: `However the description is gonna be quite long, like idk how
    long maybe a couple hundred lines of this: LINE LINE LINE LINE LINE LINE
    LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE
    LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE
    LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE
    LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE
    LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE
    LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE
    LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE
    LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE
    LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE
    LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE
    LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LINE LIN`,
    location: "Does it even matter?",
    date: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
    organizationId: organization.id,
  },
  {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Last but not least",
    description: "OMG how kawaii desu neeee!",
    location: "Tokyo",
    date: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000),
    organizationId: organization.id,
  },
  {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Bro what do i write here?",
    description: "Oh that's right it was the title.",
    location: "Warsaw",
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    organizationId: organization.id,
  },
  {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Ok this time for real, it's the last one",
    description: "Seeding is so fun!",
    location: "Seed Town",
    date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
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
