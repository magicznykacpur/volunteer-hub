"use server"

import { clearSession } from "@/lib/session";
import useUser from "@/lib/useUser";
import { redirect } from "next/navigation";
import Header from "./components/header";

export default async function Dashboard() {
  const user = await useUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user!}/>
    </div>
  );
}
