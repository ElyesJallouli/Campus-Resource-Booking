# Campus Resource Booking 

A web app for booking university resources such as computer labs, music practice rooms and classrooms. Students can sign up, log in and reserve time slots through a calendar, while admins get a dashboard with bookings, resources, users and booking trends.

## Tech stack

- Next.js 15 (React 19, TypeScript)
- Tailwind CSS + shadcn/ui
- Firebase (Authentication, Firestore, Admin SDK)
- Schedule-X calendar, Recharts



## Project structure

- `app/` – pages (home, login, signup, user scheduler, admin dashboard) and API routes
- `components/` – UI components
- `firebase/` – Firebase Admin setup and server-side helpers
- `lib/` – client-side Firebase helpers
