"use client";

import { SpotifyLogo } from "@/components/spotify-logo";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button size="sm" variant="outline" type="submit" disabled={pending}>
      <SpotifyLogo className="size-4" />
      {pending ? "Logging In..." : "Log In"}
    </Button>
  );
}
