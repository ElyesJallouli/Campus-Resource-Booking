import { db } from "@/public/firebaseWebConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();

    const docRef = await addDoc(collection(db, "bookings"), {
      serviceId: body.serviceId,
      start: Timestamp.fromDate(new Date(body.start)),
      end: Timestamp.fromDate(new Date(body.end)),
      name: body.name,
      email: body.email,
      notes: body.notes,
      timezone: body.timezone,
      createdAt: Timestamp.now(),
      bookingType: body.bookingType || "",  // Added bookingType
      status: body.status || "pending",    // Added status, default to "pending" if missing
    });

    return new Response(JSON.stringify({ id: docRef.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("BOOKING ERROR:", error);
    return new Response("Booking failed", { status: 500 });
  }
}
