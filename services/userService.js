import bcrypt from 'bcrypt';

import prisma from '@/prisma';

export class UserService {
  /**
   * Create a new user.
   * @param {object} data - Data for a new user.
   * @param {string} data.name - User's name.
   * @param {string} data.email - User's email.
   * @param {string} data.password - User's password.
   * @param {string[]} [data.permissions] - User's permissions.
   * @returns {Promise<User>} - Created user.
   */
  static async createUser({ name, email, password, permissions = [] }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(permissions);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        permissions: permissions
          ? { connect: permissions.map(p => ({ id: p })) }
          : undefined,
      },
      include: {
        permissions: true,
      },
    });
    return user;
  }

  /**
   * Update user's permissions.
   * @param {string} userId - User's ID.
   * @param {string[]} [permissions] - User's  updated permissions.
   * @returns {Promise<User>} - Updated user.
   */
  static async updatePermissions(userId, permissions = []) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        permissions: {
          set: permissions.map(p => ({ id: p })),
        },
      },
      include: {
        permissions: true,
      },
    });
    return user;
  }

  /**
   * Get user by email.
   * @param {string} email - User's email.
   * @returns {Promise<User>} - User with permissions.
   */
  static async getUserByEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        permissions: true,
      },
    });
    return user;
  }

  /**
   * Get user by ID.
   * @param {string} id - User's ID.
   * @returns {Promise<User>} - User with permissions.
   */
  static async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    });
    return user;
  }
}
