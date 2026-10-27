import type { Metadata } from "next";
import { BrandMark } from "@/components/Brand";
import Footer from "@/components/Footer";
import { site } from "@/content/site";
import { href } from "@/lib/paths";

export const metadata: Metadata = {
  title: `Privacy · ${site.name}`,
  description: `How ${site.name} handles the details you send through this website.`,
  alternates: { canonical: `${site.url}/privacy` },
};

export default function Privacy() {
  return (
    <div className="page">
      <header className="site-header scrolled">
        <div className="wrap">
          <div className="bar">
            <a className="brand" href={href("/")}>
              <BrandMark />
              {site.name}
            </a>
            <a className="btn btn-line" href={href("/#contact")}>
              Back to the site
            </a>
          </div>
        </div>
      </header>
      <main className="wrap legal">
        <p className="label">Privacy</p>
        <h1>How we handle your details</h1>
        <p>This website has one job: to let you ask {site.name} for help. Here is everything that happens to the information you give us.</p>

        <h2>What we collect</h2>
        <p>
          Only what you type into the contact form: your name, email address, and optionally your website, chosen packet and message. We
          use it to reply to your request and, if we work together, to prepare a proposal.
        </p>

        <h2>Who processes it</h2>
        <p>
          The form is delivered by Web3Forms, which forwards your message to our inbox. To keep out spam, the form uses hCaptcha to
          check that a person is sending it; hCaptcha&apos;s own privacy policy covers that check. We don&apos;t sell or share your
          details with anyone else.
        </p>

        <h2>Cookies and tracking</h2>
        <p>
          This website sets no cookies of its own and runs no analytics or advertising trackers. The hCaptcha check on the contact form
          is the only third-party service that loads.
        </p>

        <h2>How long we keep it</h2>
        <p>We keep enquiry emails for as long as needed to answer them and follow up, then delete them.</p>

        <h2>Your rights</h2>
        <p>
          You can ask us to see, correct or delete your details at any time. Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </main>
      <Footer home={false} />
    </div>
  );
}
