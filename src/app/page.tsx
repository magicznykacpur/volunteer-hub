import { Slide, ToastContainer } from "react-toastify";
import LoginManager from "./login/login-manager";
import SignupManager from "./sign-up/sign-up-manager";
import ThemeToggle from "@/components/theme/theme-toggle";

export default function Home() {
  return (
    <div className="flex items-start justify-center min-h-screen p-4 pb-20 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <div className="relative flex flex-col justify-self-center items-center justify-center rounded-md border-2 p-10 md:max-w-3/4 lg:max-w-2/5">
        <ThemeToggle className="absolute top-5 right-5" />
        <div className="mb-8 text-3xl text-center">
          Welcome to VolunteerHub!
        </div>
        <div className="text-center">
          VolunteerHub is a web application that connects volunteers with local
          non-profit organizations and community initiatives. Volunteers can
          browse volunteering opportunities, sign up for events, and track their
          contributions, while organizations can post opportunities, manage
          applicants, and communicate with volunteers.
        </div>
        <div className="flex justify-between w-3/5 mt-8">
          <LoginManager />
          <SignupManager />
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
