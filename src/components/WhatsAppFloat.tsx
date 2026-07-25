import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function MessengerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17V22l2.88-1.58c.9.25 1.85.38 2.98.38 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1.01 13.08-2.55-2.72-4.98 2.72 5.47-5.81 2.61 2.72 4.92-2.72-5.47 5.81z" />
    </svg>
  );
}

type FloatChatButtonProps = {
  href: string;
  label: string;
  ariaLabel: string;
  className: string;
  pulseClassName: string;
  children: ReactNode;
};

function FloatChatButton({
  href,
  label,
  ariaLabel,
  className,
  pulseClassName,
  children,
}: FloatChatButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full text-white shadow-lg transition-all duration-300 ease-out",
        "hover:w-[9.5rem] hover:justify-start hover:gap-2 hover:px-3.5 hover:shadow-xl hover:[animation:none]",
        "focus-visible:w-[9.5rem] focus-visible:justify-start focus-visible:gap-2 focus-visible:px-3.5 focus-visible:[animation:none]",
        pulseClassName,
        className,
      )}
    >
      <span className="relative z-10 flex size-5 shrink-0 items-center justify-center">
        {children}
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[7rem] group-hover:opacity-100 group-focus-visible:max-w-[7rem] group-focus-visible:opacity-100">
        {label}
      </span>
    </a>
  );
}

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3 lg:bottom-5 lg:right-5">
      <FloatChatButton
        href={siteConfig.messengerUrl}
        label="Messenger"
        ariaLabel="Chat on Messenger"
        className="bg-[#0084FF] hover:bg-[#0073e6]"
        pulseClassName="animate-chat-pulse-messenger"
      >
        <MessengerIcon className="size-5" />
      </FloatChatButton>

      <FloatChatButton
        href={getWhatsAppUrl()}
        label="WhatsApp"
        ariaLabel="Chat on WhatsApp"
        className="bg-[#25D366] hover:bg-[#20bd5a]"
        pulseClassName="animate-chat-pulse-whatsapp"
      >
        <MessageCircle className="size-5" />
      </FloatChatButton>
    </div>
  );
}
