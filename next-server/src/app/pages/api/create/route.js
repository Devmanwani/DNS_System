// pages/api/post.js

import { NextResponse, NextRequest } from "next/server";

export async function POST(req){
  try {
    // Parse the JSON body from the incoming request
    const body = await req.json(req);
    
    // Replace 'http://example.com/api/endpoint' with the actual URL you want to send the POST request to
    const response = await fetch(`AWS_SERVER/api/dns/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // Send the parsed body as JSON
    });

    // Check if the response is successful
    if (response.ok) {
      // Parse the response JSON
      const responseData = await response.json();
      
      // Return the response data as the API response
      return NextResponse.json(responseData);
    } else {
      // If the response is not successful, throw an error
      throw new Error('Failed to fetch data from the external URL');
    }
  } catch (error) {
    console.error('Error:', error);
    // Return an error response if any error occurs
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
