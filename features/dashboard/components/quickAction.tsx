import React from 'react';
import {quickActions} from "@/features/dashboard/data/constanta";
import QuickActionCard from "@/features/dashboard/components/QuickActionCard";

function QuickAction() {
    return (
        <div className={"space-y-4"}>
            <h2 className={"text-lg font-semibold"}>
                Quick Actions
            </h2>
            <div className={"grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
                {quickActions.map((quickAction) => (
                    <QuickActionCard key={quickAction.title} title={quickAction.title} description={quickAction.description} gradient={quickAction.gradient} href={quickAction.href}/>
                ))}
            </div>
        </div>
    );
}

export default QuickAction;