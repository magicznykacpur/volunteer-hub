import useUser from "@/lib/hooks/useUser";
import Header from "./components/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await useUser()

  return (
    <div className="min-h-screen">
      <Header user={user!} />
      {children}
    </div>
  );
}
