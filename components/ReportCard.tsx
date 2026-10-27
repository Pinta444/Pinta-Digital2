"use client";

import { motion } from "motion/react";
import { reporting } from "@/content/site";
import { CountUp, EASE, RevealItem } from "./Motion";

const LINE = "M34,90 L60,86.7 L86,91.7 L112,78.3 L138,73.3 L164,76.7 L190,63.3 L216,56.7 L242,50 L268,41.7 L294,30 L320,20";

export default function ReportCard() {
  return (
    <RevealItem as="figure" className="report glass" aria-label="Sample monthly report">
      <div className="report-top">
        <h3>{reporting.cardTitle}</h3>
        <span>{reporting.cardTag}</span>
      </div>
      <div className="kpis">
        {reporting.kpis.map((k) => (
          <div className="kpi" key={k.label}>
            <small>{k.label}</small>
            <CountUp value={k.value} />
            <i>{k.change}</i>
          </div>
        ))}
      </div>
      <div className="chart">
        <svg viewBox="0 0 330 124" role="img" aria-label="Weekly organic clicks rising from about 620 to 1,040 over twelve weeks">
          <g stroke="rgba(243,232,220,.12)" strokeWidth="1">
            <line x1="34" x2="320" y1="93.3" y2="93.3" />
            <line x1="34" x2="320" y1="60" y2="60" />
            <line x1="34" x2="320" y1="26.7" y2="26.7" />
          </g>
          <g fontFamily="var(--f-mono)" fontSize="9" fill="#B6AEA8" textAnchor="end">
            <text x="28" y="96.3">600</text>
            <text x="28" y="63">800</text>
            <text x="28" y="29.7">1,000</text>
          </g>
          <path d={`${LINE} L320,110 L34,110 Z`} fill="#F0B48A" fillOpacity=".12" />
          <motion.path
            d={LINE}
            fill="none"
            stroke="#F0B48A"
            strokeWidth="2"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
          />
          <circle cx="320" cy="20" r="4" fill="#F4EFE9" />
          <line x1="34" x2="320" y1="110" y2="110" stroke="rgba(243,232,220,.25)" strokeWidth="1" />
        </svg>
        <div className="chart-label">
          <span>{reporting.chartCaption}</span>
          <span>{reporting.chartLatest}</span>
        </div>
      </div>
    </RevealItem>
  );
}
