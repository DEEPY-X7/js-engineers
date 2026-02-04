// --------------------------
//  Prisma Schema
//  Production-grade
// --------------------------

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

// --------------------------
//  MODELS
// --------------------------

// SERVICES Model
model Service {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  image       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // For admin ownership
  createdBy   String?
  updatedBy   String?
}

// GALLERY Model
model Gallery {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  image     String
  caption   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// TESTIMONIALS Model
model Testimonial {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  message   String
  rating    Int      @default(5)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// APPOINTMENTS Model
model Appointment {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  email       String
  phone       String
  serviceType String
  date        String
  message     String?
  createdAt   DateTime @default(now())
}

// CONTACT MESSAGES Model
model Contact {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String
  phone     String?
  message   String
  createdAt DateTime @default(now())
}

// ADMIN USER Model
model Admin {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  username  String   @unique
  password  String   // hashed password
  createdAt DateTime @default(now())
}