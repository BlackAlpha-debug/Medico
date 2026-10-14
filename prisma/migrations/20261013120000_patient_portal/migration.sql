-- CreateTable
CREATE TABLE "patient_appointment" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorProfileId" TEXT,
    "specialty" TEXT NOT NULL,
    "visitType" TEXT NOT NULL DEFAULT 'video',
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER NOT NULL DEFAULT 30,
    "reason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'requested',
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "patient_appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_invoice" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "insuranceCovered" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "patientDue" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'PKR',
    "status" TEXT NOT NULL DEFAULT 'unpaid',
    "serviceDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "patient_invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_message" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "threadKey" TEXT NOT NULL DEFAULT 'care-team',
    "senderRole" TEXT NOT NULL DEFAULT 'patient',
    "senderName" TEXT,
    "body" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "patient_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medication_log" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "medication" TEXT NOT NULL,
    "takenOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "medication_log_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "patient_appointment_patientId_scheduledAt_idx" ON "patient_appointment"("patientId", "scheduledAt");
CREATE INDEX "patient_appointment_doctorProfileId_scheduledAt_idx" ON "patient_appointment"("doctorProfileId", "scheduledAt");
CREATE UNIQUE INDEX "patient_invoice_invoiceNumber_key" ON "patient_invoice"("invoiceNumber");
CREATE INDEX "patient_invoice_patientId_serviceDate_idx" ON "patient_invoice"("patientId", "serviceDate");
CREATE INDEX "patient_message_patientId_threadKey_createdAt_idx" ON "patient_message"("patientId", "threadKey", "createdAt");
CREATE UNIQUE INDEX "medication_log_patientId_reportId_medication_takenOn_key" ON "medication_log"("patientId", "reportId", "medication", "takenOn");
CREATE INDEX "medication_log_patientId_takenOn_idx" ON "medication_log"("patientId", "takenOn");

ALTER TABLE "patient_appointment" ADD CONSTRAINT "patient_appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "patient_appointment" ADD CONSTRAINT "patient_appointment_doctorProfileId_fkey" FOREIGN KEY ("doctorProfileId") REFERENCES "doctor_profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "patient_invoice" ADD CONSTRAINT "patient_invoice_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "patient_message" ADD CONSTRAINT "patient_message_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "medication_log" ADD CONSTRAINT "medication_log_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
