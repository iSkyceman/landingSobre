
import Image from "next/image";

export default function BackgroundAnimation() {
  return (
    <div
      className="absolute inset-0 w-full h-full z-0 pointer-events-none animate-fadein"
      style={{ overflow: "hidden" }}
      aria-hidden="true"
    >
      <Image
        src="/images/bloc8.webp"
        alt=""
        fill
        style={{ objectFit: "cover", opacity: 0.9 }}
        priority
        placeholder="blur"
        blurDataURL="/images/bloc8.png"
        sizes="100vw"
      />
      <style jsx global>{`
        @keyframes fadein {
          0% { opacity: 0.7; transform: scale(1.04) }
          100% { opacity: 1; transform: scale(1) }
        }
        .animate-fadein {
          animation: fadein 12s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
