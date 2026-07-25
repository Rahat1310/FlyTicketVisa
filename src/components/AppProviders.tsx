import { ClerkProvider } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/auth";

export function AppProviders({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured()) {
    return children;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
