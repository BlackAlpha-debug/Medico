'use client';

import { notFound, useParams } from 'next/navigation';
import { PatientPortalExperience } from '@/components/medico/PatientPortalExperience';

const sections = ['appointments', 'medical-records', 'prescriptions', 'lab-reports', 'billing', 'messages'] as const;

export default function PatientSectionPage() {
  const { section } = useParams<{ section: string }>();
  if (!sections.includes(section as (typeof sections)[number])) notFound();
  return <PatientPortalExperience section={section as (typeof sections)[number]} />;
}
