import { Hero } from "@/layout/hero";
import { TabsList } from "@/components/tabs-list/tabs-list";
import { createServerClient } from "@/lib/supabase-clients";

export const revalidate = 0;

export default async function Home() {
  const supabase = await createServerClient();
  const { data: authUser } = await supabase.auth.getUser();

  if (!authUser.user) {
    return <Hero />;
  }

  return <TabsList authUser={authUser.user} />;
}
