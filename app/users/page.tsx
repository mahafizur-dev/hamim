// (Server Component)
type User = {
  id: string | number;
  name: string;
};

async function fetchUsers(): Promise<User[]> {
  const url = "http://localhost:3000/api/hamim";

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    // Surface HTTP errors with a helpful message
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }

  const data: unknown = await res.json();

  // Basic runtime validation — ensure we got an array of objects with a name
  if (!Array.isArray(data)) {
    throw new Error("Unexpected response shape: expected an array");
  }

  return data.map((item: unknown) => {
    if (item === null || typeof item !== "object") {
      return { id: "", name: "Unnamed" } as User;
    }

    const record = item as { [k: string]: unknown };

    return {
      id: record.id as string | number,
      name: typeof record.name === "string" ? record.name : String(record.name ?? "Unnamed"),
    } as User;
  });
}

export default async function UsersPage() {
  let users: User[] = [];
  let errorMessage: string | null = null;

  try {
    users = await fetchUsers();
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = String(err ?? "An unknown error occurred while fetching users.");
    }
    // Optionally log the error on the server
    // console.error(err);
  }

  return (
    <main>
      <h1>Users</h1>

      {errorMessage ? (
        <div role="alert" style={{ color: "#b00020" }}>
          <p>Error: {errorMessage}</p>
        </div>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
