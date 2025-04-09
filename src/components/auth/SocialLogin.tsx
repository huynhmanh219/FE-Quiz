import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const SocialLogin = () => {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <Button
        className="flex items-center justify-center gap-2 p-2 w-full rounded-md border border-gray-300 hover:to-blue-400 transition-all bg-white text-gray-700"
      >
        <FcGoogle size={20} />
        <span>Tiếp tục với Google</span>
      </Button>

    </div>
  );
};
export default SocialLogin