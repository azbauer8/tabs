"use server";

import { siteUrl } from "@/lib/utils";
import { createServerClient } from "@/lib/supabase-clients";
import { redirect } from "next/navigation";

export async function logInAction() {
  const supabase = await createServerClient();

  console.log(
    "Logging in with Spotify, passing redirectTo:",
    `${siteUrl}/auth/callback`
  );

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "spotify",
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (data.url) {
    console.log("Redirecting to:", data.url);
    redirect(data.url);
  }
}

export async function logOutAction() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  return redirect("/");
}
