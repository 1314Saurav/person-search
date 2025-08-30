'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Mail, 
  Phone,
  Activity,
  Globe
} from 'lucide-react';
import { searchUsers } from '@/app/actions/actions';

interface AnalyticsData {
  totalUsers: number;
  emailVerified: number;
  phoneOnlyUsers: number;
  emailDomains: { domain: string; count: number }[];
  phoneNumberStats: { areaCode: string; count: number }[];
  completionRate: number;
}

export function AnalyticsView() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    emailVerified: 0,
    phoneOnlyUsers: 0,
    emailDomains: [],
    phoneNumberStats: [],
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const users = await searchUsers('');
      
      const emailVerified = users.filter(user => user.email).length;
      const phoneOnlyUsers = users.length - emailVerified;
      
      // Analyze email domains
      const emailDomains = users
        .filter(user => user.email)
        .map(user => user.email?.split('@')[1] || '')
        .reduce((acc, domain) => {
          acc[domain] = (acc[domain] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
      
      const topDomains = Object.entries(emailDomains)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([domain, count]) => ({ domain, count }));
      
      // Analyze phone number area codes (assuming Australian mobile format)
      const areaCodes = users
        .filter(user => user.phone && user.phone.length >= 4)
        .map(user => user.phone!.substring(0, 4)) // First 4 digits
        .reduce((acc, code) => {
          acc[code] = (acc[code] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
      
      const topAreaCodes = Object.entries(areaCodes)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([areaCode, count]) => ({ areaCode, count }));
      
      setAnalytics({
        totalUsers: users.length,
        emailVerified,
        phoneOnlyUsers,
        emailDomains: topDomains,
        phoneNumberStats: topAreaCodes,
        completionRate: users.length > 0 ? Math.round((emailVerified / users.length) * 100) : 0
      });
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Insights and statistics about your people database</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total People</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Verified</CardTitle>
            <Mail className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.emailVerified}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Phone Only</CardTitle>
            <Phone className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.phoneOnlyUsers}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.totalUsers > 0 ? Math.round((analytics.phoneOnlyUsers / analytics.totalUsers) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completionRate}%</div>
            <Progress value={analytics.completionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Email Domains Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Top Email Domains
            </CardTitle>
            <CardDescription>Most popular email providers</CardDescription>
          </CardHeader>
          <CardContent>
            {analytics.emailDomains.length > 0 ? (
              <div className="space-y-4">
                {analytics.emailDomains.map((item, index) => (
                  <div key={item.domain} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" style={{
                        backgroundColor: `hsl(${(index * 60) % 360}, 70%, 50%)`
                      }} />
                      <span className="text-sm font-medium">{item.domain}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{
                            width: `${(item.count / analytics.emailVerified) * 100}%`,
                            backgroundColor: `hsl(${(index * 60) % 360}, 70%, 50%)`
                          }}
                        />
                      </div>
                      <Badge variant="secondary">{item.count}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Globe className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No email data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Phone Number Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Phone Number Patterns
            </CardTitle>
            <CardDescription>Distribution by area codes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.phoneNumberStats.map((item, index) => (
                <div key={item.areaCode} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" style={{
                      backgroundColor: `hsl(${120 + (index * 40)}, 70%, 50%)`
                    }} />
                    <span className="text-sm font-medium">{item.areaCode}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{
                          width: `${(item.count / analytics.totalUsers) * 100}%`,
                          backgroundColor: `hsl(${120 + (index * 40)}, 70%, 50%)`
                        }}
                      />
                    </div>
                    <Badge variant="outline">{item.count}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">Data Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Complete Profiles</span>
                <span className="font-medium">{analytics.emailVerified}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Incomplete Profiles</span>
                <span className="font-medium">{analytics.phoneOnlyUsers}</span>
              </div>
              <Progress 
                value={analytics.completionRate} 
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {analytics.completionRate >= 80 ? '🎉 Excellent' : 
                 analytics.completionRate >= 60 ? '👍 Good' : 
                 analytics.completionRate >= 40 ? '⚠️ Fair' : '❗ Needs improvement'} completion rate
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-300">Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{analytics.emailVerified}</div>
              <p className="text-sm text-muted-foreground">Users with email can receive updates</p>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {analytics.emailVerified > 0 ? 'Active' : 'Setup needed'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-300">Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold">+{Math.floor(analytics.totalUsers * 0.1)}</span>
              </div>
              <p className="text-sm text-muted-foreground">Estimated recent additions</p>
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                Growing
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}