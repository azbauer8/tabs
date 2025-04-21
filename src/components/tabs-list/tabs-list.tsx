import { AddTabDialog } from "@/components/tabs-list/add-tab";
import { TabCard } from "@/components/tabs-list/tab-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerClient } from "@/lib/supabase-clients";
import { User } from "@supabase/supabase-js";
import { FrownIcon } from "lucide-react";

export async function TabsList({ authUser }: { authUser: User }) {
  const supabase = await createServerClient();

  const { data: tabs } = await supabase
    .from("Tabs")
    .select()
    .eq("creator", authUser.id)
    .order("created_at", { ascending: false });

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
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col gap-4 items-center text-lg">
              <FrownIcon className="size-12 text-muted-foreground" />
              No tabs found
            </CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
