import { Hero } from "@/layout/hero";
import { TabsList } from "@/components/tabs-list/tabs-list";
import { createServerClient } from "@/lib/supabase-clients";
import { connection } from "next/server";

export const revalidate = 0;

export default async function Home() {
  await connection();

  const supabase = await createServerClient();
  const { data: authUser } = await supabase.auth.getUser();

  if (!authUser.user) {
    return <Hero />;
  }

  return <TabsList authUser={authUser.user} />;
}
