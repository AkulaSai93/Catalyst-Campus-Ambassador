import Hero from "@/components/hero/Hero";
import WhatYouDo from "@/components/sections/WhatYouDo";
import WhatYouGet from "@/components/sections/WhatYouGet";
import HowItWorks from "@/components/sections/HowItWorks";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatYouDo />
      <WhatYouGet />
      <HowItWorks />
    </main>
  );
}
