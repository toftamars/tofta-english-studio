import { Volume2 } from "lucide-react";
import { speak } from "../../lib/speech";
import { cn } from "../../lib/cn";

interface Props {
  text: string;
  rate?: number;
  className?: string;
  label?: string;
}

/** İngilizce metni sesli okutan buton (tarayıcı TTS). */
export function SpeakButton({ text, rate, className, label }: Props) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text, { rate });
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-sm font-medium text-cognac transition hover:bg-cognac hover:text-white",
        className,
      )}
      aria-label="Dinle"
    >
      <Volume2 size={15} />
      {label ?? "Dinle"}
    </button>
  );
}
