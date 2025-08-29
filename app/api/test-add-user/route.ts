// app/api/test-add-user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { addUser } from '@/app/actions/actions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('API: Received request to add user:', body);
    
    const result = await addUser({
      name: body.name,
      email: body.email || undefined,
      phoneNumber: body.phoneNumber
    });
    
    console.log('API: User added successfully:', result);
    
    return NextResponse.json({ 
      success: true, 
      user: result,
      message: 'User added successfully' 
    });
  } catch (error) {
    console.error('API: Error adding user:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to add user' 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Test API endpoint for adding users. Use POST method.' 
  });
}