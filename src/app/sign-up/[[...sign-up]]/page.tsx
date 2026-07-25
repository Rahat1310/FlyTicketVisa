import { redirect } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/auth";

export default function SignUpPage() {
  if (!isClerkConfigured()) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <SignUp />
    </div>
  );
}
