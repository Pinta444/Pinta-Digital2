"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact, packets, site, type PacketId } from "@/content/site";
import { RevealItem } from "./Motion";
import { PACKET_EVENT } from "./PacketButton";

type Status = { state: "idle" | "sending" | "success" | "error"; message: string };
type Errors = { name?: string; email?: string; packet?: string; message?: string; captcha?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [packet, setPacket] = useState<PacketId | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ state: "idle", message: "" });
  const [token, setToken] = useState("");
  const captcha = useRef<HCaptcha>(null);

  useEffect(() => {
    const onSelect = (e: Event) => {
      setPacket((e as CustomEvent<PacketId>).detail);
      setErrors((prev) => ({ ...prev, packet: undefined }));
    };
    window.addEventListener(PACKET_EVENT, onSelect);
    return () => window.removeEventListener(PACKET_EVENT, onSelect);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please add your name.";
    if (!EMAIL_RE.test(email)) next.email = "Please enter a valid email address.";
    if (!packet) next.packet = "Please choose a packet.";
    if (!message) next.message = "Please tell us what you'd like to improve.";
    if (!token) next.captcha = "Please tick the box to show you're not a robot.";
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      setStatus({ state: "error", message: "Please fix the highlighted fields." });
      const first = next.name ? "#f-name" : next.email ? "#f-email" : next.packet ? "#p-start" : next.message ? "#f-msg" : null;
      if (first) form.querySelector<HTMLElement>(first)?.focus();
      return;
    }

    if (!site.web3formsAccessKey) {
      setStatus({
        state: "error",
        message: `The form isn't connected yet. Please email us at ${site.email}.`,
      });
      return;
    }

    const chosen = packets.items.find((p) => p.id === packet)!;
    setStatus({ state: "sending", message: "Sending…" });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsAccessKey,
          subject: `New enquiry: ${name} (${chosen.name})`,
          from_name: `${site.name} website`,
          name,
          email,
          website: String(data.get("website") ?? "").trim(),
          packet: `${chosen.name} (${chosen.formPrice})`,
          message,
          botcheck: data.get("botcheck") ? true : "",
          "h-captcha-response": token,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`);
      form.reset();
      setPacket(null);
      setStatus({
        state: "success",
        message: `Thanks, ${name.split(" ")[0]}. We'll reply within one working day.`,
      });
    } catch {
      setStatus({
        state: "error",
        message: `That didn't go through. Please try again, or email us at ${site.email}.`,
      });
    }
    // A captcha token works once, so every attempt needs a fresh check.
    captcha.current?.resetCaptcha();
    setToken("");
  }

  const sending = status.state === "sending";

  return (
    <RevealItem as="div">
      <form className="form glass" onSubmit={onSubmit} noValidate>
        <div className="row">
          <div className="field">
            <label htmlFor="f-name">Your name</label>
            <input
              type="text"
              id="f-name"
              name="name"
              autoComplete="name"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "f-name-err" : undefined}
            />
            {errors.name && (
              <span className="err" id="f-name-err">
                {errors.name}
              </span>
            )}
          </div>
          <div className="field">
            <label htmlFor="f-email">Work email</label>
            <input
              type="email"
              id="f-email"
              name="email"
              autoComplete="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "f-email-err" : undefined}
            />
            {errors.email && (
              <span className="err" id="f-email-err">
                {errors.email}
              </span>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="f-site">
            Website <small>(optional)</small>
          </label>
          <input type="url" id="f-site" name="website" placeholder="https://" autoComplete="url" />
        </div>
        <fieldset className="field" aria-describedby={errors.packet ? "f-packet-err" : undefined}>
          <legend>Packet</legend>
          <div className={`choice${errors.packet ? " invalid" : ""}`}>
            {packets.items.map((p) => (
              <label key={p.id}>
                <input
                  type="radio"
                  id={`p-${p.id}`}
                  name="packet"
                  value={p.id}
                  required
                  checked={packet === p.id}
                  onChange={() => {
                    setPacket(p.id);
                    setErrors((e) => ({ ...e, packet: undefined }));
                  }}
                />
                {p.name}
                <span>{p.formPrice}</span>
              </label>
            ))}
          </div>
          {errors.packet && (
            <span className="err" id="f-packet-err">
              {errors.packet}
            </span>
          )}
        </fieldset>
        <div className="field">
          <label htmlFor="f-msg">What would you like to improve?</label>
          <textarea
            id="f-msg"
            name="message"
            required
            placeholder="For example: we get traffic but very few quote requests."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "f-msg-err" : undefined}
          />
          {errors.message && (
            <span className="err" id="f-msg-err">
              {errors.message}
            </span>
          )}
        </div>
        <label className="trap" aria-hidden="true">
          Leave this empty
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
        <div className="field captcha">
          <HCaptcha
            ref={captcha}
            sitekey={site.hcaptchaSiteKey}
            theme="dark"
            reCaptchaCompat={false}
            onVerify={(t) => {
              setToken(t);
              setErrors((e) => ({ ...e, captcha: undefined }));
            }}
            onExpire={() => setToken("")}
          />
          {errors.captcha && <span className="err">{errors.captcha}</span>}
        </div>
        <div className="form-foot">
          <p>{contact.privacyNote}</p>
          <button className="btn btn-light" type="submit" disabled={sending}>
            {sending ? "Sending…" : "Send request"}
          </button>
        </div>
        <p className={`status ${status.state}`} role="status" aria-live="polite">
          {status.message}
        </p>
      </form>
    </RevealItem>
  );
}
