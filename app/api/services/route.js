import { db } from "@/public/firebaseWebConfig";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  const snapshot = await getDocs(collection(db, "resources"));

  const services = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return new Response(JSON.stringify({ services }));
}
