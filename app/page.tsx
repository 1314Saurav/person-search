import { searchUsers } from './actions/actions';
import DashboardTabs from './components/dashboard-tabs';

export default async function HomePage() {
  // Load initial data on the server
  const initialUsers = await searchUsers('');

  return <DashboardTabs initialUsers={initialUsers} />;
}
