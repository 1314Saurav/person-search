'use client'

import { useState } from 'react';
import { addUser } from '@/app/actions/actions';

export default function TestAddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    
    console.log('=== TEST: Form submission started ===');
    console.log('Form data:', { name, email, phone });
    
    try {
      const newUser = await addUser({
        name: name,
        email: email || undefined,
        phoneNumber: phone
      });
      
      console.log('=== TEST: User added successfully ===', newUser);
      setResult(`SUCCESS: User added with ID: ${newUser.id}`);
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      
    } catch (error) {
      console.error('=== TEST: Error adding user ===', error);
      setResult(`ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    console.log('=== TEST: Button clicked ===');
    alert('Button clicked! Check console for logs.');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Test Add User</h1>
      
      <button 
        onClick={handleButtonClick}
        className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Button Click (Check Console)
      </button>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Phone *</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter phone"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? 'Adding User...' : 'Add User'}
        </button>
      </form>
      
      {result && (
        <div className={`mt-4 p-3 rounded ${result.startsWith('SUCCESS') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {result}
        </div>
      )}
    </div>
  );
}