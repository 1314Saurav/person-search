import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { searchUsers } from './actions/actions';
import DashboardTabs from './components/dashboard-tabs';

export default async function HomePage() {
  const session = await auth()

  if (!session) {
    redirect("/auth/signin")
  }

  // Load initial data on the server
  const initialUsers = await searchUsers('');

  return <DashboardTabs initialUsers={initialUsers} />;
}
