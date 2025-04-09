import RegisterForm from "@/components/auth/RegisterForm";
import SocialLogin from "@/components/auth/SocialLogin";

export default function RegisterPage() {
  return (
    <div className="max-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>
        <RegisterForm />
        <div className="divider"></div>
        <SocialLogin />
      </div>
    </div>
  );
}
