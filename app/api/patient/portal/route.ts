import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function currentPatient() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

export async function GET() {
  const patient = await currentPatient();
  if (!patient) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [medicalHistory, sessions, appointments, invoices, messages, doctors, medicationLogs] = await Promise.all([
    prisma.medicalHistory.findUnique({ where: { patientId: patient.id } }),
    prisma.clinicalSession.findMany({
      where: { patientId: patient.id },
      include: { soapReport: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.patientAppointment.findMany({
      where: { patientId: patient.id },
      include: { doctorProfile: { select: { fullName: true, specialization: true, hospital: true, profileImage: true } } },
      orderBy: { scheduledAt: 'asc' },
    }),
    prisma.patientInvoice.findMany({ where: { patientId: patient.id }, orderBy: { serviceDate: 'desc' } }),
    prisma.patientMessage.findMany({ where: { patientId: patient.id }, orderBy: { createdAt: 'asc' } }),
    prisma.doctorProfile.findMany({
      where: { isComplete: true },
      select: { id: true, fullName: true, specialization: true, hospital: true, department: true, profileImage: true },
      orderBy: { fullName: 'asc' },
    }),
    prisma.medicationLog.findMany({ where: { patientId: patient.id }, orderBy: { takenOn: 'desc' }, take: 100 }),
  ]);

  const doctorIds = sessions.flatMap(item => item.soapReport?.assignedDoctorId ? [item.soapReport.assignedDoctorId] : []);
  const assignedDoctors = doctorIds.length ? await prisma.doctorProfile.findMany({
    where: { doctorId: { in: doctorIds } },
    select: { doctorId: true, fullName: true, specialization: true, hospital: true },
  }) : [];
  const doctorByUserId = new Map(assignedDoctors.map(doctor => [doctor.doctorId, doctor]));

  return NextResponse.json({
    patient: { id: patient.id, name: patient.name, email: patient.email },
    medicalHistory,
    doctors,
    appointments,
    invoices: invoices.map(invoice => ({
      ...invoice,
      amount: Number(invoice.amount),
      insuranceCovered: Number(invoice.insuranceCovered),
      patientDue: Number(invoice.patientDue),
    })),
    messages,
    medicationLogs,
    records: sessions.map(item => ({
      id: item.id,
      chiefComplaint: item.chiefComplaint || 'Clinical interview',
      symptoms: item.identifiedSymptoms,
      redFlags: item.redFlagsDetected,
      status: item.soapReport?.reviewStatus || item.status,
      createdAt: item.createdAt,
      report: item.soapReport ? {
        id: item.soapReport.id,
        subjective: item.soapReport.subjective,
        objective: item.soapReport.objective,
        assessment: item.soapReport.assessment,
        plan: item.soapReport.plan,
        department: item.soapReport.department,
        priority: item.soapReport.priority,
        reviewStatus: item.soapReport.reviewStatus,
        doctorNotes: item.soapReport.doctorNotes,
        prescription: item.soapReport.prescription,
        reviewedAt: item.soapReport.reviewedAt,
        doctor: item.soapReport.assignedDoctorId ? doctorByUserId.get(item.soapReport.assignedDoctorId) ?? null : null,
      } : null,
    })),
  });
}

export async function POST(request: NextRequest) {
  const patient = await currentPatient();
  if (!patient) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();

  if (body.action === 'bookAppointment') {
    const scheduledAt = new Date(body.scheduledAt);
    if (!body.specialty || Number.isNaN(scheduledAt.getTime()) || scheduledAt <= new Date()) {
      return NextResponse.json({ error: 'Choose a specialty and a future appointment time.' }, { status: 400 });
    }
    if (body.doctorProfileId) {
      const doctor = await prisma.doctorProfile.findFirst({ where: { id: body.doctorProfileId, isComplete: true }, select: { id: true } });
      if (!doctor) return NextResponse.json({ error: 'The selected doctor is unavailable.' }, { status: 400 });
    }
    const appointment = await prisma.patientAppointment.create({
      data: {
        patientId: patient.id,
        doctorProfileId: body.doctorProfileId || null,
        specialty: String(body.specialty).slice(0, 120),
        visitType: body.visitType === 'in_person' ? 'in_person' : 'video',
        scheduledAt,
        reason: body.reason ? String(body.reason).slice(0, 1000) : null,
        location: body.visitType === 'in_person' ? (body.location ? String(body.location).slice(0, 240) : null) : 'Secure video consultation',
      },
      include: { doctorProfile: { select: { fullName: true, specialization: true, hospital: true, profileImage: true } } },
    });
    return NextResponse.json({ appointment }, { status: 201 });
  }

  if (body.action === 'sendMessage') {
    const messageBody = String(body.body || '').trim();
    if (!messageBody || messageBody.length > 4000) return NextResponse.json({ error: 'Enter a message up to 4,000 characters.' }, { status: 400 });
    const message = await prisma.patientMessage.create({
      data: { patientId: patient.id, threadKey: String(body.threadKey || 'care-team').slice(0, 80), senderRole: 'patient', senderName: patient.name, body: messageBody },
    });
    return NextResponse.json({ message }, { status: 201 });
  }

  if (body.action === 'markMedication') {
    const report = await prisma.sOAPReport.findFirst({ where: { id: body.reportId, patientId: patient.id, prescription: { not: null } }, select: { id: true, prescription: true } });
    const medication = String(body.medication || '').trim();
    if (!report || !medication || !report.prescription?.toLowerCase().includes(medication.toLowerCase())) {
      return NextResponse.json({ error: 'Medication is not part of an approved prescription.' }, { status: 400 });
    }
    const log = await prisma.medicationLog.create({ data: { patientId: patient.id, reportId: report.id, medication } });
    return NextResponse.json({ log }, { status: 201 });
  }

  return NextResponse.json({ error: 'Unsupported action.' }, { status: 400 });
}

export async function PATCH(request: NextRequest) {
  const patient = await currentPatient();
  if (!patient) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();

  if (body.action === 'updateAppointment') {
    const appointment = await prisma.patientAppointment.findFirst({ where: { id: body.id, patientId: patient.id } });
    if (!appointment) return NextResponse.json({ error: 'Appointment not found.' }, { status: 404 });
    const data: { status?: string; scheduledAt?: Date } = {};
    if (body.status === 'cancelled') data.status = 'cancelled';
    if (body.scheduledAt) {
      const date = new Date(body.scheduledAt);
      if (Number.isNaN(date.getTime()) || date <= new Date()) return NextResponse.json({ error: 'Choose a future time.' }, { status: 400 });
      data.scheduledAt = date;
      data.status = 'requested';
    }
    const updated = await prisma.patientAppointment.update({ where: { id: appointment.id }, data });
    return NextResponse.json({ appointment: updated });
  }

  if (body.action === 'readMessages') {
    await prisma.patientMessage.updateMany({ where: { patientId: patient.id, senderRole: { not: 'patient' }, readAt: null }, data: { readAt: new Date() } });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Unsupported action.' }, { status: 400 });
}
