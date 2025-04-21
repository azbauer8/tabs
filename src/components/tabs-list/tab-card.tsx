"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Music, Play } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tables } from "@/lib/supabase.types";
import { SpotifyLogo } from "@/components/spotify-logo";

export function TabCard({ tab }: { tab: Tables<"Tabs"> }) {
  const [imageError, setImageError] = useState(false);

  const formattedDate = new Date(tab.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <Card className="p-4">
      <CardContent className="flex gap-3 p-0">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
          {!imageError ? (
            <Image
              src={tab.art_link ?? ""}
              alt={`${tab.album} by ${tab.artist}`}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <Music className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Content - On the right */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <h3 className="font-bold text-base line-clamp-1">{tab.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {tab.artist}
            </p>

            <div className="flex items-center gap-1 mt-1 flex-wrap">
              <Badge
                variant="outline"
                className="text-xs px-1.5 py-0 line-clamp-1 max-w-44"
              >
                {tab.album}
              </Badge>
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                {tab.release_year}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">{formattedDate}</p>

            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-xs"
                asChild
              >
                <a
                  href={tab.spotify_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SpotifyLogo className="size-3.5" />
                  Spotify
                </a>
              </Button>
              <Button
                variant="default"
                size="sm"
                className="h-7 px-2 text-xs"
                asChild
              >
                <a
                  href={tab.tab_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play className="size-3.5" />
                  Tab
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
