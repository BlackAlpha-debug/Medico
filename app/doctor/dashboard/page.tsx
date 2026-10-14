import { redirect } from 'next/navigation';

export default function LegacyDoctorDashboard() {
  redirect('/doctor/home');
}
