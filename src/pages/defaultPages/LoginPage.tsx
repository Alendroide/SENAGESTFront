import LoginForm from "@/components/organisms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <img
        src="/logodark.png"
        alt="logoSenagest"
        className="h-20 pt-6 ps-6 sm:h-24"
      />
      <div className="absolute top-0 left-0 h-screen w-full xl:w-1/2 flex items-center justify-center">
        <LoginForm />
      </div>
      <div className="hidden absolute top-0 right-0 h-screen xl:w-1/2 xl:flex overflow-hidden bg-blue-900">
        <img
          src="/loginbackground.jpg"
          alt="loginbackground"
          className="w-full h-full object-cover object-center opacity-80"
        />
      </div>
    </div>
  );
}
