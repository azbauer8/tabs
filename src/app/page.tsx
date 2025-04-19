import { Hero } from "@/components/hero";
import { createServerClient } from "@/lib/supabase-clients";

export default async function Home() {
  const supabase = await createServerClient();
  const { data: authUser } = await supabase.auth.getUser();

  if (!authUser.user) {
    return <Hero />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-foreground">
        Welcome to My Website
      </h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          About Us
        </h2>
        <p className="mb-4 text-foreground/90">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui
          mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor
          neque eu tellus rhoncus ut eleifend nibh porttitor.
        </p>
        <p className="text-foreground/90">
          Ut in nulla enim. Phasellus molestie magna non est bibendum non
          venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit
          odio.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          Our Services
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="mb-2 text-xl font-medium text-card-foreground">
              Service 1
            </h3>
            <p className="text-card-foreground/90">
              Description of service 1 goes here. This is a brief overview of
              what we offer.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="mb-2 text-xl font-medium text-card-foreground">
              Service 2
            </h3>
            <p className="text-card-foreground/90">
              Description of service 2 goes here. This is a brief overview of
              what we offer.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="mb-2 text-xl font-medium text-card-foreground">
              Service 3
            </h3>
            <p className="text-card-foreground/90">
              Description of service 3 goes here. This is a brief overview of
              what we offer.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          Contact Us
        </h2>
        <p className="text-foreground/90">
          Get in touch with us at{" "}
          <a
            href="mailto:info@example.com"
            className="text-primary hover:underline"
          >
            info@example.com
          </a>{" "}
          or call us at{" "}
          <a href="tel:+1234567890" className="text-primary hover:underline">
            (123) 456-7890
          </a>
          .
        </p>
      </section>
    </div>
  );
}
