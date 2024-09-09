import { Button } from "@/components/ui/button";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CopyToClipBoard({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="flex items-center gap-2 max-w-[650px]">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={handleCopy}
                            className="transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring pointer-events-auto flex-1 items-center gap-1 overflow-hidden text-ellipsis rounded-lg border border-black/10 bg-white px-3 py-1.5 font-light text-gray-500 shadow-none hover:bg-gray-100 disabled:opacity-100"
                        >
                            <div className="line-clamp-1 flex flex-1 items-center gap-2 font-mono text-[13px]">
                                <span className="inline-block truncate">
                                    {text}
                                </span>
                            </div>
                            {copied ? (
                                <Check size={16} />
                            ) : (
                                <Clipboard size={16} />
                            )}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy to clipboard</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}