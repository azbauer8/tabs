import { createServerClient } from "@/lib/supabase-clients";
import { User } from "@supabase/supabase-js";

export async function TabsList({ authUser }: { authUser: User }) {
  const supabase = await createServerClient();

  const { data: tabs } = await supabase
    .from("Tabs")
    .select()
    .eq("user_id", authUser.id);

  return (
    <div>
      <h1>My Tabs</h1>
      {tabs && tabs.length > 0 ? (
        <div>you've got tabs!</div>
      ) : (
        <div>no tabs yet</div>
      )}
    </div>
  );
}
