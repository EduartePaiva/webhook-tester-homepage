import { buttonVariants } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function CoolLink({ text }: { text: string }) {
    return (
        <div className="max-w-[650px] inline-block">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <a
                            href={text}
                            target="_blank"
                            className={cn(
                                buttonVariants({
                                    className:
                                        "max-w-[460px] md:max-w-none sm:max-w-[530px] focus-visible:ring-1  pointer-events-auto gap-1 overflow-hidden text-ellipsis rounded-lg border border-black/10 bg-white px-3 py-1.5 font-light text-gray-500 shadow-none hover:bg-gray-100 disabled:opacity-100",
                                }),
                            )}
                        >
                            <div className="line-clamp-1 flex flex-1 items-center gap-2 font-mono text-[13px]">
                                <span className="inline-block truncate">
                                    {text}
                                </span>
                            </div>
                        </a>
                    </TooltipTrigger>
                    <TooltipContent>Go to</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
