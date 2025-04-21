import { AddTabDialog } from "@/components/tabs-list/add-tab";
import { TabCard } from "@/components/tabs-list/tab-card";
import { createServerClient } from "@/lib/supabase-clients";
import { User } from "@supabase/supabase-js";

export async function TabsList({ authUser }: { authUser: User }) {
  const supabase = await createServerClient();

  const { data: tabs } = await supabase
    .from("Tabs")
    .select()
    .eq("creator", authUser.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">My Tabs</h1>
        <AddTabDialog />
      </div>
      {tabs && tabs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tabs.map((tab) => (
            <TabCard key={tab.id} tab={tab} />
          ))}
        </div>
      ) : (
        <div>no tabs yet</div>
      )}
    </div>
  );
}
