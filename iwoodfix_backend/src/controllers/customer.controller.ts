// src/controllers/customer.controller.ts
import { getAllCustomers, createCustomer } from '../models/customer.model';

export async function showCustomers(req: any, res: any) {
  try {
    const data = await getAllCustomers();
    res.json(data);
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ message: 'Error retrieving customers' });
  }
}

import pool from '../config/db'; // Make sure you have access to the pool

export async function addCustomer(req: any, res: any) {
  const { email, phone } = req.body;

  try {
    // Check for existing customer by email or phone
    const [existing] = await pool.query(
      'SELECT * FROM customers WHERE email = ? OR phone = ?',
      [email, phone]
    );

    if ((existing as any[]).length > 0) {
      return res.status(409).json({ message: 'Customer already exists' });
    }

    // If not exists, insert new customer
    const result = await pool.query(
      `INSERT INTO customers (first_name, last_name, address, city, state, zip, phone, email, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.body.first_name,
        req.body.last_name,
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.zip,
        req.body.phone,
        req.body.email,
        req.body.notes
      ]
    );

    res.status(201).json({ message: 'Customer added successfully', result });
  } catch (error) {
    console.error('❌ Error adding customer:', error);
    res.status(500).json({ message: 'Error adding customer' });
  }
}


