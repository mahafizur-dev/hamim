export async function GET(request: Request) {
  // For example, fetch data from your DB here
  const users = [
    { id: "LnG1108", name: "Hamim Kazi", email: "hamim.kazi@leverngear.com", role: "Admin", address: "badda did project, Dhaka", phone: "01793938010" }
   
  ];
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { name } = body;

  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), name };

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
