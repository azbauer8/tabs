"use server";

import { siteUrl } from "@/lib/utils";
import { createServerClient } from "@/lib/supabase-clients";
import { redirect } from "next/navigation";
import { addTabFormSchema } from "@/components/tabs-list/add-tab";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function logInAction() {
  const supabase = await createServerClient();

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "spotify",
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
}

export async function logOutAction() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  return redirect("/");
}

export async function addTab(formData: z.infer<typeof addTabFormSchema>) {
  const supabase = await createServerClient();
  const authUser = await supabase.auth.getUser();
  if (!authUser.data.user) return;
  const { data, error } = await supabase.from("Tabs").insert({
    creator: authUser.data.user.id,
    spotify_link: formData.songLink,
    tab_link: formData.tabLink,
    title: formData.title,
    artist: formData.artist,
    album: formData.album,
    release_year: formData.releaseYear
      ? parseInt(formData.releaseYear)
      : undefined,
    art_link: formData.artLink,
  });
  if (data) {
    revalidatePath("/", "layout");
  }
  return { data, error };
}
