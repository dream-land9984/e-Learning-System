import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../server.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    // Basic validation
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Default role is STUDENT if not provided or invalid
    const validRoles = ['STUDENT', 'TEACHER', 'ADMIN'];
    const assignedRole = validRoles.includes(role) ? role : 'STUDENT';

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password_hash,
        role: assignedRole as any,
      },
    });

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.status === 'SUSPENDED') {
      return res.status(403).json({ message: 'Account is suspended' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
