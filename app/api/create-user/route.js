import { createUser, setUserRole } from '@/firebase/snippets/backend-functions.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, role } = body;

    if (!email || !password || !firstName || !lastName || !role) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    const userRecord = await createUser({
      email,
      password,
      firstName,
      lastName,
      role
    });

    console.log("Role to set:", role, "Type:", typeof role);
     // 2. Set custom claim with the role
    await setUserRole(userRecord.uid, role );

    return new Response(
      JSON.stringify({ uid: userRecord.uid }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}