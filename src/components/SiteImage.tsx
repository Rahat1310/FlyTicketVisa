import Image from "next/image";
import { cn } from "@/lib/utils";

type SiteImageProps = {
  /** Full image URL — paste from Cloudinary dashboard, Sanity, etc. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function SiteImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  sizes,
  priority,
}: SiteImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width!}
      height={height!}
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
