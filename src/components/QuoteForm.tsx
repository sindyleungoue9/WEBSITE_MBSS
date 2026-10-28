"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  ALLOWED_EXTENSIONS,
  MAX_FILE_BYTES,
  SERVICE_OPTIONS,
  fileExtension,
  quoteSchema,
  type QuoteInput,
} from "@/lib/quote";
import { SITE } from "@/lib/site";
import { Link } from "@/i18n/navigation";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const inputClass =
  "w-full border border-[#B9C4DB] bg-white px-4 py-3 text-base text-navy placeholder:text-muted/60 focus:border-brand";

type Status = "idle" | "sending" | "success" | "error";

export function QuoteForm({ defaultServices = [] }: { defaultServices?: QuoteInput["services"] }) {
  const t = useTranslations("quote");
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      vessel: "",
      imo: "",
      port: SITE.ports[0] ?? "",
      eta: "",
      services: defaultServices,
      message: "",
      website: "",
    },
  });

  const err = (field: keyof QuoteInput) => {
    const code = errors[field]?.message;
    return code ? t(`errors.${code}`) : null;
  };

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0] ?? null;
    setFileError("");
    if (!picked) return setFile(null);
    if (picked.size > MAX_FILE_BYTES) {
      setFileError(t("errorFileSize"));
      e.target.value = "";
      return setFile(null);
    }
    if (!(ALLOWED_EXTENSIONS as readonly string[]).includes(fileExtension(picked.name))) {
      setFileError(t("errorFileType"));
      e.target.value = "";
      return setFile(null);
    }
    setFile(picked);
  }

  async function onSubmit(values: QuoteInput) {
    setStatus("sending");
    setServerError("");
    try {
      const body = new FormData();
      body.append("data", JSON.stringify(values));
      if (file) body.append("file", file);
      const token = formRef.current?.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value;
      if (token) body.append("turnstile", token);

      const res = await fetch("/api/quote", { method: "POST", body });
      if (res.status === 429) {
        setServerError(t("errorTooMany"));
        return setStatus("error");
      }
      if (!res.ok) throw new Error(String(res.status));
      reset();
      setFile(null);
      setStatus("success");
    } catch {
      setServerError(t("errorGeneric"));
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col gap-4 border border-leaf-dark/30 bg-[#E6F6EB] p-8">
        <h3 className="font-display text-3xl font-extrabold uppercase text-navy">{t("successTitle")}</h3>
        <p className="text-lg text-ink">{t("successText")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="w-fit border border-navy px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-navy hover:bg-navy hover:text-white"
        >
          {t("newRequest")}
        </button>
      </div>
    );
  }

  const field = (id: keyof QuoteInput, label: string, required = false, help?: string) => (
    <label htmlFor={id} className="flex flex-col gap-2 text-sm font-bold text-navy">
      <span>
        {label}
        {required && <span className="text-brand" aria-hidden="true"> *</span>}
        {help && <span className="ml-2 font-normal text-muted">({help})</span>}
      </span>
    </label>
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-5 bg-mist p-6 sm:grid-cols-2 sm:p-10"
    >
      {TURNSTILE_SITE_KEY && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      )}

      <h3 className="font-display text-2xl font-extrabold uppercase text-navy sm:col-span-2">{t("contactBlock")}</h3>

      <div className="flex flex-col gap-2">
        {field("name", t("name"), true)}
        <input id="name" autoComplete="name" aria-invalid={!!errors.name} className={inputClass} {...register("name")} />
        {err("name") && <p className="text-sm text-red-700">{err("name")}</p>}
      </div>
      <div className="flex flex-col gap-2">
        {field("company", t("company"))}
        <input id="company" autoComplete="organization" className={inputClass} {...register("company")} />
      </div>
      <div className="flex flex-col gap-2">
        {field("email", t("email"), true)}
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          className={inputClass}
          {...register("email")}
        />
        {err("email") && <p className="text-sm text-red-700">{err("email")}</p>}
      </div>
      <div className="flex flex-col gap-2">
        {field("phone", t("phone"))}
        <input id="phone" type="tel" autoComplete="tel" className={inputClass} {...register("phone")} />
      </div>

      <h3 className="mt-3 font-display text-2xl font-extrabold uppercase text-navy sm:col-span-2">{t("vesselBlock")}</h3>

      <div className="flex flex-col gap-2">
        {field("vessel", t("vessel"))}
        <input id="vessel" className={inputClass} {...register("vessel")} />
      </div>
      <div className="flex flex-col gap-2">
        {field("imo", t("imo"), false, t("imoHelp"))}
        <input
          id="imo"
          inputMode="numeric"
          maxLength={7}
          aria-invalid={!!errors.imo}
          className={inputClass}
          {...register("imo")}
        />
        {err("imo") && <p className="text-sm text-red-700">{err("imo")}</p>}
      </div>
      <div className="flex flex-col gap-2">
        {field("port", t("port"))}
        <select id="port" className={inputClass} {...register("port")}>
          {SITE.ports.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
          <option value="other">{t("portOther")}</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        {field("eta", t("eta"))}
        <input id="eta" type="date" aria-invalid={!!errors.eta} className={inputClass} {...register("eta")} />
        {err("eta") && <p className="text-sm text-red-700">{err("eta")}</p>}
      </div>

      <h3 className="mt-3 font-display text-2xl font-extrabold uppercase text-navy sm:col-span-2">{t("needBlock")}</h3>

      <fieldset className="flex flex-col gap-3 sm:col-span-2">
        <legend className="mb-2 text-sm font-bold text-navy">
          {t("services")} <span className="text-brand" aria-hidden="true">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICE_OPTIONS.map((opt) => (
            <label key={opt} className="flex min-h-12 cursor-pointer items-center gap-3 border border-[#B9C4DB] bg-white px-4 py-3 text-navy">
              <input type="checkbox" value={opt} className="size-5 accent-brand" {...register("services")} />
              {t(`servicesOptions.${opt}`)}
            </label>
          ))}
        </div>
        {err("services") && <p className="text-sm text-red-700">{err("services")}</p>}
      </fieldset>

      <div className="flex flex-col gap-2 sm:col-span-2">
        {field("message", t("message"))}
        <textarea id="message" rows={5} className={inputClass} {...register("message")} />
      </div>

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="file" className="text-sm font-bold text-navy">
          {t("file")} <span className="ml-2 font-normal text-muted">({t("fileHelp")})</span>
        </label>
        <input
          id="file"
          type="file"
          accept={ALLOWED_EXTENSIONS.map((e) => `.${e}`).join(",")}
          onChange={onFileChange}
          className="border border-dashed border-[#B9C4DB] bg-white p-3 text-sm file:mr-4 file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
        />
        {fileError && <p className="text-sm text-red-700">{fileError}</p>}
      </div>

      {/* Champ piège anti-robots : invisible pour les humains */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {TURNSTILE_SITE_KEY && <div className="cf-turnstile sm:col-span-2" data-sitekey={TURNSTILE_SITE_KEY} />}

      <div className="flex flex-col gap-2 sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
          <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-brand" {...register("consent")} />
          <span>
            {t("consent")}{" "}
            <Link href="/mentions-legales" className="font-semibold text-brand underline">
              →
            </Link>
          </span>
        </label>
        {err("consent") && <p className="text-sm text-red-700">{err("consent")}</p>}
      </div>

      {status === "error" && (
        <p role="alert" className="border border-red-300 bg-red-50 p-4 text-red-800 sm:col-span-2">
          {serverError}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <span className="text-sm text-muted">{t("responseNote")}</span>
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-brand px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
        >
          {status === "sending" ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}
