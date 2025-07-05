import { Button } from "@/components/ui/button";
import { Slide, ToastContainer } from "react-toastify";
import LoginManager from "./login/login-manager";

export default function Home() {
  return (
    <div className="flex bg-gray-100 items-start justify-center min-h-screen p-4 pb-20 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col justify-self-center items-center justify-center rounded-md border-2 p-10 md:max-w-3/4 lg:max-w-2/5">
        <div className="mb-8 text-3xl">Welcome to VolunteerHub!</div>
        <div className="text-center">
          VolunteerHub is a web application that connects volunteers with local
          non-profit organizations and community initiatives. Volunteers can
          browse volunteering opportunities, sign up for events, and track their
          contributions, while organizations can post opportunities, manage
          applicants, and communicate with volunteers.
        </div>
        <div className="flex justify-between w-3/5 mt-8">
          <LoginManager />
          <Button className="w-2/5">Sign up</Button>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        transition={Slide}
      />
    </div>
  );
}
