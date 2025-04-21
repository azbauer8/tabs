"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusCircle, Wand2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSpotifyInfoFromLink } from "@/lib/spotify-actions";
import { addTab } from "@/lib/supabase-actions";
import { useState } from "react";
import { toast } from "sonner";

export const addTabFormSchema = z.object({
  songLink: z.string().url().min(1),
  tabLink: z.string().url().min(1),
  title: z.string().min(1),
  artist: z.string().min(1),
  album: z.string().optional(),
  releaseYear: z.string().refine(
    (v) => {
      let n = Number(v);
      return !isNaN(n) && v?.length > 0;
    },
    { message: "Invalid number" }
  ),
  artLink: z.string().url().optional(),
});

export function AddTabDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof addTabFormSchema>>({
    resolver: zodResolver(addTabFormSchema),
    defaultValues: {
      songLink: "",
      tabLink: "",
      title: "",
      artist: "",
      album: "",
      releaseYear: "",
      artLink: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addTabFormSchema>) {
    setIsSubmitting(true);
    const result = await addTab(values);
    setIsSubmitting(false);
    if (result?.error) {
      toast.error("Error adding tab: " + result.error.message);
      return;
    }
    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PlusCircle className="size-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <DialogHeader>
              <DialogTitle>Add Tab</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="songLink"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>
                        Song Link
                        <span className="text-red-400 text-base pl-1">*</span>
                      </FormLabel>
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
                                onClick={async () => {
                                  const link = field.value;
                                  const songData =
                                    await getSpotifyInfoFromLink(link);
                                  if (songData) {
                                    form.setValue("title", songData.name);
                                    form.setValue(
                                      "artist",
                                      songData.artists[0].name
                                    );
                                    form.setValue("album", songData.album.name);
                                    form.setValue(
                                      "releaseYear",
                                      songData.album.release_date.split("-")[0]
                                    );
                                    form.setValue(
                                      "artLink",
                                      songData.album.images[0].url
                                    );
                                  }
                                }}
                              >
                                <Wand2Icon />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Autofill Tab Info from Spotify
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
                      <FormLabel>
                        Tab Link
                        <span className="text-red-400 text-base pl-1">*</span>
                      </FormLabel>
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
                      <FormLabel>
                        Title
                        <span className="text-red-400 text-base pl-1">*</span>
                      </FormLabel>
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
                      <FormLabel>
                        Artist
                        <span className="text-red-400 text-base pl-1">*</span>
                      </FormLabel>
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
                name="album"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>Album</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Whenever You Need Somebody"
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
                name="releaseYear"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-2">
                      <FormLabel>Release Year</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1987"
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding Tab..." : "Add Tab"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
