"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/user/context/AuthContext';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && !alerted.current) {
      alerted.current = true;
      alert("You need to log in to access this page.");
      router.push("/");
    }
  }, [loading, user, router]);

  // While loading, or if there's no user (and we are about to redirect),
  // show a loading indicator. This prevents the protected content from flashing.
  if (loading || !user) {
    return <p>Loading...</p>;
  }

  if (!user) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
}