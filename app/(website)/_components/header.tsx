
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import {
  Castle,
  Home,
  Menu,
  MessageSquareHeart,
  Package,
  CalendarCheck,
  Settings
} from "lucide-react";
import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span className="sr-only">My Family</span>
            </Link>
            <Link
              href="/dashboard"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/activities"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground"
            >
              <Castle className="h-5 w-5" />
              Activities
            </Link>
            <Link
              href="/schedule"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <CalendarCheck className="h-5 w-5" />
              Schedule
            </Link>
            <Link
              href="/logs"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <MessageSquareHeart className="h-5 w-5" />
              Logs
            </Link>
            <Link
              href="/profile"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Profile
            </Link>
          </nav>

          <div className="mt-auto p-4">
                <div>
                    <Link href="/settings" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground transition-all ">
                        <Settings className="h-4 w-4" />
                        Setting
                    </Link>
                </div>
            </div>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        <h1>My Family Dashboard</h1>
      </div>
      <Button variant="secondary" size="icon" className="rounded-full">
        <UserButton />
      </Button>
    </header>
  );
};

export default Header;
