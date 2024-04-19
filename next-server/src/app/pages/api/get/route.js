"use server"

import { NextResponse } from "next/server";

export async function GET(){
  try {
    const timestamp = Date.now();
const response = await fetch(`AWS_SERVER/api/dns?timestamp=${timestamp}`,{
  headers: {
    'Cache-Control': 'no-cache', // Add cache-control header to prevent caching
  },
  cache: 'no-store'
});


    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    
  }
 
}

