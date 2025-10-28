# Vue Implementation - TicketApp

This is a Vue 3 + Vite implementation of the Ticket Management app.

Quick start (Windows PowerShell):

```powershell
cd vue-app
npm install
npm run dev
```

Local storage keys used:
- `ticketapp_session` - authentication token
- `ticketapp_tickets` - JSON array of tickets

Test user:
- any email and password will create a session (this is a mocked auth)

Notes:
- Uses Vue 3 with Composition API and Vue Router
- Shared assets with React implementation (wave SVG, decorative circles)
- Protected routes redirect to login if no session token exists