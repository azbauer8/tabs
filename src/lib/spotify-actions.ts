"use server";

import { spotifyClient } from "@/lib/spotify-client";

export async function getSpotifyInfoFromLink(link: string) {
  // const link =
  //   "https://open.spotify.com/track/4jc5rsFpWTMRE8VvcxwL9a?si=cd38773a5c8849a8";

  try {
    const songCode = link.split("/track/")[1].split("?")[0];
    const trackInfo = await spotifyClient.tracks.get(songCode);
    return trackInfo;
  } catch (error) {
    return null;
  }
}
