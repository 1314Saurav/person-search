'use client'

import { Suspense, useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Users, Settings, Search } from 'lucide-react';
import DashboardView from './dashboard-view';
import { AnalyticsView } from './analytics-view';
import { ManagementView } from './management-view';
import UserSearch from './user-search';
import { searchUsers } from '../actions/actions';

interface User {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber: string;
}

interface DashboardTabsProps {
  initialUsers: User[];
}

export default function DashboardTabs({ initialUsers }: DashboardTabsProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleRefresh = useCallback(async () => {
    console.log('Refreshing user data...');
    try {
      const refreshedUsers = await searchUsers('');
      setUsers(refreshedUsers);
      console.log('User data refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PersonDash
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive user management and analytics platform
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Management</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Card>
              <CardContent className="p-6">
                <Suspense fallback={<div className="flex items-center justify-center p-8">Loading dashboard...</div>}>
                  <DashboardView />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-6">
                <Suspense fallback={<div className="flex items-center justify-center p-8">Loading analytics...</div>}>
                  <AnalyticsView />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management">
            <Card>
              <CardContent className="p-6">
                <Suspense fallback={<div className="flex items-center justify-center p-8">Loading management...</div>}>
                  <ManagementView 
                    users={users}
                    onRefresh={handleRefresh}
                  />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search">
            <Card>
              <CardContent className="p-6">
                <Suspense fallback={<div className="flex items-center justify-center p-8">Loading search...</div>}>
                  <UserSearch searchParams={Promise.resolve({})} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}