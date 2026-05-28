import React from 'react';
import {cn} from "@/lib/utils";
import {QuickAction} from "@/features/dashboard/data/constanta";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
type QuickActionProps = QuickAction;
function QuickActionCard({title,description,gradient,href}:QuickActionProps) {
    return (
        <div className={"flex gap-4 border bg-card p-3"}>
            <div className={cn("relative h-31 w-41 shrink-0 overflow-hidden rounded-xl bg-linear-to-br", gradient)}>
                <div className={"absolute inset-0 flex items-center justify-center"}>
                    <div className={"size-12 rounded-full  bg-white/30 "}/>
                </div>
                <div className={"absolute inset-2 rounded-lg ring-2 ring-inset ring-white/20"} />

            </div>
            <div className={"flex flex-col justify-between py-1"}>
                <div className={"space-y-1"}>
                    <h3 className={"text-sm font-medium"}>
                        {title}
                    </h3>
                    <p className={"text-xs text-muted-foreground leading-relaxed"}>
                        {description}
                    </p>


                </div>
                <Button className={'w-fit'} size={'xs'} variant={'outline'} asChild={true}>
                    <Link href={href}>
                        Try now
                        <ArrowRight className={"size-3"}/>
                    </Link>
                </Button>

            </div>

        </div>
    );
}

export default QuickActionCard;