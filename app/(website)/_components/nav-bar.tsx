import React from 'react';
import Link from 'next/link';
import {
    CalendarCheck,
    Castle,
    Home,
    MessageSquareHeart,
    Package,
    Settings,
} from 'lucide-react';

const NavBar = () => {
    return (
        <section className="md:w-72 bg-muted/40 md:border-r hidden md:flex flex-col">
            <div className="flex-1 overflow-y-auto">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <Home className="h-4 w-4" />
                        DashBoard
                    </Link>
                    <Link href="/activities" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                        <Castle className="h-4 w-4" />
                        Activities
                    </Link>
                    <Link href="/schedule" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                        <CalendarCheck className="h-4 w-4" />
                        Schedule
                    </Link>
                    <Link href="/logs" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                        <MessageSquareHeart className="h-4 w-4" />
                        Logs
                    </Link>
                    <Link href="/profile" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                        <Package className="h-4 w-4" />
                        Profile
                    </Link>
                </nav>
            </div>
            <div className="mt-auto p-4">
                <div>
                    <Link href="/settings" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                        <Settings className="h-4 w-4" />
                        Setting
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NavBar;


