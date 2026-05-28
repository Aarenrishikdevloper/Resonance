import React from 'react';
import {cn} from "@/lib/utils";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Headphones, ThumbsUp} from "lucide-react";

function PageHeader({title, className}:{ title: string ,className: string }) {
    return (
        <div className={cn("flex items-center justify-between border-b px-e py-4", className)}>
            <div className={"flex items-center gap-2"}>
                 <SidebarTrigger/>
                <h1 className={"text-xl font-semibold tracking-tighter "}>
                    {title}
                </h1>

            </div>
            <div className={"flex items-center gap-3"}>
                <Button variant={"outline"} size={'sm'} asChild={true} >
                    <Link href={"mailto:kashyaprishik@gmail.com"}>
                        <ThumbsUp />
                        <span className={"hidden lg:block"}>Feedback</span>
                    </Link>

                </Button>
                <Button variant={"outline"} size={'sm'} asChild={true} >
                    <Link href={"mailto:kashyaprishik@gmail.com"}>
                        <Headphones />
                        <span className={"hidden lg:block"}>Need help?</span>
                    </Link>

                </Button>

            </div>
        </div>
    );
}

export default PageHeader;