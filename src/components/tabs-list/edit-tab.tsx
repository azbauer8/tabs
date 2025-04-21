"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Wand2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSpotifyInfoFromLink } from "@/lib/spotify-actions";
import { deleteTab, editTab } from "@/lib/supabase-actions";
import { useState } from "react";
import { toast } from "sonner";
import { Tables } from "@/lib/supabase.types";

export const editTabFormSchema = z.object({
  songLink: z.string().url().min(1),
  tabLink: z.string().url().min(1),
  title: z.string().min(1),
  artist: z.string().min(1).optional(),
  artLink: z.string().url().optional(),
});

export function EditTabDialog({
  tab,
  open,
  setOpen,
}: {
  tab: Tables<"Tabs">;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [isEditingTab, setIsEditingTab] = useState(false);
  const [isDeletingTab, setIsDeletingTab] = useState(false);
  const [isDoingMagic, setIsDoingMagic] = useState(false);

  const form = useForm<z.infer<typeof editTabFormSchema>>({
    resolver: zodResolver(editTabFormSchema),
    defaultValues: {
      songLink: tab.spotify_link,
      tabLink: tab.tab_link,
      title: tab.title,
      artist: tab.artist ?? undefined,
      artLink: tab.art_link ?? undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof editTabFormSchema>) {
    setIsEditingTab(true);
    const result = await editTab(tab.id, values);
    setIsEditingTab(false);
    if (result?.error) {
      toast.error("Error editing tab: " + result.error.message);
      return;
    }
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogDescription className="sr-only">Edit Tab Info</DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <DialogHeader>
              <DialogTitle>Edit Tab</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="songLink"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>Song Link</FormLabel>
                      <div className="col-span-3 flex items-center gap-2">
                        <FormControl>
                          <Input
                            placeholder="https://open.spotify.com/track/..."
                            {...field}
                          />
                        </FormControl>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                className="size-fit p-2"
                                type="button"
                                disabled={isDoingMagic}
                                onClick={async () => {
                                  setIsDoingMagic(true);
                                  const link = field.value;
                                  const songData =
                                    await getSpotifyInfoFromLink(link);
                                  if (songData) {
                                    form.setValue("title", songData.name);
                                    form.setValue(
                                      "artist",
                                      songData.artists[0].name
                                    );
                                    form.setValue(
                                      "artLink",
                                      songData.album.images[0].url
                                    );
                                  }
                                  setIsDoingMagic(false);
                                }}
                              >
                                <Wand2Icon />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Autofill Song Info from Spotify
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tabLink"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>Tab Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://tabs.ultimate-guitar.com/tab/..."
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Never Gonna Give You Up"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="artist"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>Artist</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Rick Astley"
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="artLink"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>Art Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://i.scdn.co/image/..."
                          className="col-span-3"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="destructive"
                disabled={isDeletingTab || isEditingTab}
                onClick={async () => {
                  setIsDeletingTab(true);
                  const result = await deleteTab(tab.id);
                  setIsDeletingTab(false);
                  if (result?.error) {
                    toast.error("Error deleting tab: " + result.error.message);
                    return;
                  }
                  form.reset();
                  setOpen(false);
                }}
              >
                {isDeletingTab ? "Deleting Tab..." : "Delete Tab"}
              </Button>
              <Button type="submit" disabled={isDeletingTab || isEditingTab}>
                {isEditingTab ? "Editing Tab..." : "Edit Tab"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
