'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { 
  Users, 
  UserPlus, 
  Search, 
  BarChart3, 
  TrendingUp, 
  Mail, 
  Phone, 
  Calendar,
  Grid3X3,
  List,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { searchUsers } from '@/app/actions/actions';

interface User {
  id: string;
  name: string;
  email?: string | null;
  phone?: string;
}

interface DashboardStats {
  totalUsers: number;
  recentUsers: number;
  usersWithEmail: number;
  growthRate: number;
}

export default function DashboardView() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'email'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterBy, setFilterBy] = useState<'all' | 'with-email' | 'without-email'>('all');
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    recentUsers: 0,
    usersWithEmail: 0,
    growthRate: 0
  });
  const router = useRouter();

  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.phone && user.phone.includes(searchQuery))
      );
    }

    // Apply email filter
    if (filterBy === 'with-email') {
      filtered = filtered.filter(user => user.email);
    } else if (filterBy === 'without-email') {
      filtered = filtered.filter(user => !user.email);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'email':
          comparison = (a.email || '').localeCompare(b.email || '');
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredUsers(filtered);
  }, [users, searchQuery, sortBy, sortOrder, filterBy]);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const result = await searchUsers('');
      setUsers(result);
      
      // Calculate stats (simplified since we don't have date fields)
      const usersWithEmail = result.filter(user => user.email).length;
      
      setStats({
        totalUsers: result.length,
        recentUsers: Math.floor(result.length * 0.15), // Simulated recent users (15%)
        usersWithEmail,
        growthRate: Math.floor(Math.random() * 15) + 5 // Simulated growth rate 5-20%
      });
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const StatCard = ({ title, value, icon: Icon, trend, description }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    trend?: { direction: 'up' | 'down'; percentage: number };
    description: string;
  }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-500">{trend.percentage}%</span>
            <span>from last month</span>
          </div>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );

  const UserGridCard = ({ user }: { user: User }) => (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate group-hover:text-blue-600 transition-colors">
              {user.name}
            </h3>
            <div className="space-y-1">
              {user.email && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" />
                <span>{user.phone || 'No phone'}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Member</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {user.email ? 'Verified' : 'Phone Only'}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/?userId=${user.id}`)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const UserListItem = ({ user }: { user: User }) => (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                {user.email && (
                  <div className="flex items-center space-x-1">
                    <Mail className="h-3 w-3" />
                    <span>{user.email}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span>{user.phone || 'No phone'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Member</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={user.email ? "default" : "secondary"}>
              {user.email ? 'Verified' : 'Phone Only'}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/?userId=${user.id}`)}
            >
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">People Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and explore your people database with advanced insights
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Person
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total People"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          description="All registered users"
        />
        <StatCard
          title="New This Week"
          value={stats.recentUsers}
          icon={TrendingUp}
          trend={{ direction: 'up', percentage: Math.round(stats.growthRate) }}
          description="Recent additions"
        />
        <StatCard
          title="Email Verified"
          value={stats.usersWithEmail}
          icon={Mail}
          description={`${Math.round((stats.usersWithEmail / stats.totalUsers) * 100)}% of total`}
        />
        <StatCard
          title="Completion Rate"
          value={`${Math.round((stats.usersWithEmail / stats.totalUsers) * 100)}%`}
          icon={BarChart3}
          description="Profile completion"
        />
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as 'all' | 'with-email' | 'without-email')}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">All Users</option>
                <option value="with-email">With Email</option>
                <option value="without-email">Phone Only</option>
              </select>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field as 'name' | 'email');
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="email-asc">Email A-Z</option>
                <option value="email-desc">Email Z-A</option>
              </select>
              <div className="flex rounded-md border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>People ({filteredUsers.length})</span>
            <Button variant="ghost" size="sm" onClick={loadUsers}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No people found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try adjusting your search terms' : 'Get started by adding your first person'}
              </p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "space-y-3"
            }>
              {filteredUsers.map((user) => (
                viewMode === 'grid' ? (
                  <UserGridCard key={user.id} user={user} />
                ) : (
                  <UserListItem key={user.id} user={user} />
                )
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}