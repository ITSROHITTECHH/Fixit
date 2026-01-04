# Fixit

Fixit is a modern home repair and maintenance service website that makes it easy for users to discover, compare, and book local service professionals. Designed with a clean UI and smooth browsing experience, Fixit turns everyday household problems into quick and reliable solutions.


---

Fixit is a modern home repair and maintenance service platform that makes it easy for users to discover, compare, and book trusted local service professionals. Designed with a clean UI, smooth animations, and real backend integration, Fixit transforms everyday household problems into quick, reliable, and user-friendly solutions.

The platform combines a premium frontend experience with a functional Django backend, including user authentication, booking management, and a personalized dashboard.

🌟 Overview

Fixit focuses on both design excellence and real-world functionality:

A visually appealing, responsive website

Multiple service categories with detailed service pages

Secure user login

Backend-powered booking system

A user dashboard that displays bookings dynamically

This project is ideal for showcasing frontend skills, backend logic, and full-stack integration.

⭐ Features
🎨 Frontend (UI/UX)

Modern & Responsive UI – Fully optimized for all screen sizes

Multi-Page Design – Home, About Us, Services, Contact, Signup, Login, Dashboard

Service Categories – 8 main service categories, each with 4 detailed service cards

Glassmorphic Testimonials Section – Hover effects with orange-gradient theme

Attractive CTA Section – Dark modern call-to-action with glowing gradients

Smooth Animations & Hover Effects – Adds depth and premium feel

User-Friendly Navigation – Clean and intuitive navbar across all pages

Optimized Asset Structure – Organized folders for CSS, JS, and images

🔐 Backend (Django)

User Authentication System

Login required to access dashboard

Secure session-based authentication

Booking Management

Bookings linked to logged-in users

Each user sees only their own bookings

REST-style API

/api/my-bookings/ returns user-specific bookings in JSON

Dashboard Integration

Frontend fetches booking data dynamically from backend

Handles empty bookings gracefully

Clean & Beginner-Friendly Logic

No over-complication

Easy to understand backend flow

📊 User Dashboard

Personalized dashboard after login

Displays all user bookings

Status tracking:

Pending

Confirmed

Completed

Dynamic rendering using JavaScript Fetch API

Backend-powered (not static)

🧱 Tech Stack
Frontend

HTML5

CSS3

JavaScript (Vanilla JS)

Backend

Python

Django

SQLite (development database)

🎨 Design Theme

Color Palette

Primary Orange: #ff5722

Dark Orange: #e64a19

Dark Background: #1a1a1a

Light Gray: #f8f9fa

The theme reflects energy, trust, and modern professionalism.

🔌 API Endpoint
Get Logged-in User Bookings
GET /api/my-bookings/


Authentication required

Returns only bookings belonging to the logged-in user

Example Response

[]


(Empty array means no bookings yet — handled safely in the dashboard UI)

📁 Project Structure (Simplified)
Fixit/
├── api/
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│
├── templates/
│   ├── login.html
│   ├── booking.html
│   ├── dashboard.html
│
├── static/
│   ├── css/
│   └── js/
│       └── dashboard.js
│
├── manage.py
└── README.md

🎯 Learning Outcomes

Full-stack project structure

Django authentication & session handling

API creation and consumption

Frontend–backend integration

Dashboard logic using JavaScript

Real-world debugging & error handling

Clean UI + functional backend balance

🚀 Future Enhancements

Online payment integration

Admin dashboard

Technician assignment system

Booking cancellation & rescheduling

Email / SMS notifications

📞 Contact

If you like this project and want to share feedback, ask questions, or suggest improvements, I’d love to hear from you.

📧 Email:
srivastavarohitkumar067@gmail.com

🔗 LinkedIn:
https://www.linkedin.com/in/rohit-kumar-srivastava-39a74b372

🐦 Twitter (X):
https://x.com/itsrohit_tech

🎨 Media Attribution

This project uses AI-generated visuals.
All images and graphics were created using Gemini AI, specifically for Fixit.
No third-party downloaded assets are used.
---

# 🎨 Media Attribution

This project uses AI-generated visuals. All images and graphics were created using Gemini AI, specifically for Fixit. No third‑party downloaded assets are used.
