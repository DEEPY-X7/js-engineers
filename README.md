# J. S. Engineers & Consultant — Website

**Next.js 14** business website with Gallery + Admin Panel  
Professional Electrical, Telecom & Satellite services — Prayagraj

---

## Setup (3 steps)

```bash
# 1. Install dependencies
npm install

# 2. Create env file
cp .env.example .env.local

# 3. Start dev server
npm run dev
```

Open: **http://localhost:3000**

---

## Pages

| URL | Page | Auth |
|-----|------|------|
| `/` | Home | Public |
| `/about` | About Us | Public |
| `/services` | Services | Public |
| `/gallery` | Project Gallery | Public |
| `/contact` | Contact Form | Public |
| `/login` | Admin Login | — |
| `/admin` | Admin Dashboard | 🔒 Login required |

---

## Admin Panel

**Login:** `http://localhost:3000/login`  
**Username:** `jsadmin`  
**Password:** `js@2024`

> ⚠️ Production ke liye `.env.local` mein password change karein.

### Gallery Tab
- Project photo upload (drag & drop / URL)
- Title, Category, Location, Date, Description
- Filter by category
- Delete with confirmation

### Inquiries Tab
- Contact form submissions yahan aate hain
- Unread/Read status
- One-click Call, WhatsApp, Email buttons
- Delete inquiry

---

## Data Storage

| File | Content |
|------|---------|
| `data/gallery.json` | Gallery projects |
| `data/contacts.json` | Contact inquiries |

Both files auto-create on first run.

---

## API Routes

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/gallery` | All gallery items |
| POST | `/api/gallery` | Add item (auth) |
| DELETE | `/api/gallery/:id` | Delete item (auth) |
| POST | `/api/contact` | Submit inquiry |
| GET | `/api/contact` | All inquiries (auth) |
| PATCH | `/api/contact/:id` | Mark read/unread (auth) |
| DELETE | `/api/contact/:id` | Delete inquiry (auth) |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/check` | Session check |

---

## Environment Variables

```env
# .env.local
ADMIN_USERNAME=jsadmin
ADMIN_PASSWORD=js@2024
NODE_ENV=development
```

---

## Deploy to Vercel

```bash
npm run build   # test build first
npx vercel      # deploy
```

Add env variables in Vercel dashboard:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `NODE_ENV=production`

> **Note:** Vercel pe file storage (`data/*.json`) persist nahi hoti between deployments. Production ke liye MongoDB ya PlanetScale use karein.

---

## Company Details

**J. S. Engineers & Consultant**  
📍 77/12A/2B, Newada Ashok Nagar, Prayagraj, UP 211001  
📞 +91 70420 99984 | ☎ 0532-452-4075  
✉️ js.engineeringconsultant77@gmail.com  
🏅 MSME: UDYAM-UP-03-0110637 | GST: 09AUUPS5965Q1Z1
