"use server";

import { spotifyClient } from "@/lib/spotify-client";

export async function getSpotifyInfoFromLink(link: string) {
  try {
    const songCode = link.split("/track/")[1].split("?")[0];
    const trackInfo = await spotifyClient.tracks.get(songCode);
    return trackInfo;
  } catch (error) {
    return null;
  }
}
