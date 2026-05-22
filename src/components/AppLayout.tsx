import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { BottomNav } from "./BottomNav";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <SiteHeader />
      <div className="flex-1 pt-16 pb-24 md:pb-0">{children}</div>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}