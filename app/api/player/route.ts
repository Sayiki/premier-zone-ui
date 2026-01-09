// API proxy route to avoid CORS issues
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const team = searchParams.get('team');
  const nation = searchParams.get('nation');
  const position = searchParams.get('position');

  // Build the query string
  const params = new URLSearchParams();
  if (team) params.append('team', team);
  if (nation) params.append('nation', nation);
  if (position) params.append('position', position);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/player?${params.toString()}`;
  console.log('Fetching from:', url);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      console.error('Backend returned error:', res.status, res.statusText);
      return NextResponse.json({ error: `Backend error: ${res.status}` }, { status: res.status });
    }
    
    const data = await res.json();
    console.log('Received data:', data?.length || 0, 'players');
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to connect to backend. Is the Spring Boot server running on port 8081?' }, { status: 500 });
  }
}
