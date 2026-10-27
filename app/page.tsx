import BackToTop from "@/components/BackToTop";
import ContactForm from "@/components/ContactForm";
import DriftBackground from "@/components/DriftBackground";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Reveal, RevealItem } from "@/components/Motion";
import PacketButton from "@/components/PacketButton";
import Parallax from "@/components/Parallax";
import ReportCard from "@/components/ReportCard";
import { contact, faq, onboarding, packets, ranking, reporting, services, site } from "@/content/site";

function SectionHead({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <Reveal className="head" data-speed="0.06">
      <RevealItem as="p" className="label">
        {label}
      </RevealItem>
      <RevealItem as="h2">{title}</RevealItem>
      {intro && <RevealItem as="p">{intro}</RevealItem>}
    </Reveal>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      email: site.email,
      description: site.description,
      knowsAbout: ["Search engine optimisation", "Web analytics", "Conversion rate optimisation", "Website design"],
      makesOffer: packets.items.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.pitch,
        ...(p.price.startsWith("$")
          ? { price: p.price.replace(/[$,]/g, ""), priceCurrency: "USD" }
          : {}),
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <DriftBackground />
      <Parallax />
      <div className="page" id="top">
        <Header />
        <main id="main">
          <Hero />

          <section className="section" id="services">
            <div className="wrap">
              <SectionHead label={services.label} title={services.title} intro={services.intro} />
              <Reveal className="services">
                {services.items.map((s) => (
                  <RevealItem as="article" className="service glass" hover key={s.label}>
                    <p className="label">{s.label}</p>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <ul className="tags">
                      {s.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </RevealItem>
                ))}
              </Reveal>
            </div>
          </section>

          <section className="section tight" id="ranking">
            <div className="wrap">
              <SectionHead label={ranking.label} title={ranking.title} intro={ranking.intro} />
              <Reveal className="factors">
                {ranking.factors.map((f) => (
                  <RevealItem className="factor" key={f.title}>
                    <span className="q">{f.question}</span>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                    <small>{f.tags}</small>
                  </RevealItem>
                ))}
              </Reveal>
            </div>
          </section>

          <section className="section tight" id="reporting">
            <div className="wrap">
              <SectionHead label={reporting.label} title={reporting.title} intro={reporting.intro} />
              <Reveal>
                <ReportCard />
              </Reveal>
            </div>
          </section>

          <section className="section tight" id="pricing">
            <div className="wrap">
              <SectionHead label={packets.label} title={packets.title} intro={packets.intro} />
              <Reveal className="packets">
                {packets.items.map((p) => (
                  <RevealItem as="article" className={`packet glass${p.featured ? " featured" : ""}`} hover key={p.id}>
                    {p.featured && <span className="badge">Most chosen</span>}
                    <div>
                      <h3>{p.name}</h3>
                      <p className="pitch">{p.pitch}</p>
                    </div>
                    <p className="price">
                      <b>{p.price}</b>
                      <span>{p.unit}</span>
                    </p>
                    <ul>
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                    <div className="buy">
                      <PacketButton id={p.id} label={p.cta} primary={p.featured} />
                    </div>
                  </RevealItem>
                ))}
              </Reveal>
              <p className="note">{packets.note}</p>
            </div>
          </section>

          <section className="section tight" id="process">
            <div className="wrap">
              <SectionHead label={onboarding.label} title={onboarding.title} />
              <Reveal as="ol" className="steps">
                {onboarding.steps.map((s) => (
                  <RevealItem as="li" className="step glass" key={s.title}>
                    <small>{s.when}</small>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </RevealItem>
                ))}
              </Reveal>
            </div>
          </section>

          <section className="section tight" id="faq">
            <div className="wrap">
              <SectionHead label={faq.label} title={faq.title} />
              <Reveal className="faq">
                {faq.items.map((f, i) => (
                  <RevealItem key={f.q}>
                    <details open={i === 0}>
                      <summary>{f.q}</summary>
                      <p>{f.a}</p>
                    </details>
                  </RevealItem>
                ))}
              </Reveal>
            </div>
          </section>

          <section className="section tight" id="contact">
            <Reveal className="wrap contact-wrap">
              <div>
                <div className="head" style={{ margin: 0 }}>
                  <RevealItem as="p" className="label">
                    {contact.label}
                  </RevealItem>
                  <RevealItem as="h2">{contact.title}</RevealItem>
                  <RevealItem as="p">{contact.intro}</RevealItem>
                </div>
                <ul className="list">
                  {contact.steps.map((s) => (
                    <RevealItem as="li" key={s.title}>
                      <b>{s.title}</b>
                      <span>{s.body}</span>
                    </RevealItem>
                  ))}
                </ul>
                <RevealItem as="p" className="direct">
                  Or email <a href={`mailto:${site.email}`}>{site.email}</a>
                </RevealItem>
              </div>
              <ContactForm />
            </Reveal>
          </section>
        </main>
        <Footer />
      </div>
      <BackToTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
