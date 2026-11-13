import Image from "next/image";

const PREVIOUSLY = [
  { name: "PhysicsWallah", src: "/logos/PhysicsWallah.png", w: 177, h: 177, cls: "h-6" },
  { name: "LinkedIn", src: "/logos/Linkedin.png", w: 715, h: 177, cls: "h-[18px]" },
  { name: "Walmart", src: "/logos/Walmart.png", w: 727, h: 177, cls: "h-[18px]" },
  { name: "Oracle", src: "/logos/Oracle.png", w: 1299, h: 177, cls: "h-3" },
  { name: "PayPal", src: "/logos/Paypal.png", w: 713, h: 177, cls: "h-[18px]" },
];

function Num({ n }: { n: string }) {
  return <span className="text-[13px] font-medium text-brand tabular-nums">{n}</span>;
}

export default function WhatYouDo() {
  return (
    <section id="what-youll-do" className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div data-anim="stagger" className="mb-6 text-center sm:mb-10">
          <p className="mb-3 text-[13px] font-medium text-brand">What you&apos;ll do</p>
          <h2 className="text-[26px] leading-[1.15] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-[38px] lg:whitespace-nowrap">
            Three ways to bring tech learning to your campus
          </h2>
        </div>

        <div data-anim="stagger" className="grid gap-4 lg:grid-cols-2 lg:grid-rows-2 lg:gap-5">
          {/* 01 — featured: Vishwa Mohan on campus */}
          <article className="flex flex-col rounded-md border border-black/[0.08] bg-[#fafafa] p-3 lg:row-span-2">
            <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-sm">
              {/* Golden-hour campus amphitheatre (Figma AI), with Vishwa's cutout standing in front */}
              <Image
                src="/what/vishwa-bg.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-[50%_40%]"
              />
              <Image
                src="/what/vishwa-cutout.png"
                alt="Vishwa Mohan"
                width={1105}
                height={1400}
                sizes="(min-width: 1024px) 340px, 70vw"
                className="absolute bottom-0 left-1/2 h-[95%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
              />
            </div>

            <div className="px-3 pt-5 pb-2 sm:px-4">
              <Num n="01" />
              <h3 className="mt-1.5 mb-2 text-xl leading-tight font-semibold tracking-[-0.02em] text-ink">
                Host Vishwa Mohan on campus
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-[#4a4a57]">
                Get 200 students from your college to register, and host Vishwa Mohan (ex-CIO, PhysicsWallah; previously
                LinkedIn, Walmart, Oracle and PayPal) live on your campus for an in-person session on the latest in tech
                and building a tech career roadmap.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/[0.07] pt-4">
                {PREVIOUSLY.map((l) => (
                  <Image
                    key={l.name}
                    src={l.src}
                    alt={l.name}
                    width={l.w}
                    height={l.h}
                    className={`${l.cls} w-auto`}
                  />
                ))}
              </div>
            </div>
          </article>

          {/* 02 — watch parties */}
          <Card
            n="02"
            img="/what/campus-watch-party.jpg"
            alt="Students watching a live online masterclass together"
            title="Host watch parties for expert-led tech masterclasses"
            body="Gather your campus for live online sessions led by industry experts. Learn what's changing in the industry, the tech behind the latest innovations, and hands-on skills to build the kind of products everyone is talking about."
          />

          {/* 03 — pitch your own idea */}
          <Card
            n="03"
            img="/what/campus-build-night.jpg"
            alt="Students collaborating at a campus hackathon"
            title="Pitch your own idea"
            body="Want to run a coding hackathon or a build night? Have an event you'd like us to sponsor and be part of? Pitch it, and we'll help you make it happen."
          />
        </div>
      </div>
    </section>
  );
}

function Card({
  n,
  img,
  alt,
  title,
  body,
}: {
  n: string;
  img: string;
  alt: string;
  title: string;
  body: string;
}) {
  return (
    <article className="flex flex-col gap-5 rounded-md border border-black/[0.08] bg-[#fafafa] p-3 sm:flex-row">
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm sm:aspect-auto sm:w-[36%] sm:flex-none">
        <Image src={img} alt={alt} fill sizes="(min-width: 640px) 220px, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-col justify-center px-3 pb-3 sm:px-1 sm:py-2 sm:pr-4">
        <Num n={n} />
        <h3 className="mt-1.5 mb-2 text-[17px] leading-snug font-semibold tracking-[-0.02em] text-ink">{title}</h3>
        <p className="text-sm leading-[1.6] text-[#4a4a57]">{body}</p>
      </div>
    </article>
  );
}
