import React from 'react';
import PageHeader from "@/components/pageHeader";
import HeroSection from "@/features/dashboard/components/HeroSection";
import DashboardHeader from "@/features/dashboard/components/Dashboard Header";
import TextSection from "@/features/dashboard/components/TextSection";
import QuickAction from "@/features/dashboard/components/quickAction";

const DashboardView = () => {
    return (
        <div className={"relative"}>
            <PageHeader  title="Dashboard" className={"lg:hidden"} />
            <HeroSection/>
            <div className={"relative space-y-8 lg:p-16"}>
                <DashboardHeader/>
                <TextSection/>
                <QuickAction/>
            </div>
        </div>
    );
};

export default DashboardView;