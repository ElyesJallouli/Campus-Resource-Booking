import { db } from "@/public/firebaseWebConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const serviceId = searchParams.get("serviceId");

  if (!date || !serviceId) {
    return new Response(JSON.stringify({ slots: [] }));
  }

  // Création des créneaux possibles (8h → 20h)
  const possibleSlots = [];
  for (let h = 8; h < 20; h++) {
    possibleSlots.push({
      start: `${date}T${String(h).padStart(2, "0")}:00:00`,
      end: `${date}T${String(h + 1).padStart(2, "0")}:00:00`
    });
  }

  // Récupère les réservations existantes
  const q = query(
    collection(db, "bookings"),
    where("resourceId", "==", serviceId)
  );

  const snapshot = await getDocs(q);

  const bookedSlots = snapshot.docs.map(doc => doc.data().start);

  const availableSlots = possibleSlots.filter(
    slot => !bookedSlots.includes(slot.start)
  );

  return new Response(JSON.stringify({ slots: availableSlots }), {
    headers: { "Content-Type": "application/json" }
  });
}
