'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { Badge } from '@/components/ui/badge';
import { 
  UserPlus, 
  Upload, 
  Download, 
  Users, 
  Mail,
  Phone,
  Edit,
  Trash2,
  Search,
  Save,
  X,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addUser, updateUser, deleteUser } from '@/app/actions/actions';

interface User {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber: string;
}

interface ManagementViewProps {
  users: User[];
  onRefresh: () => void;
}

export function ManagementView({ users, onRefresh }: ManagementViewProps) {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });
  const [bulkImportMode, setBulkImportMode] = useState(false);
  const [bulkData, setBulkData] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();
  // const router = useRouter(); // Currently unused but may be needed for navigation

  const resetForm = () => {
    setFormData({ name: '', email: '', phoneNumber: '' });
    setIsAddingUser(false);
    setEditingUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form submitted with data:', formData);
    console.log('Current editing user:', editingUser);
    
    if (!formData.name || !formData.phoneNumber) {
      toast({
        title: "Error",
        description: "Name and phone number are required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      if (editingUser) {
        console.log('Updating user:', editingUser.id);
        await updateUser(editingUser.id, {
          name: formData.name,
          email: formData.email || undefined,
          phoneNumber: formData.phoneNumber
        });
        toast({
          title: "Success",
          description: "User updated successfully",
        });
      } else {
        console.log('Adding new user');
        const newUser = await addUser({
          name: formData.name,
          email: formData.email || undefined,
          phoneNumber: formData.phoneNumber
        });
        console.log('New user added:', newUser);
        toast({
          title: "Success",
          description: "User added successfully",
        });
      }
      resetForm();
      onRefresh();
    } catch (error) {
      console.error('Error saving user:', error);
      toast({
        title: "Error",
        description: "Failed to save user",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email || '',
      phoneNumber: user.phoneNumber
    });
    setIsAddingUser(true);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    setLoading(true);
    try {
      await deleteUser(userId);
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      onRefresh();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBulkImport = async () => {
    if (!bulkData.trim()) return;
    
    setLoading(true);
    try {
      const lines = bulkData.trim().split('\n');
      let successCount = 0;
      let errorCount = 0;

      for (const line of lines) {
        const [name, email, phoneNumber] = line.split(',').map(s => s.trim());
        if (name && phoneNumber) {
          try {
            await addUser({
              name,
              email: email || undefined,
              phoneNumber
            });
            successCount++;
          } catch {
            errorCount++;
          }
        }
      }

      toast({
        title: "Bulk Import Complete",
        description: `${successCount} users added, ${errorCount} errors`,
      });

      setBulkData('');
      setBulkImportMode(false);
      onRefresh();
    } catch {
      toast({
        title: "Error",
        description: "Bulk import failed",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const exportUsers = () => {
    const csv = [
      'Name,Email,Phone Number',
      ...users.map(user => `"${user.name}","${user.email || ''}","${user.phoneNumber}"`)
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users-export.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success",
      description: "Users exported successfully",
    });
  };

  const toggleUserSelection = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const selectAllUsers = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phoneNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Add, edit, and manage your people database</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={exportUsers}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => setBulkImportMode(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Bulk Import
          </Button>
          <Button onClick={() => {
            console.log('Add User button clicked - setting isAddingUser to true');
            console.log('Current isAddingUser state:', isAddingUser);
            setIsAddingUser(true);
            console.log('Button click complete');
          }}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">With Email</p>
                <p className="text-2xl font-bold">{users.filter(u => u.email).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Phone Only</p>
                <p className="text-2xl font-bold">{users.filter(u => !u.email).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Selected</p>
                <p className="text-2xl font-bold">{selectedUsers.size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit User Form */}
      {isAddingUser && (
        <Card>
          <CardHeader>
            <CardTitle>{editingUser ? 'Edit User' : 'Add New User'}</CardTitle>
            <CardDescription>
              {editingUser ? 'Update user information' : 'Enter details for the new user'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="04XX XXX XXX"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {editingUser ? 'Update User' : 'Add User'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Bulk Import */}
      {bulkImportMode && (
        <Card>
          <CardHeader>
            <CardTitle>Bulk Import Users</CardTitle>
            <CardDescription>
              Import multiple users from CSV format. Format: Name, Email, Phone Number (one per line)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={bulkData}
                onChange={(e) => setBulkData(e.target.value)}
                placeholder="John Doe, john@example.com, 0412345678&#10;Jane Smith, jane@example.com, 0423456789"
                rows={6}
              />
              <div className="flex items-center space-x-2">
                <Button onClick={handleBulkImport} disabled={loading || !bulkData.trim()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Users
                </Button>
                <Button variant="outline" onClick={() => setBulkImportMode(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No users found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search' : 'Add your first user to get started'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Select All */}
              <div className="flex items-center space-x-2 p-2 border-b">
                <input
                  type="checkbox"
                  checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                  onChange={selectAllUsers}
                  className="rounded"
                />
                <span className="text-sm font-medium">
                  Select All ({selectedUsers.size} selected)
                </span>
              </div>

              {/* User List */}
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="rounded"
                    />
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        {user.email && (
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{user.phoneNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={user.email ? "default" : "secondary"}>
                      {user.email ? 'Complete' : 'Phone Only'}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}