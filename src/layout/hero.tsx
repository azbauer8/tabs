import { HeroLoginButton } from "@/layout/hero-login-button";
import { logInAction } from "@/lib/supabase-actions";

export function Hero() {
  return (
    <div>
      <div className="container mx-auto px-4 py-5 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Tabs
          </h1>
        </div>
        <div className="mx-auto mt-2 max-w-3xl text-center">
          <p className="text-muted-foreground text-xl">
            A dashboard to collect and categorize guitar tabs
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <form action={logInAction}>
            <HeroLoginButton />
          </form>
        </div>
      </div>
    </div>
  );
}
