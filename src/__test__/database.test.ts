import { PrismaClient } from '@prisma/client';

describe('Database Operations', () => {
  let prisma: PrismaClient;
  let createdUserId: string;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  it('should create a user in the database', async () => {
    // Create a new user
    const newUser = await prisma.test.create({
      data: {
        user_id: 'some-unique-id',
      },
    });

    // Store the user ID for later deletion
    createdUserId = newUser.user_id;

    // Assert the user was created
    expect(newUser).toHaveProperty('user_id', 'some-unique-id');
    expect(newUser).toHaveProperty('createdAt');
    expect(newUser.createdAt).toBeInstanceOf(Date);
  });

  afterAll(async () => {
    // Cleanup: Delete the user we just created
    if (createdUserId) {
      await prisma.test.delete({
        where: {
          user_id: createdUserId,
        },
      });
    }

    // Close Prisma Client connection
    await prisma.$disconnect();
  });
});
