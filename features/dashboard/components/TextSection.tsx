'use client'
import React, {useState} from 'react';
import {Textarea} from "@/components/ui/textarea";
import {COST_PER_UNIT, TEXT_MAX_LENGTH} from "@/features/text-to-speech/data/constants";
import {Badge} from "@/components/ui/badge";
import {Coins} from "lucide-react";
import {Button} from "@/components/ui/button";

function TextSection() {
    const [text, setText] = useState("")
    return (
        <div className={"rounded-[22px] bg-linear-180  from-[#ff8ee3] from-15%  via-[#57d7e0]  via-39% to-[#dbf1f2]  to-85% p-0.5 shadow-[0_0_0_04px_white]"}>
            <div className={"rounded-[120px] bg-[#F9F9F9] p-1"}>
                <div className={"space-y-4 rounded-2xl bg-white p-4  drop-shadow-xs"}>
                    <Textarea
                        placeholder={"Start typing or paste your text here..."}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        maxLength={TEXT_MAX_LENGTH}
                        className={"min-h-35 resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"}
                    />
                    <div className={"flex items-center justify-between"}>
                        <Badge variant={"outline"} className={"gap-1.5 border-dashed"}>
                            <Coins className={"size-3 text-chart-5"}/>
                            <span className={"text-xs"}>
                                {text.length === 0 ?(
                                    "Start Typing to estimate"
                                ):(
                                    <React.Fragment>
                                         <span className={"tabular-nums"}>
                                        ${(text.length * COST_PER_UNIT).toFixed(4)}

                                    </span>{" "}  estimated

                                    </React.Fragment>

                                )}

                            </span>

                        </Badge>
                        <span className={"text-xs text-muted-foreground"}>
                            {text.length.toLocaleString()} /{TEXT_MAX_LENGTH.toLocaleString()}
                            characters
                        </span>

                    </div>

                </div>
                <div className={"flex items-center justify-end p-3"}>
                     <Button  size={"sm"} disabled={!text.trim()} className={"w-full lg:w-auto"}>
                         Generate Speech
                     </Button>
                </div>
            </div>

        </div>
    );
}

export default TextSection;