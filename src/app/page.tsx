import Hero from "@/components/hero/Hero";
import SignupDialog from "@/components/hero/SignupDialog";
import WhatYouDo from "@/components/sections/WhatYouDo";
import WhatYouGet from "@/components/sections/WhatYouGet";
import HowItWorks from "@/components/sections/HowItWorks";
import WhatYoureBringing from "@/components/sections/WhatYoureBringing";
import WhoCanApply from "@/components/sections/WhoCanApply";
import Faqs from "@/components/sections/Faqs";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";
import Animations from "@/components/Animations";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <WhatYouDo />
        <WhatYouGet />
        <HowItWorks />
        <WhatYoureBringing />
        <WhoCanApply />
        <Faqs />
        <FinalCta />
      </main>
      <Footer />
      <SignupDialog />
      <Animations />
    </>
  );
}
