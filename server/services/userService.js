/**
 * User Service
 * Business logic for user operations
 */
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Create user
 */
const createUser = async (userData) => {
  const { email, phone, password, first_name, last_name } = userData;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (email, phone, password_hash, first_name, last_name)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, email, first_name, last_name
  `;

  const result = await db.getOne(query, [email, phone, hashedPassword, first_name, last_name]);
  return result;
};

/**
 * Find user by email
 */
const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  return await db.getOne(query, [email]);
};

/**
 * Find user by ID
 */
const findUserById = async (id) => {
  const query = 'SELECT id, email, phone, first_name, last_name, kyc_status, two_fa_enabled, created_at FROM users WHERE id = $1';
  return await db.getOne(query, [id]);
};

/**
 * Verify password
 */
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generate JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

/**
 * Generate refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, config.jwt.refreshSecret, {
    expiresIn: '30d',
  });
};

/**
 * Update user profile
 */
const updateUserProfile = async (userId, userData) => {
  const { first_name, last_name, phone } = userData;

  const query = `
    UPDATE users 
    SET first_name = $1, last_name = $2, phone = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING id, email, first_name, last_name, phone
  `;

  return await db.getOne(query, [first_name, last_name, phone, userId]);
};

/**
 * Change password
 */
const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await db.getOne('SELECT password_hash FROM users WHERE id = $1', [userId]);

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await verifyPassword(currentPassword, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const query = 'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2';
  await db.query(query, [hashedPassword, userId]);

  return { success: true, message: 'Password changed successfully' };
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  verifyPassword,
  generateToken,
  generateRefreshToken,
  updateUserProfile,
  changePassword,
};
