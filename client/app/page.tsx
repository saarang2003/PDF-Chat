"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import Landing from "./components/Landing";
import Header from "./components/Header";


export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/chat");
    }
  }, [isSignedIn, router]);

  return (
    <div>
      <Header/>
      <Landing />
    </div>
  );
}