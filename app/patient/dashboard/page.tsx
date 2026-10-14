import { redirect } from 'next/navigation';

export default function LegacyPatientDashboardPage() {
  redirect('/patient/home');
}
