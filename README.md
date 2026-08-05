# CircuitForge — Full-Stack E-Commerce Platform

## 🔗 Live Demo
[https://e-commerce-tan-one-94.vercel.app](https://e-commerce-tan-one-94.vercel.app)

## 📖 Overview
CircuitForge is a full-featured PC hardware e-commerce platform built with Next.js, TypeScript, Supabase, and Stripe. It allows users to browse products, add to cart, checkout with Stripe, and track orders.

## ✨ Key Features

### User Features
- Browse products by category and subcategory
- Search products by name, slug, or category
- Add to cart, update quantity, remove items
- Secure checkout with Stripe payment
- View order history and track orders
- Leave product reviews and ratings

### Authentication
- User registration with email verification
- Login with email/password
- Password reset via email

### Admin Features
- Dashboard with stats (products, orders, pending)
- Manage products (Create, Read, Update, Delete)
- Manage orders (update status)
- Manage categories (CRUD)

### AI Tools (Demo)
- **Bottleneck Analyzer** — identifies performance bottlenecks
- **Compatibility Checker** — checks component compatibility
- **Upgrade Planner** — suggests upgrades based on budget

### Email Notifications
- Order confirmation emails
- Password reset emails

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + JWT |
| Payments | Stripe |
| Email | Resend |
| Hosting | Vercel |

## 🧪 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@circuitforge.com | admin123 |
| Customer | testlogin@example.com | test123 |

## 🚀 Local Development

1. Clone the repository:
```bash
git clone https://github.com/MahdiRedwan/E-commerce.git
cd E-commerce