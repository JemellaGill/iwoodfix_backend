// src/models/customer.model.ts
import pool from '../config/db';

export async function getAllCustomers() {
  const [rows] = await pool.query('SELECT * FROM customers');
  return rows;
}

export async function createCustomer(data: {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  notes?: string;
}) {
  const {
    first_name,
    last_name,
    address,
    city,
    state,
    zip,
    phone,
    email,
    notes,
  } = data;

  // 1. Check if customer already exists
  const [existing] = await pool.query(
    `SELECT * FROM customers WHERE first_name = ? AND last_name = ? AND email = ?`,
    [first_name, last_name, email]
  );

  if ((existing as any[]).length > 0) {
    throw new Error("Customer already exists with that name and email.");
  }

  // 2. If not, insert new customer
  const [result] = await pool.query(
    `INSERT INTO customers 
    (first_name, last_name, address, city, state, zip, phone, email, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, address, city, state, zip, phone, email, notes]
  );

  return result;
}
