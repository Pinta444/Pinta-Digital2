import { site } from "@/content/site";
import { href } from "@/lib/paths";

export default function Footer({ home = true }: { home?: boolean }) {
  const anchor = (hash: string) => (home ? hash : href(`/${hash}`));
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>
          © {new Date().getFullYear()} {site.name} · <a href={`mailto:${site.email}`}>{site.email}</a>
        </span>
        <nav aria-label="Footer">
          <a href={anchor("#services")}>Services</a>
          <a href={anchor("#pricing")}>Pricing</a>
          {site.linkedin && <a href={site.linkedin}>LinkedIn</a>}
          <a href={href("/privacy/")}>Privacy</a>
        </nav>
      </div>
    </footer>
  );
}
