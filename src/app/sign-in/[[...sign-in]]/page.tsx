import { SignIn } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/auth";
import { redirect } from "next/navigation";

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
