#### Task Title: Resource Booking System with Conflict Detection and Buffer Logic
### Overview
 Build a mini full-stack app where users can book time slots for shared resources (e.g., rooms, devices). Your app must prevent overlapping bookings and include buffer time handling to avoid back-to-back conflicts.

### Requirements
#### Booking Form 
- Fields: Resource (dropdown with 3–5 sample values), Start Time (datetime-local), End Time (datetime-local), Requested By (text)
- Validate:
End Time > Start Time
Duration must be at least 15 minutes
Submit form data to backend API
#### API (Backend – Next.js Route Handler or Express + TypeScript)
- POST /api/bookings
Check for conflicts:
Reject if the time range overlaps with existing bookings of the same resource.
- Add a 10-minute buffer before and after existing bookings (e.g., booking from 10:00–11:00 blocks 09:50–11:10)
Save booking if no conflict


- GET /api/bookings
- Return all bookings
Support optional query parameters: resource, date
#### Booking Dashboard
- List all bookings grouped by resource
- Filter by resource and date
- Sort by upcoming time
- Show status tags: "Upcoming", "Ongoing", or "Past"
#### Conflict Rule Example (with 10-minute buffer time)
If Resource A is booked from 2:00 PM to 3:00 PM, the system blocks 10 minutes before and after, so the total blocked time is 1:50 PM to 3:10 PM.


#### This means:

- 12:55 PM – 1:55 PM → Rejected (overlaps buffer before)
- 12:50 PM – 1:50 PM → Rejected (overlaps buffer before)
- 2:00 PM – 3:00 PM → Rejected (starts exactly at buffer end, must start after 2:10 PM)
- 2:15 PM – 3:00 PM → Allowed (starts after buffer ends)
- 11:00 AM – 12:45 PM → Allowed (ends before buffer starts)

Buffer time helps avoid bookings being too close together.
#### Bonus (Optional but Highly Recommended)
- Cancel/delete a booking
- Weekly calendar view (use any UI lib or custom)
- Add booking duration limit (e.g., max 2 hours)
- Use SQLite/Prisma for persistent storage
- Add availability check API (GET /api/available-slots)
#### Tech Stack
Frontend: Next.js (App Router), Tailwind CSS, TypeScript
Backend: Route Handlers or Express, TypeScript
Data: In-memory, JSON, or SQLite (bonus)



