"use client";

import { SpotifyLogo } from "@/components/spotify-logo";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function HeroLoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white"
      type="submit"
      disabled={pending}
    >
      <SpotifyLogo />
      {pending ? "Logging In..." : "Login with Spotify"}
    </Button>
  );
}
