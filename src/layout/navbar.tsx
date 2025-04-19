import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { signInAction, signOutAction } from "@/lib/supabase-actions";
import { createServerClient } from "@/lib/supabase-clients";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronsUpDownIcon,
  SparklesIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  BellIcon,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-sidebar/75 backdrop-blur-md">
      <div className="container mx-auto flex py-2 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-foreground">
          Tabs
        </Link>

        <div className="items-center gap-2 flex">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

async function UserMenu() {
  const supabase = await createServerClient();
  const authUser = await supabase.auth.getUser();

  if (!authUser.data.user) {
    return (
      <form action={signInAction}>
        <Button size="sm" variant="outline" type="submit">
          Log In
        </Button>
      </form>
    );
  }

  const avatar = authUser.data.user?.user_metadata["avatar_url"];
  const fullName = authUser.data.user?.user_metadata["full_name"];
  const initials = fullName
    ?.split(" ")
    .map((name: string) => name[0])
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="size-8 border-none p-0">
          <Avatar className="rounded-md outline outline-border">
            <AvatarImage src={avatar} alt={fullName} />
            <AvatarFallback className="rounded-md">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar>
              <AvatarImage src={avatar} alt={fullName} />
              <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{fullName}</span>
              <span className="text-muted-foreground truncate text-xs">
                {authUser.data.user?.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <DropdownMenuItem className="gap-2 w-full" asChild>
            <button type="submit">
              <LogOut className="size-4" />
              Sign Out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
