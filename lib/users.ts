import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: 'customer' | 'admin'
  createdAt: string
}

const usersFilePath = path.join(process.cwd(), 'users.json')

// Load users from file
function loadUsers(): User[] {
  try {
    if (fs.existsSync(usersFilePath)) {
      const data = fs.readFileSync(usersFilePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error loading users:', error)
  }
  return []
}

// Save users to file
function saveUsers(users: User[]) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error saving users:', error)
  }
}

// Get users (load fresh each time)
function getUsers(): User[] {
  return loadUsers()
}

// Seed initial users if none exist
function seedUsers() {
  const users = loadUsers()
  if (users.length === 0) {
    const hashedPassword = bcrypt.hashSync('admin123', 10)
    const hashedCustomer = bcrypt.hashSync('customer123', 10)
    
    const seedData: User[] = [
      {
        id: '1',
        email: 'admin@circuitforge.com',
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'customer@circuitforge.com',
        password: hashedCustomer,
        name: 'Customer',
        role: 'customer',
        createdAt: new Date().toISOString()
      }
    ]
    saveUsers(seedData)
  }
}

// Initialize seed
seedUsers()

export function findUserByEmail(email: string): User | undefined {
  const users = getUsers()
  return users.find(u => u.email === email)
}

export function findUserById(id: string): User | undefined {
  const users = getUsers()
  return users.find(u => u.id === id)
}

export async function createUser(email: string, password: string, name: string): Promise<User> {
  const users = getUsers()
  const existing = users.find(u => u.email === email)
  if (existing) {
    throw new Error('User already exists')
  }
  
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser: User = {
    id: String(users.length + 1),
    email,
    password: hashedPassword,
    name,
    role: 'customer',
    createdAt: new Date().toISOString()
  }
  users.push(newUser)
  saveUsers(users)
  return newUser
}

export async function validateUser(email: string, password: string): Promise<User | null> {
  const user = findUserByEmail(email)
  if (!user) return null
  
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return null
  
  return user
}

export function getAllUsers(): User[] {
  const users = getUsers()
  return users.map(u => ({ ...u, password: 'hidden' } as User))
}