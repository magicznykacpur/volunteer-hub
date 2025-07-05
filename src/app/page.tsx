import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex bg-black items-start justify-center text-white min-h-screen p-4 pb-20 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col justify-self-center items-center justify-center rounded-md border-accent border-1 p-10 md:max-w-3/4 lg:max-w-3/5">
        <div className="mb-8 text-3xl">Welcome to VolunteerHub!</div>
        <div className="text-center">
          VolunteerHub is a web application that connects volunteers with local
          non-profit organizations and community initiatives. Volunteers can
          browse volunteering opportunities, sign up for events, and track their
          contributions, while organizations can post opportunities, manage
          applicants, and communicate with volunteers.
        </div>
        <div className="flex justify-between w-3/5 mt-8">
          <Button variant="secondary" className="w-2/5">
            Log in
          </Button>
          <Button variant="secondary" className="w-2/5">
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
