import { Fragment, type CSSProperties } from "react";
import { hero } from "@/content/site";
import { Magnetic } from "./Motion";

// The hero animates with CSS so it plays before (and without) JavaScript.
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function Words({ text, offset, className }: { text: string; offset: number; className?: string }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      <span className="w">
        <span className={className} style={delay(0.15 + (offset + i) * 0.045)}>
          {word}
        </span>
      </span>{" "}
    </Fragment>
  ));
}

export default function Hero() {
  const leadCount = hero.titleLead.split(" ").length;
  const fade = (i: number) => ({ className: "rise", style: delay(0.35 + i * 0.06) });
  return (
    <section className="hero">
      <div className="wrap">
        <div className="copy">
          <p {...fade(0)} className="label rise">
            {hero.label}
          </p>
          <h1>
            <Words text={hero.titleLead} offset={0} />
            <Words text={hero.titleAccent} offset={leadCount} className="accent" />
          </h1>
          <p {...fade(1)} className="lede rise">
            {hero.lede}
          </p>
          <div {...fade(2)} className="ctas rise">
            <Magnetic>
              <a className="btn btn-light" href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </a>
            </Magnetic>
            <a className="btn btn-line" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>
          <div className="measures" aria-label="What we report on">
            {hero.measures.map((m, i) => (
              <span key={m} {...fade(3 + i)}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
