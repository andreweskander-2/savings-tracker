import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function Index() {
  return (
    <div className="min-h-screen">
      <main>
        <Section className="pt-32 md:pt-40">
          <div className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute left-[40%] top-[10%] h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute right-[30%] top-[20%] h-[20rem] w-[20rem] rounded-full bg-accent/10 blur-3xl" />
            </div>

            <Container className="pt-20 pb-16 md:pt-28 md:pb-24">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm mb-6 animate-fade-in">
                  <span className="text-primary font-medium">
                    Vite + React + Shadcn + Tailwind
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-muted-foreground">
                    Customize according to your needs
                  </span>
                </div>

                <Heading as="h1" size="xl" className="mb-6 animate-fade-in">
                  Create Your App With Just a Few Messages
                </Heading>

                <div className="flex items-center mb-8 gap-6">
                  <a
                    href="https://vitejs.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 filter transition-all hover:[filter:drop-shadow(0_0_2em_#646cffaa)]"
                  >
                    <img
                      src="https://layout.dev/assets/templates/vite.svg"
                      alt="Vite Logo"
                      className="h-16"
                    />
                  </a>
                  <a
                    href="https://react.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 filter transition-all hover:[filter:drop-shadow(0_0_2em_#646cffaa)]"
                  >
                    <img
                      src="https://layout.dev/assets/templates/react.svg"
                      alt="React Logo"
                      className="h-16"
                    />
                  </a>
                  <a
                    href="https://ui.shadcn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 filter transition-all hover:[filter:drop-shadow(0_0_2em_#646cffaa)]"
                  >
                    <img
                      src="https://layout.dev/assets/templates/shadcn.svg"
                      alt="Shadcn UI Logo"
                      className="h-16"
                    />
                  </a>
                  <a
                    href="https://tailwindcss.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-6 p-2 filter transition-all hover:[filter:drop-shadow(0_0_2em_#646cffaa)]"
                  >
                    <img
                      src="https://layout.dev/assets/templates/tailwindcss-mark.svg"
                      alt="Tailwind CSS Logo"
                      className="h-16"
                    />
                  </a>
                </div>

                <p className="text-xl text-muted-foreground mb-8 animate-fade-up">
                  This template is the starting point for your next app. Talk to{" "}
                  <b>Layout</b> to start building your app.
                </p>

                <Card className="flex flex-col sm:flex-row gap-4 animate-fade-up p-4 mb-8">
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-lg font-medium">
                      Example Shadcn Buttons
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button size="lg" className="gap-2 w-fit">
                        Regular Button
                      </Button>
                      <Button size="lg" variant="outline" className="w-fit">
                        Outline Button
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-sm text-muted-foreground">
                  Click on the Vite, React, Shadcn, and Tailwind logos to learn
                  more.
                </p>
              </div>
            </Container>
          </div>
        </Section>
      </main>
    </div>
  );
}

export default Index;

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
}

function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      {children}
    </section>
  );
}

function Heading({
  as: Component = "h2",
  size = "lg",
  children,
  className,
}: {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm";
  children: React.ReactNode;
  className?: string;
}) {
  const sizeClasses = {
    xl: "text-4xl sm:text-5xl lg:text-6xl font-extrabold",
    lg: "text-3xl sm:text-4xl font-bold",
    md: "text-2xl sm:text-3xl font-bold",
    sm: "text-xl sm:text-2xl font-semibold",
  };

  return (
    <Component className={cn(sizeClasses[size], className)}>
      {children}
    </Component>
  );
}
