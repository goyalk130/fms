"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session != null) {
      router.replace("/dashboard");
    } else {
      router.replace("/signin");
    }
  }, []);



  return <main></main>;
}
