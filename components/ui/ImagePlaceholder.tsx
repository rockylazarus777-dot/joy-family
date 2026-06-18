type ImagePlaceholderProps = {
  label: string;
  ratio?: "16:9" | "4:5" | "1:1" | "3:2" | "4:3";
  className?: string;
};

const ratioClasses: Record<string, string> = {
  "16:9": "aspect-video",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
  "3:2": "aspect-[3/2]",
  "4:3": "aspect-[4/3]",
};

export default function ImagePlaceholder({ label, ratio = "16:9", className = "" }: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-sectionBg text-center text-sm font-medium text-textSecondary ${ratioClasses[ratio]} ${className}`}
    >
      <span className="px-4">[ {label} ]</span>
    </div>
  );
}
