import { NextRequest, NextResponse } from "next/server";

export async function PUT(req) {
  try {
    // Access URL parameters from req.query
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const domain = searchParams.get("domain");
    const data = await req.json();
    const type = data.type;
    const value = data.value;
    

    // Validate parameters (optional)
    console.log(domain);

    // Construct the external API request URL with parameters
    const external_link = `AWS_SERVER/api/dns/update/${domain}`;

    // Perform the PUT request (no need for body if data is in URL)
    const response = await fetch(external_link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Might be required by the external API (check documentation)
      },
      body: JSON.stringify({ // Assuming external API expects data in request bod
        type,
        value,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(responseData); // Return successfully parsed JSON
    } else {
      throw new Error(`Failed to update DNS record: ${await response.text()}`); // Handle non-2xx responses
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 }); // Handle errors gracefully
  }
}
