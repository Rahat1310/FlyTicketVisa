import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/auth";

export default function SignInPage() {
  if (!isClerkConfigured()) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <SignIn />
    </div>
  );
}
