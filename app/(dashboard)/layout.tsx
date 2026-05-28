import React from 'react';
import {cookies} from "next/headers";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
type props = {
    children: React.ReactNode;
}
const Layout =async ({children}:props) => {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get('sidebar-store')?.value  === "true";
    return (
         <SidebarProvider defaultOpen={defaultOpen} className={"h-svh"}>
             <DashboardSidebar/>
             <SidebarInset className={'min-h-0 min-w-0 '}>
                 <main className={"flex min-h-0 flx-1 flex-col"}>{children}</main>
             </SidebarInset>

         </SidebarProvider>
    );
};

export default Layout;