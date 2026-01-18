-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "username" TEXT,
    "avatar" TEXT,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "position" TEXT,
    "experience" TEXT,
    "department" TEXT,
    "salary" REAL,
    "hireDate" TEXT,
    "status" TEXT,
    "bio" TEXT,
    "schedule" JSONB,
    "performance" JSONB,
    "specialties" TEXT,
    "certifications" TEXT,
    "awards" TEXT,
    "notes" TEXT,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "Dish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL,
    "image" TEXT,
    "category" TEXT,
    "rating" REAL,
    "cookTime" TEXT,
    "isVegetarian" BOOLEAN,
    "isSpicy" BOOLEAN
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
