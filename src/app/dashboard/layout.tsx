import useUser from "@/lib/useUser";
import Header from "./components/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await useUser()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user!} />
      {children}
    </div>
  );
}
