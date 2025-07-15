import { Slide, ToastContainer } from "react-toastify";

export default async function Profile() {
  return (
    <div className="min-h-80% flex flex-col justify-center items-center p-6">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        transition={Slide}
      />
    </div>
  );
}
