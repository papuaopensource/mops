import { useState } from "react";
import { Facebook, Share2, Check, Link } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
  snippet?: string;
}

export default function ShareButtons({
  title,
  url,
  snippet,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${title} — Mop Papua\n${url}`);
  const tweetText = encodeURIComponent(
    `${title} — Mop Papua #MopPapua\n${url}`
  );

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
    x: `https://x.com/intent/tweet?text=${tweetText}`,
  };

  const openShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const btnClass =
    "inline-flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-800/50 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-neutral-600 hover:text-neutral-200";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1 text-xs text-neutral-500">
        <Share2 className="h-3.5 w-3.5" />
        Bagikan:
      </span>

      <button
        onClick={() => openShare(shareLinks.facebook)}
        className={btnClass}
        aria-label="Bagikan ke Facebook"
      >
        <Facebook className="h-3.5 w-3.5" />
        Facebook
      </button>

      <button
        onClick={() => openShare(shareLinks.whatsapp)}
        className={btnClass}
        aria-label="Bagikan ke WhatsApp"
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.999l6.305-1.654A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.206-1.487l-.373-.222-3.742.981.999-3.648-.243-.374A9.817 9.817 0 0 1 2.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z" />
        </svg>
        WhatsApp
      </button>

      <button
        onClick={() => openShare(shareLinks.x)}
        className={btnClass}
        aria-label="Bagikan ke X"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m4 4l11.733 16H20L8.267 4zm0 16l6.768-6.768m2.46-2.46L20 4"
          />
        </svg>
        Twitter
      </button>

      <button
        onClick={copyLink}
        className={btnClass}
        aria-label="Salin link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-green-500" />
            <span className="text-green-500">Tersalin!</span>
          </>
        ) : (
          <>
            <Link className="h-3.5 w-3.5" />
            Salin Link
          </>
        )}
      </button>
    </div>
  );
}
