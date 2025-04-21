"use client";

import { useState } from "react";
import Image from "next/image";
import { Music, Pencil, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tables } from "@/lib/supabase.types";
import { SpotifyLogo } from "@/components/spotify-logo";
import { EditTabDialog } from "@/components/tabs-list/edit-tab";

export function TabCard({ tab }: { tab: Tables<"Tabs"> }) {
  const [imageError, setImageError] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const formattedDate = new Date(tab.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="p-4 relative">
      <CardContent className="flex gap-3 p-0">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
          {!imageError ? (
            <Image
              src={tab.art_link ?? ""}
              alt={`${tab.title} by ${tab.artist}`}
              priority
              fill
              sizes="80px"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <Music className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-1 min-w-0">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base line-clamp-1">{tab.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {tab.artist}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Added {formattedDate}
              </p>
            </div>
          </div>
          <div className="flex gap-1 flex-col md:flex-row items-end md:items-start">
            <Button
              variant="outline"
              size="icon"
              className="h-full w-fit py-1 px-2 md:size-7"
              asChild
            >
              <a
                href={tab.spotify_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SpotifyLogo className="size-3.5 shrink-0" />
                <span className="md:hidden">Song</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-full w-fit py-1 px-2 md:size-7"
              asChild
            >
              <a href={tab.tab_link} target="_blank" rel="noopener noreferrer">
                <Play className="size-3.5 shrink-0" />
                <span className="md:hidden">Tab</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-full w-fit py-1 px-2 md:size-7"
              onClick={() => setEditDialogOpen(true)}
            >
              <Pencil className="size-4 shrink-0" />
              <span className="md:hidden">Edit</span>
            </Button>
          </div>
        </div>
      </CardContent>
      {editDialogOpen && (
        <EditTabDialog
          tab={tab}
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
        />
      )}
    </Card>
  );
}
