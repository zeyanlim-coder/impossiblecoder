import { useState } from "react";

const NAV = [
  {
    group: "GTM — New Acquisition",
    color: "#C8F04D",
    items: [
      { id: "revopsdeep", label: "01 — RevOps *" },
      { id: "icp", label: "02 — ICP & Scoring *" },
      { id: "enrichment", label: "03 — TAM & Enrichment" },
      { id: "outreach", label: "04 — Outreach Motion" },
      { id: "marketing", label: "05 — Marketing Motion *" },
      { id: "pitch", label: "06 — The Pitch" },
      { id: "followup", label: "07 — Follow-Up Agent *" },
    ],
  },
  {
    group: "Handoff — The Seam",
    color: "#F0C84D",
    items: [
      { id: "handoff", label: "08 — Structured Handoff *" },
    ],
  },
  {
    group: "CS — Activation & Retention",
    color: "#88AAFF",
    items: [
      { id: "lir", label: "09 — LIR Framework" },
      { id: "onboarding", label: "10 — Onboarding" },
      { id: "activation", label: "11 — Activation *" },
      { id: "review", label: "12 — 45-Day Review *" },
      { id: "tiering", label: "13 — Scoring & Tiering *" },
      { id: "crosssell", label: "14 — Cross-Sell Engine" },
      { id: "revops", label: "15 — RevOps Feedback" },
    ],
  },
  {
    group: "Adjacent Playbooks",
    color: "#F0C84D",
    items: [
      { id: "bottom800", label: "Bottom 800 Playbook *" },
      { id: "kam", label: "KAM Playbook *" },
    ],
  },
  {
    group: "Master View",
    color: "#FF8888",
    items: [
      { id: "fullflow", label: "16 — Full Loop" },
      { id: "tracker", label: "17 — Build Tracker" },
    ],
  },
];

const ALL_IDS = NAV.flatMap(g => g.items.map(i => i.id));

const Card = ({ children, style = {} }) => (
  <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 12, padding: 24, marginBottom: 16, ...style }}>
    {children}
  </div>
);

const CardTitle = ({ children, color = "#C8F04D" }) => (
  <div style={{ fontSize: 11, color, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{children}</div>
);

const Row = ({ label, value, sub }) => (
  <div style={{ borderBottom: "1px solid #1A1A1A", padding: "13px 0", display: "flex", gap: 24, alignItems: "flex-start" }}>
    <div style={{ width: 180, flexShrink: 0, color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.07em", paddingTop: 2 }}>{label}</div>
    <div style={{ flex: 1 }}>
      <div style={{ color: "#E8E8E8", fontSize: 14, lineHeight: 1.6 }}>{value}</div>
      {sub && <div style={{ color: "#555", fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
  </div>
);

const SectionHeader = ({ number, title, subtitle, color = "#C8F04D" }) => (
  <div style={{ marginBottom: 36 }}>
    <div style={{ color, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{number}</div>
    <div style={{ fontSize: 26, fontWeight: 700, color: "#F0F0F0", letterSpacing: "-0.02em", marginBottom: 8, fontFamily: "Georgia, serif" }}>{title}</div>
    {subtitle && <div style={{ color: "#666", fontSize: 14, lineHeight: 1.6, maxWidth: 580 }}>{subtitle}</div>}
  </div>
);

const Tag = ({ children, color = "#C8F04D" }) => (
  <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginRight: 6, marginBottom: 4, background: color + "22", color, border: `1px solid ${color}44` }}>{children}</span>
);

const FlowStep = ({ number, title, items, color = "#C8F04D", tag }) => (
  <div style={{ display: "flex", gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: color + "22", border: `1px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", color, fontSize: 13, fontWeight: 700 }}>{number}</div>
    <div style={{ flex: 1, paddingTop: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{ color: "#F0F0F0", fontSize: 15, fontWeight: 600 }}>{title}</div>
        {tag && <Tag color={color}>{tag}</Tag>}
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ color: "#666", fontSize: 13, lineHeight: 1.8, display: "flex", gap: 8 }}>
          <span style={{ color, flexShrink: 0 }}>·</span>{item}
        </div>
      ))}
    </div>
  </div>
);

const TriggerRow = ({ trigger, channel, action }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 1fr", gap: 12, borderBottom: "1px solid #1A1A1A", padding: "12px 0", alignItems: "center" }}>
    <div style={{ color: "#AAA", fontSize: 13 }}>{trigger}</div>
    <div style={{ textAlign: "center" }}><span style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 6, padding: "3px 8px", fontSize: 11, color: "#666" }}>{channel}</span></div>
    <div style={{ color: "#E8E8E8", fontSize: 13 }}>{action}</div>
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    "Live": { bg: "#0A2A0A", color: "#4ADE80", border: "#4ADE8044" },
    "In Progress": { bg: "#2A1A00", color: "#F0C84D", border: "#F0C84D44" },
    "Planned": { bg: "#1A1A1A", color: "#666", border: "#33333344" },
    "Gap": { bg: "#2A0A0A", color: "#F87171", border: "#F8717144" },
  };
  const s = map[status] || map["Planned"];
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{status}</span>
  );
};

const TrackerRow = ({ area, item, status, owner, note }) => (
  <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 90px 100px", gap: 16, borderBottom: "1px solid #1A1A1A", padding: "12px 0", alignItems: "start" }}>
    <div style={{ color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", paddingTop: 2 }}>{area}</div>
    <div>
      <div style={{ color: "#E8E8E8", fontSize: 13 }}>{item}</div>
      {note && <div style={{ color: "#555", fontSize: 12, marginTop: 3 }}>{note}</div>}
    </div>
    <StatusBadge status={status} />
    <div style={{ color: "#666", fontSize: 12, paddingTop: 2 }}>{owner}</div>
  </div>
);

export default function MasterPlaybook() {
  const [active, setActive] = useState("icp");

  const getColor = (id) => {
    for (const g of NAV) {
      if (g.items.find(i => i.id === id)) return g.color;
    }
    return "#C8F04D";
  };

  const activeColor = getColor(active);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#0A0A0A", minHeight: "100vh", color: "#E8E8E8" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0A0A0A; } ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 4px; } button { cursor: pointer; font-family: inherit; }`}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1A1A1A", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#0A0A0A", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ background: "#C8F04D", borderRadius: 6, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#0A0A0A" }}>O</span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#F0F0F0" }}>Oddle Revenue Playbook</div>
            <div style={{ fontSize: 11, color: "#444" }}>GTM + CS · Singapore · All Access · 2025–26</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[["GTM", "#C8F04D"], ["Handoff", "#F0C84D"], ["CS", "#88AAFF"], ["Master", "#FF8888"]].map(([label, color]) => (
            <span key={label} style={{ fontSize: 11, fontWeight: 700, color, background: color + "15", border: `1px solid ${color}33`, borderRadius: 6, padding: "3px 10px" }}>{label}</span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: 232, borderRight: "1px solid #1A1A1A", padding: "24px 0", flexShrink: 0, position: "sticky", top: 61, height: "calc(100vh - 61px)", overflowY: "auto" }}>
          {NAV.map(group => (
            <div key={group.group} style={{ marginBottom: 8 }}>
              <div style={{ padding: "8px 20px 6px", fontSize: 10, color: group.color + "99", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{group.group}</div>
              {group.items.map(item => (
                <button key={item.id} onClick={() => setActive(item.id)} style={{
                  display: "block", width: "100%", textAlign: "left", padding: "8px 20px",
                  background: active === item.id ? "#161616" : "transparent", border: "none",
                  borderLeft: active === item.id ? `2px solid ${group.color}` : "2px solid transparent",
                  color: active === item.id ? group.color : "#555",
                  fontSize: 12, fontWeight: active === item.id ? 700 : 400,
                  letterSpacing: "0.04em",
                }}>{item.label}</button>
              ))}
            </div>
          ))}

          <div style={{ margin: "16px 20px 0", borderTop: "1px solid #1A1A1A", paddingTop: 16 }}>
            <div style={{ fontSize: 10, color: "#333", letterSpacing: "0.08em" }}>
              <span style={{ color: "#F0C84D" }}>*</span> = has pending items
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "44px 52px", maxWidth: 880, overflowY: "auto" }}>

          {/* ── 01 REVOPS ── */}
          {active === "revopsdeep" && (
            <div>
              <SectionHeader number="GTM · 01" title="RevOps" subtitle="The data infrastructure behind the GTM motion. Turns a raw market into a scored, enriched, Attio-ready lead list." color="#C8F04D" />
              <Card style={{ border: "1px solid #C8F04D22", background: "#0A0A0A" }}>
                <CardTitle>What RevOps Owns</CardTitle>
                <Row label="Data infrastructure" value="TAM crawl, brand power scoring, tech stack mapping, contact enrichment, voice agent, merchant matching, Attio CRM data quality." />
                <Row label="Sprint planning" value="Weekly meeting with Sales Lead. 2-week sprint cycles. Target list assembled based on what sales needs — new market, new segment, data refresh, or all of the above." />
                <Row label="Attio ownership" value="RevOps owns enrichment data quality. Sales team owns stage updates and pipeline hygiene." />
                <Row label="Does not own" value="Content or campaigns (AI GTM Lead). Sales execution (Sales Rep). CS tiering (CS Leader)." />
              </Card>
              <Card>
                <CardTitle>Pipeline Architecture</CardTitle>
                <Row label="Upstream app" value="Zone / country selection → Apify GMB crawl → brand aggregate cleaning → places_clean (PostgreSQL). Handoff point into new pipeline." />
                <Row label="Step 1 — IG Enrichment + Scoring" value="Parallel with Step 2. SerpAPI finds IG handle → Apify crawls followers + last 5 posts → lead_score computed (score_reviews + score_ig_followers + score_ig_recency, 0-100)." />
                <Row label="Step 2 — Tech Platform Detection" value="Parallel with Step 1. SerpAPI finds delivery/reservation pages → Claude Haiku validates name → HTML scrape extracts delivery_partners and reservation_partner." />
                <Row label="Step 3 — Merchant Matching" value="Fuzzy + GPT-4o mini matches brand against existing merchants in BigQuery. Flags is_existing_merchant. Prevents existing customers entering outreach pipeline." />
                <Row label="Step 4 — Attio CRM Push" value="Fetches or creates Attio record by place_id. Updates if exists, creates if new." />
                <Row label="Step 5 — Contact Enrichment" value="Swan runs independently. One brand to many contacts. Writes to separate contacts table." />
                <Row label="Infrastructure" value="GCP Cloud Run + Scheduler. Each step writes back to places_clean immediately — safe to rerun at any time." />
              </Card>
              <Card>
                <CardTitle>Lead Scoring Model (0-100)</CardTitle>
                <Row label="Components" value="score_reviews (Google rating + review count) + score_ig_followers (Instagram size) + score_ig_recency (posting activity recency)" />
                <Row label="Weights" value="Built in — exact weighting pending documentation." sub="Needs to be confirmed and documented before TPV model evolution begins." />
                <Row label="LLM threshold" value="Over 85%: accept. 60-85%: LLM verification. Under 60%: reject." />
                <Row label="Output" value="lead_score on every Attio brand record. Used by RevOps + Sales Lead to define sprint target lists." />
              </Card>
              <Card>
                <CardTitle>Tools Stack</CardTitle>
                <Row label="Apify" value="GMB crawl + Instagram crawl" />
                <Row label="SerpAPI" value="Instagram search + tech platform search" />
                <Row label="Claude Haiku" value="Name match validation" />
                <Row label="GPT-4o mini" value="Merchant matching against BigQuery" />
                <Row label="BigQuery" value="Existing merchant database" />
                <Row label="Attio" value="CRM — source of truth for sales pipeline" />
                <Row label="Swan" value="Contact enrichment (email, phone)" />
                <Row label="GCP Cloud Run" value="Pipeline execution" />
                <Row label="GCP Scheduler" value="Pipeline automation" />
              </Card>
              <Card>
                <CardTitle>Sprint Operating Model</CardTitle>
                <Row label="Cadence" value="2-week sprints. RevOps Lead and Sales Lead meet weekly to plan and review." />
                <Row label="Target list" value="Assembled by RevOps — new market/zone, specific segment, data refresh, or a combination depending on what sales needs." />
                <Row label="Handoff" value="Target list shared with sales team at sprint start. Sales reps work it directly. AI outreach agent runs against the broader enriched list in parallel." />
              </Card>
              <Card style={{ border: "1px solid #F0C84D33", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">Open Gaps</CardTitle>
                <Row label="Scoring weights undocumented" value="Relative weighting of the three score components not documented. Needs to be defined before TPV model evolution." />
                <Row label="Pipeline run cadence unclear" value="Whether pipeline runs on a fixed GCP Scheduler cadence or is manually triggered per sprint is not confirmed." />
                <Row label="High vs low score threshold undefined" value="The lead_score cutoff separating high-score pool (direct sprint) from low-score pool (AI outreach) is not formally defined." />
                <Row label="TPV model not yet built" value="Evolution from lead_score to sum of per-product PVs agreed directionally. Per-product PV methodology pending from RevOps team." />
              </Card>
            </div>
          )}

          {/* ── 02 ICP ── */}
          {active === "icp" && (
            <div>
              <SectionHeader number="GTM · 02" title="Ideal Customer Profile" subtitle="How we identify and score restaurants before any outreach begins. Everything downstream depends on getting this right." color="#C8F04D" />
              <Card>
                <CardTitle>Brand Power Signals</CardTitle>
                <Row label="Google Reviews" value="Volume and rating — proxy for brand establishment, credibility, and cult following." />
                <Row label="Instagram Crawl" value="Number of posts shared about the brand — proxy for virality and trendiness." sub="Both signals are crawled by the RevOps team and used to compute the brand power score." />
              </Card>
              <Card>
                <CardTitle>Restaurant Archetype</CardTitle>
                <Row label="Scored by" value="Number of outlets + average spend per customer." />
                <Row label="Sweet spot" value="Fast casual · Casual · Premium casual" sub="High turnover, sufficient transaction count, enough data to generate real value for the merchant." />
                <Row label="Excluded — low end" value="QSR — average spend too low to drive meaningful GMV." />
                <Row label="Excluded — high end" value="Fine dining — spend high but transaction volume too low for data products to work." />
              </Card>
              <Card>
                <CardTitle>Score Output</CardTitle>
                <Row label="High score pool" value="Strong brand power + right archetype. Priority for direct sales outreach sprint." />
                <Row label="Low score pool" value="Weaker signals. Reached via AI outreach and paid ads." />
                <Row label="Product suitability" value="Score also determines which Oddle products fit — e.g. large-seating popular restaurants score high for Reserve. Feeds into the prospecting guide during pitch." />
              </Card>
              <Card>
                <CardTitle>Lead Score — Current Model (0–100)</CardTitle>
                <Row label="What it is" value="The current potential score. Computed by the RevOps pipeline and pushed to Attio automatically." />
                <Row label="Score components" value="score_reviews (Google rating + review count) + score_ig_followers (Instagram size) + score_ig_recency (posting activity)" />
                <Row label="Pipeline" value="Apify GMB crawl → SerpAPI Instagram search → Apify Instagram crawl → weighted scoring → Attio CRM push. Runs on GCP, triggered from a single command." />
                <Row label="Used for" value="ICP prioritisation (high score pool vs low score pool), prospecting guide generation, and the 'potential' axis in the CS 2×2 tiering matrix." />
              </Card>
              <Card style={{ border: "1px solid #F0C84D44", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">Evolving → Total Potential Value Model</CardTitle>
                <Row
                  label="Direction"
                  value="The lead_score will evolve into a sum of per-product potential values — a more precise ceiling for each merchant."
                  sub="Total Potential Value = PV(Oddle Shop) + PV(Oddle Reserve) + PV(Oddle Enrolment)"
                />
                <Row
                  label="Why it's better"
                  value="Two restaurants with the same lead_score can have very different product fit profiles. TPV captures this — e.g. a large-seating restaurant scores high on Reserve PV even if its Instagram is quiet."
                />
                <Row
                  label="Per-product PV formula"
                  value="Methodology pending — to be defined based on restaurant profile signals (outlet count, seating, spend per head, transaction volume, etc.) per product."
                  sub="⚠ Once defined, this replaces lead_score as the potential axis in the 2×2 tiering matrix."
                />
              </Card>
            </div>
          )}

          {/* ── 02 ENRICHMENT ── */}
          {active === "enrichment" && (
            <div>
              <SectionHeader number="GTM · 03" title="TAM Crawl & Contact Enrichment" subtitle="RevOps builds and enriches the full restaurant universe before outreach begins. Data quality here determines everything downstream." color="#C8F04D" />
              <Card>
                <CardTitle>TAM Crawl</CardTitle>
                <Row label="What" value="RevOps team crawls the internet to build a complete universe of all restaurants in the market." />
                <Row label="Scored on" value="Brand power (Google + Instagram), archetype (outlet count + spend per head), current tech stack." />
                <Row label="Tech stack mapped" value="Whitelabel delivery / takeaway channels, marketplace presence, existing reservation solution type." sub="Tech stack feeds directly into the sales rep's prospecting guide — pain points pre-identified before the first call." />
              </Card>
              <Card>
                <CardTitle>Contact Enrichment</CardTitle>
                <Row label="Email" value="Crawled from public sources and enriched per restaurant." />
                <Row label="Phone — outlet" value="Store outlet number. Baseline contact for all restaurants." />
                <Row label="Phone — owner" value="Owner or mobile number where findable. Significantly increases conversion when the decision maker is reached directly." />
              </Card>
              <Card>
                <CardTitle>Pipeline Architecture (5 Steps)</CardTitle>
                <Row label="Step 1 — IG Enrichment + Lead Scoring" value="SerpAPI finds Instagram handle → Apify crawls followers + last 5 posts → scoring computed (score_reviews, score_ig_followers, score_ig_recency → lead_score 0–100). Runs in parallel with Step 2." />
                <Row label="Step 2 — Tech Platform Detection" value="SerpAPI searches delivery/reservation pages → fuzzy match + Claude Haiku validates → HTML scrape extracts delivery_partners and reservation_partner. Runs in parallel with Step 1." />
                <Row label="Step 3 — Merchant Matching" value="Fuzzy + GPT-4o mini matches brand against existing merchants in BigQuery. Outputs is_existing_merchant and brand_id." />
                <Row label="Step 4 — Attio CRM Push" value="Fetches or creates Attio record by place_id. Updates if exists, creates if new. Existing merchants flagged automatically." />
                <Row label="Step 5 — Contact Enrichment" value="Swan tool runs independently. One brand → many contacts. Writes to separate contacts table. No dependency on CRM push." />
                <Row label="Infrastructure" value="GCP Cloud Run + Scheduler. Apify, SerpAPI, Claude Haiku, GPT-4o mini, BigQuery, Attio, Swan. Pipeline is safe to rerun at any time — each step writes back to places_clean immediately." />
              </Card>
              <Card>
                <CardTitle>LLM Match Threshold</CardTitle>
                <Row label="> 85% confidence" value="Accept automatically." />
                <Row label="60–85% confidence" value="LLM verification step triggered." />
                <Row label="< 60% confidence" value="Rejected." />
              </Card>
              <Card style={{ border: "1px solid #F0C84D33", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">Voice Agent — Owner Number Extraction</CardTitle>
                <Row label="What" value="AI voice agent calls all restaurants and runs scripted sequences to extract the owner's direct number." />
                <Row label="Scripts" value="Multiple variants tested and optimized for compliance and response rate." />
                <Row label="Why it matters" value="Getting to the decision maker directly is the highest-leverage enrichment step in the whole GTM." />
              </Card>
            </div>
          )}

          {/* ── 03 OUTREACH ── */}
          {active === "outreach" && (
            <div>
              <SectionHeader number="GTM · 04" title="Outreach Motion" subtitle="Three parallel channels running simultaneously to set appointments. All roads lead to the sales rep." color="#C8F04D" />
              <Card style={{ border: "1px solid #C8F04D22", background: "#0A0A0A" }}>
                <CardTitle>Team Roles</CardTitle>
                <Row label="AI GTM Lead" value="Owns the full outreach infrastructure. Domain setup, lead prep, content writing, Lemlist campaign build, n8n SDR agent build for both email and WhatsApp." />
                <Row label="Outreach Manager (SDR)" value="Monitors Slack for AI-drafted replies, approves or rejects, updates Attio. Handles warm lead handoff, appointment reminders, and no-show follow-up. Reports to AI GTM Lead." />
              </Card>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
                {[
                  { num: "01", title: "Paid Ads", accent: "#C8F04D", bg: "#0A110A", items: ["Meta + Google custom audiences", "Uploaded from enriched contact list", "Success stories, case studies, awareness content", "Goal: warm the market before direct outreach lands"] },
                  { num: "02", title: "AI Outreach Agent", accent: "#88AAFF", bg: "#0A0A14", items: ["Email: 6-message sequence via Lemlist", "WhatsApp: 3-4 message sequence via Lemlist", "n8n SDR agent drafts replies → Slack → Outreach Manager approves", "Warm lead → appointment link → sales handoff"] },
                  { num: "03", title: "Direct Sales Sprint", accent: "#F0C84D", bg: "#110F0A", items: ["High score pool only", "Sales rep calls directly to set appointment", "Sprint format — focused list, time-boxed", "Rep sets and runs their own appointments"] },
                ].map(c => (
                  <div key={c.num} style={{ background: c.bg, border: `1px solid ${c.accent}33`, borderRadius: 12, padding: 20 }}>
                    <div style={{ color: c.accent, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Channel {c.num}</div>
                    <div style={{ color: "#F0F0F0", fontSize: 14, fontWeight: 700, marginBottom: 14, fontFamily: "Georgia, serif" }}>{c.title}</div>
                    {c.items.map((item, i) => (
                      <div key={i} style={{ color: "#888", fontSize: 12, lineHeight: 1.8, display: "flex", gap: 8 }}>
                        <span style={{ color: c.accent, flexShrink: 0 }}>·</span>{item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <Card>
                <CardTitle>Email Infrastructure (AI GTM Lead)</CardTitle>
                <Row label="Domain purchase" value="Winnr — max 5 email addresses per domain." />
                <Row label="Warmup" value="2–3 weeks on Winnr until health score is satisfactory. Warmed emails added to Lemlist as sender accounts." />
                <Row label="Sequence" value="6 emails per target segment, personalised by ICP and tech stack." />
              </Card>
              <Card>
                <CardTitle>WhatsApp Infrastructure (AI GTM Lead + Outreach Manager)</CardTitle>
                <Row label="Contact prep" value="Mobile numbers extracted and verified as active on WhatsApp before upload." />
                <Row label="Campaign setup" value="Outreach Manager creates template messages, uploads CSV manually per send, schedules campaign on Lemlist." />
                <Row label="Sequence" value="3–4 messages per target segment." />
              </Card>
              <Card>
                <CardTitle>AI SDR Agent — How It Works (n8n)</CardTitle>
                <Row label="Build" value="AI GTM Lead builds separate n8n agents for email and WhatsApp — each with localised prompt and objection handling logic." />
                <Row label="Reply flow" value="Prospect replies → agent drafts response → surfaces in dedicated Slack channel → Outreach Manager approves or rejects." />
                <Row label="CRM" value="Outreach Manager updates prospect status in Attio after every handled reply." />
              </Card>
              <Card style={{ border: "1px solid #C8F04D33", background: "#0A110A" }}>
                <CardTitle>Non-Responders — Cyclical Re-Outreach</CardTitle>
                <Row label="Who they are" value="Prospects who were in the AI outreach sequence but never replied at all — not warm leads, not in negotiation." />
                <Row label="Motion" value="Revisited and re-entered into a subsequent outreach cycle every few weeks. Think of it as cyclical execution rather than a one-shot campaign." />
                <Row label="Owner" value="AI GTM Lead manages the cycle. No manual effort required per prospect." />
              </Card>
              <Card style={{ border: "1px solid #F0C84D33", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">Outreach Manager — Role Evolution</CardTitle>
                <Row label="Current state" value="Outreach Manager handles both AI outreach replies and inbound MQL qualification — two streams, one person." />
                <Row label="Direction" value="Agents are being trained to reply and book appointments directly, scaling the productivity of what the role does today." />
                <Row label="Future state" value="As agents take over more of the reply and booking work, the Outreach Manager role can be repurposed into something higher-value." />
              </Card>
              <Card style={{ border: "1px solid #C8F04D33", background: "#0A110A" }}>
                <CardTitle>Warm Lead Handling & Handoff (Outreach Manager)</CardTitle>
                <Row label="Interest shown" value="Outreach Manager sends scheduling link for sales appointment." />
                <Row label="No booking after 1 day" value="Outreach Manager sends reminder." />
                <Row label="Still no booking after 1 more day" value="Sales follows up via direct call." />
                <Row label="Appointment booked" value="Deal created in Attio. Outreach Manager creates WhatsApp group with sales rep and the lead." />
                <Row label="Before appointment" value="Outreach Manager sends reminder to prospect." />
                <Row label="No-show" value="Outreach Manager follows up to reschedule." />
                <Row label="Overlap note" value="High score restaurants may appear in both AI outreach and direct sprint — first contact wins." />
              </Card>
            </div>
          )}

          {/* ── 04 MARKETING ── */}
          {active === "marketing" && (
            <div>
              <SectionHeader number="GTM · 05" title="Marketing Motion" subtitle="Two jobs: build the brand so restaurants already know us before outreach lands, and generate MQLs that feed the sales pipeline." color="#C8F04D" />

              <Card style={{ border: "1px solid #C8F04D33", background: "#0A110A" }}>
                <CardTitle>North Star Metric</CardTitle>
                <Row label="A win for marketing" value="Marketing Qualified Lead (MQL) — a restaurant that has expressed interest and is ready for the Outreach Manager to qualify." />
                <Row label="MQL target" value="Not yet formally defined." sub="⚠ Needs to be set and tied to the 130 deals/month July sales target. Work backwards from conversion rate to determine required MQL volume." />
                <Row label="Attribution" value="Volume known. Source attribution is loose — roughly tracked by channel, not cleanly measured." sub="⚠ Clean attribution needed as spend scales." />
              </Card>

              <Card>
                <CardTitle>Content Engine</CardTitle>
                <Row
                  label="TableTalk Newsletter"
                  value="Thought leadership on restaurant revenue playbook and F&B industry trends. Insight-driven. Jon's personal brand play."
                  sub="Audience: known contacts only — inquiries, churned merchants, existing clients. Not sent to cold prospects who have never been spoken to."
                />
                <Row
                  label="Instagram Content"
                  value="AI-generated explainer videos repurposed from TableTalk content. Educational and insight-driven. Building organic followership."
                  sub="Format: explainer and educational videos — not entertainment content."
                />
                <Row
                  label="Success Stories"
                  value="Featured in ads and outreach. Proof points matched to merchant archetype."
                />
              </Card>

              <Card>
                <CardTitle>Paid Ads — Primary MQL Driver</CardTitle>
                <Row label="Audiences" value="Three audience types running simultaneously:" />
                <Row label="1. Retargeting" value="Website visitors and email engagers. Highest intent audience — already aware of Oddle." />
                <Row label="2. Custom audiences" value="Uploaded email + phone numbers from enriched RevOps database. Targets restaurants already in the pipeline or known contacts." />
                <Row label="3. Broad ICP targeting" value="Meta and Google targeting against restaurant owner/operator profiles in target markets." />
                <Row label="Creative angles" value="Multiple ad angles run simultaneously — different value propositions shown to different segments. Success stories, product benefits, industry insights." />
                <Row label="Channels" value="Meta + Google." />
              </Card>

              <Card style={{ border: "1px solid #88AAFF33", background: "#0A0A14" }}>
                <CardTitle color="#88AAFF">Brand Check — Lead Magnet</CardTitle>
                <Row label="What it is" value="A free online tool that scans a restaurant's digital brand presence and generates a report." />
                <Row label="Report contents" value="Google review volume and rating, local and global keyword ranking, social media activity signal." />
                <Row label="How it generates leads" value="Restaurant fills in their details to receive the report. Oddle captures contact. Automated outreach message triggered immediately. Outreach Manager qualifies." />
                <Row label="Strategic role" value="Captures restaurants who would not otherwise find Oddle — turns brand curiosity into a contactable lead." />
                <Row label="URL" value="Pending — to be added." sub="⚠ Promotion strategy for Brand Check not yet defined. Should be featured prominently in ads, TableTalk, and Instagram." />
              </Card>

              <Card>
                <CardTitle>Inbound Lead Flow</CardTitle>
                <Row label="Entry points" value="Form fill on website, or WhatsApp click-to-chat." />
                <Row label="Immediate response" value="Automated WhatsApp message sent to the lead within seconds of form fill or WhatsApp initiation." />
                <Row label="Qualification" value="Outreach Manager picks up and qualifies. MQL confirmed → Sales Rep assigned." />
                <Row label="Conversion goal on website" value="Demo or consultation booking." />
              </Card>

              <Card style={{ border: "1px solid #F0C84D33", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">Open Gaps</CardTitle>
                <Row label="MQL target not set" value="Marketing has no defined monthly MQL target tied to the sales pipeline. Without this, marketing and sales are not properly connected." />
                <Row label="Attribution not clean" value="Volume is known but source is loosely tracked. As ad spend scales, this becomes a budget allocation problem." />
                <Row label="TableTalk reach limited" value="Currently only sent to known contacts. Cold prospects in the RevOps database are not receiving any content before outreach lands — a warm-up opportunity being missed." />
                <Row label="Brand Check promotion undefined" value="The lead magnet exists but there is no defined promotion strategy for it across ads, Instagram, or TableTalk." />
              </Card>
            </div>
          )}

          {/* ── 05 PITCH ── */}
          {active === "pitch" && (
            <div>
              <SectionHeader number="GTM · 06" title="The Pitch" subtitle="What happens in the room — and how we win consistently." color="#C8F04D" />
              <Card>
                <CardTitle>Pitch Structure</CardTitle>
                <Row label="Duration" value="30 to 45 minutes." />
                <Row label="Win rate" value="60%" sub="A deal is only marked lost when the restaurant explicitly declines. Everything else stays in active pipeline." />
                <Row label="Pre-call prep" value="Lead pre-enriched with tech stack. Prospecting guide tells rep which pain points to lead with." />
                <Row label="Proof points" value="Success stories matched to restaurant archetype — available to rep during pitch." />
                <Row label="Lead product" value="All Access sold leading with a single hero product. Singapore: Oddle Shop. Other markets: Oddle Reserve also used as lead-in." />
              </Card>
              <Card>
                <CardTitle>Post-Pitch Outcomes</CardTitle>
                <Row label="Won" value="Contract signed → Structured Handoff initiated immediately." />
                <Row label="In negotiation" value="Deal logged in Attio. Follow-Up Agent takes over." />
                <Row label="Lost" value="Marked rejected in Attio. Removed from active pipeline." />
              </Card>
              <Card style={{ border: "1px solid #F0C84D33", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">Sales Velocity & Targets</CardTitle>
                <Row label="Average close" value="~20 days from pitch to signed contract." />
                <Row label="Long tail" value="Some deals take up to 60 days — larger brands requiring internal sign-off." />
                <Row label="Rep target" value="10 signed deals per month per rep." />
                <Row label="March target" value="50 deals total." />
                <Row label="July target" value="130 deals total — new hires must be hired, trained and ramped by then." />
              </Card>
            </div>
          )}

          {/* ── 05 FOLLOW-UP AGENT ── */}
          {active === "followup" && (
            <div>
              <SectionHeader number="GTM · 07" title="Follow-Up Agent" subtitle="Keeps warm deals moving without the sales rep having to remember. Rep is only pulled in when a human touch is needed." color="#C8F04D" />
              <Card>
                <CardTitle>The Problem It Solves</CardTitle>
                <Row label="Root cause" value="Reps carry a rolling 90-day pipeline. As pitch volume grows, follow-ups on in-negotiation deals get dropped — not by neglect, but by crowding." />
                <Row label="Why deals go quiet" value="Owners drag their feet, got busy and forgot, feel no urgency, or are half-convinced and need one more push." />
                <Row label="Key insight" value="If it's still in negotiation, it is not a no. The agent's job is to remove friction and create urgency." />
              </Card>
              <Card>
                <CardTitle>Trigger Logic</CardTitle>
                <Row label="Principle" value="A combination of time-based, stage-based, and event-based triggers. Agent monitors all in-negotiation deals in Attio continuously." />
                <Row label="Trigger design" value="⚠ Specific timing and conditions to be defined by the team. Needs to cover: post-pitch no-response, contract sent but unsigned, and deals idle in negotiation." />
                <Row label="Channel logic" value="⚠ Channel sequencing (WhatsApp → Email → Call) and escalation rules to be defined by the team." />
              </Card>
              <Card>
                <CardTitle>Source of Truth</CardTitle>
                <Row label="System" value="Attio. All deal state lives here. Agent reads from and logs back to Attio automatically." />
                <Row label="Rep's view" value="Daily digest of deals that need personal attention — only what the agent couldn't move." />
              </Card>
            </div>
          )}

          {/* ── 06 HANDOFF ── */}
          {active === "handoff" && (
            <div>
              <SectionHeader number="Handoff · 08" title="Structured Handoff" subtitle="The single highest-leverage intervention point in the entire revenue loop. This is where GTM ends and CS begins." color="#F0C84D" />
              <Card style={{ border: "1px solid #F0C84D44", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">Why This Is the Seam</CardTitle>
                <Row label="The principle" value="Most retention issues originate in sales and marketing, not in product or CS. The expectations set during the sales process are the most important driver of LIR achievement." />
                <Row label="The gate" value="No handoff document = no onboarding begins. This is a hard gate enforced in Attio." />
                <Row label="Current status" value="Partially built in Attio. Some fields exist. Full template not yet enforced." sub="⚠ This is the most critical gap between the two playbooks right now." />
              </Card>
              <Card>
                <CardTitle color="#F0C84D">Handoff Document Fields (in Attio)</CardTitle>
                {[
                  ["Brand name & contacts", "Key decision maker, day-to-day operator, WhatsApp contacts.", "Ensures CS engages the right people."],
                  ["Pre-sign score", "Score from RevOps lead scoring model.", "Sets initial expectations for potential."],
                  ["Lead product", "Which product the merchant was primarily sold on.", "Determines onboarding sequence."],
                  ["Additional products discussed", "Other products mentioned or demoed during sales.", "Informs cross-sell timing."],
                  ["Merchant's stated goal", "What the merchant said they want to achieve — in their words.", "Anchors the 45-day review conversation."],
                  ["Promises made", "Any specific commitments from the sales rep.", "Prevents expectation gaps."],
                  ["Expected go-live date", "When merchant wants to be live.", "Sets onboarding SLA clock."],
                  ["Restaurant profile", "Cuisine, location(s), covers/day, avg check size, current tech.", "Enables best-in-class setup."],
                  ["Risk flags", "Any concerns raised during sales, competitor usage.", "Enables proactive intervention."],
                ].map(([label, value, sub]) => (
                  <Row key={label} label={label} value={value} sub={sub} />
                ))}
              </Card>
              <Card>
                <CardTitle color="#F0C84D">Handoff Call (Internal — 15 mins)</CardTitle>
                <Row label="Who" value="Sales rep + CSM + onboarding lead. Merchant is NOT on this call." />
                <Row label="Agenda" value="Sales rep walks the handoff doc. CSM clarifies merchant expectations. Onboarding lead confirms setup requirements and timeline. Agree on who sends the welcome message." />
              </Card>
              <Card>
                <CardTitle color="#F0C84D">Merchant Kick-Off (Within 24 Hours)</CardTitle>
                <Row label="Channel" value="WhatsApp message to merchant group chat from CSM." />
                <Row label="Content" value="Welcome + intro to CS team, onboarding timeline with specific dates, what merchant needs to prepare, first meeting scheduled." />
              </Card>
            </div>
          )}

          {/* ── 07 LIR ── */}
          {active === "lir" && (
            <div>
              <SectionHeader number="CS · 15" title="LIR Framework" subtitle="Leading Indicator of Retention. The single north star metric for the entire CS motion." color="#88AAFF" />
              <Card style={{ border: "1px solid #88AAFF44", background: "#0A0A14" }}>
                <CardTitle color="#88AAFF">Core Definition</CardTitle>
                <Row label="LIR achieved when" value="Monthly Product Value ≥ $215" sub="Within the first 30 days of going live." />
                <Row label="Formula" value="(Shop GMV × $0.50) + (Reserve Bookings × $2) + (Enrolments × $1)" />
                <Row label="Cohort target" value="60% of merchants hit LIR within 30 days of going live." />
                <Row label="Why it matters" value="LIR is the leading indicator — it tells us whether a merchant will renew before we see the lagging indicator of actual retention." />
              </Card>
              <Card>
                <CardTitle color="#88AAFF">Per-Product Standalone Thresholds</CardTitle>
                {[
                  ["Oddle Shop", "$500 GMV/month", "$1 GMV = $0.50 value → $250 value"],
                  ["Oddle Reserve", "100 bookings/month", "$2 per booking → $200 value"],
                  ["Oddle Enrolment", "200 enrolments/month", "$1 per enrolment → $200 value"],
                ].map(([product, threshold, logic]) => (
                  <Row key={product} label={product} value={threshold} sub={logic} />
                ))}
              </Card>
              <Card style={{ border: "1px solid #88AAFF33", background: "#0A0A14" }}>
                <CardTitle color="#88AAFF">Composite LIR (Multi-Product)</CardTitle>
                <Row label="The insight" value="A merchant struggling to hit LIR on a single product may be one additional product away from strong retention. Cross-selling is a retention play, not just a revenue play." />
                <Row label="Example" value="Shop $300 GMV ($150) + Reserve 50 bookings ($100) + Enrolment 100 ($100) = $350 total — exceeds $215 threshold even though none hit standalone LIR." />
              </Card>
              <Card>
                <CardTitle color="#88AAFF">LIR Cohort Dashboard</CardTitle>
                <Row label="Format" value="BigQuery → automated. Each row = cohort of merchants that went live in a given month. Each column = % achieving LIR by month 1, 2, 3 etc." />
                <Row label="Status" value="Being built right now." />
                <Row label="Priority" value="This should be the first slide in every board deck — ahead of revenue. It is the leading indicator of business health." />
              </Card>
            </div>
          )}

          {/* ── 08 ONBOARDING ── */}
          {active === "onboarding" && (
            <div>
              <SectionHeader number="CS · 14" title="Onboarding" subtitle="Day 0 to 5. Onboarding team owns this. Every setup decision is evaluated against its impact on LIR achievement." color="#88AAFF" />
              <Card>
                <CardTitle color="#88AAFF">SLAs — Non-Negotiable</CardTitle>
                <Row label="Oddle Reserve" value="Live within 2 working days." sub="Clock starts from when merchant provides all required materials." />
                <Row label="Oddle Shop" value="Live within 5 working days." />
                <Row label="Oddle Enrolment" value="Live within 5 working days." />
                <Row label="If merchant delays" value="Clock pauses — but team proactively chases within 48 hours." />
              </Card>
              <Card>
                <CardTitle color="#88AAFF">Best-in-Class Setup Standards</CardTitle>
                <Row label="Oddle Shop" value="Full menu with photos, optimised categories, upsell items configured, competitive delivery fees." sub="Menu structure: bundles first → signature sets → typical dishes." />
                <Row label="Oddle Reserve" value="Accurate floor plan, peak/off-peak booking rules, automated confirmations, booking widget on Google." />
                <Row label="Oddle Enrolment" value="Tiered rewards aligned to actual visit frequency, automated campaigns set, integration complete." />
              </Card>
              <Card>
                <CardTitle color="#88AAFF">Activation Checklist</CardTitle>
                <Row label="Social channels" value="Restaurant linked to their direct social media." />
                <Row label="Website integration" value="Oddle Shop connected to restaurant's website." />
                <Row label="Data import" value="If existing reservation system or customer database — import, launch EDM, activate." />
                <Row label="Stripe setup" value="Restaurant sets up own Stripe account, guided by Oddle team." />
              </Card>
              <Card>
                <CardTitle color="#88AAFF">Multi-Product Sequencing</CardTitle>
                <Row label="Day 1-2" value="Reserve goes live first — quick win while more complex setups are in progress." />
                <Row label="Day 1-5" value="Shop and Enrolment set up in parallel." />
                <Row label="Day 5" value="All products live. Activation phase begins." />
              </Card>
            </div>
          )}

          {/* ── 09 ACTIVATION ── */}
          {active === "activation" && (
            <div>
              <SectionHeader number="CS · 15" title="Activation" subtitle="Day 5 to 35. The highest-risk window. Merchant is live but usage not yet established. This is where LIR is won or lost." color="#88AAFF" />
              <Card style={{ border: "1px solid #88AAFF44", background: "#0A0A14" }}>
                <CardTitle color="#88AAFF">LIR Pacing Dashboard</CardTitle>
                <Row label="What" value="Real-time dashboard (BigQuery → automated) tracking each merchant's progress toward their LIR events." />
                <Row label="Who uses it" value="CSM reviews daily for their portfolio." />
                <Row label="Status" value="Being built right now." />
              </Card>
              <Card>
                <CardTitle color="#88AAFF">CSM Intervention Triggers</CardTitle>
                <Row label="Principle" value="CSM monitors LIR pacing dashboard daily and intervenes when merchants are off-track." />
                <Row label="Trigger design" value="⚠ Specific triggers (timing, thresholds, escalation logic) to be defined by the CS team." />
                <Row label="Setup issue" value="If low usage is traced to a setup problem — escalate to onboarding team for fix." />
              </Card>
              <Card>
                <CardTitle color="#88AAFF">Activation Levers by Product</CardTitle>
                <Row label="Oddle Shop" value="⚠ To be defined by the team — specific tactics for driving GMV toward LIR threshold." />
                <Row label="Oddle Reserve" value="⚠ To be defined by the team — specific tactics for driving booking volume toward LIR threshold." />
                <Row label="Oddle Enrolment" value="⚠ To be defined by the team — specific tactics for driving enrolment volume toward LIR threshold." />
              </Card>
            </div>
          )}

          {/* ── 10 45-DAY REVIEW ── */}
          {active === "review" && (
            <div>
              <SectionHeader number="CS · 14" title="45-Day Review" subtitle="The most important checkpoint in the merchant lifecycle. Assess LIR, build the relationship, identify cross-sell." color="#88AAFF" />
              <Card style={{ border: "1px solid #88AAFF44", background: "#0A0A14" }}>
                <CardTitle color="#88AAFF">Review Structure</CardTitle>
                <Row label="Format" value="Auto-generated deck (BigQuery → template). CSM presents, doesn't build from scratch." />
                <Row label="Status" value="Automation planned — Phase 2, week 5-8." />
                <Row label="Agenda" value="LIR achievement vs target, product usage breakdown, what's working, what isn't, cross-sell opportunity analysis. Next steps agreed based on tier outcome — KAM gets a strategic plan, PV-Scaled gets content motion activated." />
              </Card>
              <Card>
                <CardTitle color="#88AAFF">Decision Gate — Tiering</CardTitle>
                <Row label="Assessment" value="Merchant assessed against 2×2 matrix (potential score vs current ability). Two outcomes." />
                <Row label="Top 20%" value="→ KAM. Dedicated account manager, quarterly business reviews, strategic growth planning." sub="⚠ CS → KAM handoff mechanics (handoff document, introduction, transition process) to be addressed in the KAM Playbook." />
                <Row label="Everyone else" value="→ PV-driven scaled motion. Smart, insightful reports sent to the merchant — data that drives action and inspires them to hit milestones. Content targeted by highest unrealised product PV. Expansion Role escalation when PV threshold crossed." />
                <Row label="Fail — no LIR" value="→ Content-driven recovery motion. Same approach as the Bottom 800 — targeted content to educate and drive adoption of the right product. Expansion Role escalates when PV threshold is crossed." />
              </Card>
              <Card>
                <CardTitle color="#88AAFF">Cross-Sell at 45 Days</CardTitle>
                <Row label="Single product, LIR achieved" value="CSM presents opportunity analysis — projected value from adding second product." />
                <Row label="Single product, LIR not achieved" value="Show how adding a second product could close the LIR gap. Retention framing, not sales framing." />
              </Card>
            </div>
          )}

          {/* ── 11 TIERING ── */}
          {active === "tiering" && (
            <div>
              <SectionHeader number="CS · 15" title="Scoring & Tiering" subtitle="The 2×2 matrix routes every merchant to the right engagement model. Potential vs current ability." color="#88AAFF" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                {[
                  { title: "High Potential + High Performance", label: "Hidden Champions", desc: "KAM-led. Drive multi-product adoption and reference account status. Quarterly business reviews.", color: "#4ADE80", tier: "KAM" },
                  { title: "Low Potential + High Performance", label: "Overperformers", desc: "Exceeding predicted potential — move up to KAM. The scoring model missed something. Feed data back to RevOps.", color: "#4ADE80", tier: "KAM" },
                  { title: "High Potential + Low Performance", label: "Hidden Gems ⚠", desc: "High PV signal triggers escalation to Expansion Role for diagnostic. 30-day recovery plan.", color: "#F0C84D", tier: "PV-Scaled → Expansion" },
                  { title: "Low Potential + Low Performance", label: "Nurture", desc: "PV-targeted scaled content. Email + WhatsApp segmented by highest unrealised product PV. Surfaces to Expansion Role if they engage.", color: "#F87171", tier: "PV-Scaled" },
                ].map(q => (
                  <div key={q.title} style={{ background: "#111", border: `1px solid ${q.color}33`, borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 10, color: q.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{q.tier}</div>
                    <div style={{ color: "#F0F0F0", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{q.label}</div>
                    <div style={{ color: "#AAA", fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>{q.title}</div>
                    <div style={{ color: "#666", fontSize: 12, lineHeight: 1.6 }}>{q.desc}</div>
                  </div>
                ))}
              </div>
              <Card>
                <CardTitle color="#88AAFF">Tier Definitions — Post 45-Day Review</CardTitle>
                <Row label="First 45 days — all merchants" value="CSM owns this window without exception. Onboarding, activation, LIR drive. No tiering yet." />
                <Row label="Tier 1 — KAM (top 20%)" value="Dedicated KAM. Quarterly business reviews, strategic growth planning, priority support." />
                <Row label="Tier 2 — PV-Driven Scaled Motion (everyone else)" value="Smart, insightful reports and PV-targeted content for all non-KAM merchants. Reports are designed to drive action and inspire merchants to hit milestones — not generic updates. Content segmented by each merchant's highest unrealised product PV. When PV signal crosses a threshold, Expansion Role escalates to human follow-up." sub="No distinction between middle 50% and bottom 30% — the PV engine handles segmentation automatically." />
              </Card>
              <Card style={{ border: "1px solid #F0C84D33", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">⚠ New Role — Product Expansion (Seat to Design)</CardTitle>
                <Row label="What they own" value="Product adoption and expansion for all non-KAM merchants where PV threshold is crossed. Not onboarding, not strategic account management." />
                <Row label="Trigger" value="Merchant's PV for a second product crosses a defined threshold. System escalates automatically." />
                <Row label="Channel" value="Email and WhatsApp primarily. Human engagement reserved for high-PV escalations." />
                <Row label="Why not CSM" value="CSM will have their plate full with new merchant onboarding as acquisition scales. This keeps CS focused on activation and LIR." />
                <Row label="Status" value="Seat designed. Not yet filled. PV-driven scaled motion runs in the interim." />
              </Card>
              <Card style={{ border: "1px solid #F0C84D33", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">Hidden Gems — Recovery Motion</CardTitle>
                <Row label="Who owns it" value="Not the CSM. After 45 days, this is a content-driven motion — same approach as the Bottom 800. The right content is sent to educate and encourage adoption of the next product." />
                <Row label="Escalation" value="When PV threshold for a specific product is crossed, the Expansion Role is triggered for human follow-up." />
                <Row label="Root causes to investigate" value="Setup issue (product not configured optimally), awareness issue (merchant not promoting to customers), execution issue (staff not trained), expectation issue (sales promises not met)." />
                <Row label="Recovery trigger" value="⚠ Specific recovery logic and escalation thresholds to be defined by the team." />
              </Card>
            </div>
          )}

          {/* ── 12 CROSS-SELL ── */}
          {active === "crosssell" && (
            <div>
              <SectionHeader number="CS · 14" title="Cross-Sell Engine" subtitle="Activating products merchants already have access to. Currently a gap — this is the design." color="#88AAFF" />
              <Card style={{ border: "1px solid #88AAFF44", background: "#0A0A14" }}>
                <CardTitle color="#88AAFF">The Strategic Framing</CardTitle>
                <Row label="Not a sales motion" value="With All Access, every merchant already has access to all products. Cross-sell is about activation, not selling a new contract." />
                <Row label="Retention framing" value="Multi-product merchants are structurally stickier. If Shop GMV dips one month, Reserve bookings may compensate. Cross-sell is a retention play first." />
                <Row label="45-day review cross-sell" value="The cross-sell conversation at the 45-day mark lives in Section 12 — 45-Day Review. This section covers what happens after that, on an ongoing automated basis." />
              </Card>
              <Card>
                <CardTitle color="#88AAFF">Ongoing Cross-Sell Triggers (Post 45-Day Review)</CardTitle>
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 80px", gap: 12, paddingBottom: 8, borderBottom: "1px solid #222" }}>
                    {["Trigger", "Condition", "Action", "Channel"].map(h => (
                      <div key={h} style={{ fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</div>
                    ))}
                  </div>
                  {[
                    ["LIR Gap", "1 product, LIR not achieved", "Show how adding a second product could close the LIR gap", "CSM-led"],
                    ["Usage Spike", "One product performing well above benchmark", "Suggest complementary product (e.g. high Shop GMV → Reserve for dine-in)", "Automated"],
                    ["Seasonal Trigger", "Approaching peak period", "Product-specific content on maximising the season", "Email sequence"],
                    ["Peer Benchmark", "Similar restaurants using multiple products", "Anonymised benchmarks as social proof", "Automated email"],
                  ].map(([trigger, condition, action, channel]) => (
                    <div key={trigger} style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 80px", gap: 12, borderBottom: "1px solid #1A1A1A", padding: "11px 0" }}>
                      <div style={{ color: "#88AAFF", fontSize: 12, fontWeight: 600 }}>{trigger}</div>
                      <div style={{ color: "#AAA", fontSize: 12 }}>{condition}</div>
                      <div style={{ color: "#E8E8E8", fontSize: 12 }}>{action}</div>
                      <div style={{ color: "#666", fontSize: 11 }}>{channel}</div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <CardTitle color="#88AAFF">3-Channel Content Engine</CardTitle>
                <Row label="Email sequences" value="Week 6: case study from similar restaurant. Week 8: personalised projection ('Product X could add $Y/month'). Week 10: CTA to activate." />
                <Row label="WhatsApp broadcast" value="Bi-weekly content drops — success stories, best practices, soft product introductions, seasonal playbooks." />
                <Row label="CSM-led (reviews)" value="Auto-generated opportunity analysis slide. CSM presents data, doesn't build the case from scratch." />
              </Card>
            </div>
          )}

          {/* ── 13 REVOPS FEEDBACK ── */}
          {active === "revops" && (
            <div>
              <SectionHeader number="CS · 15" title="RevOps Feedback Loop" subtitle="The scoring model is only as good as its ability to predict outcomes. This loop is what makes it improve over time." color="#88AAFF" />
              <Card>
                <CardTitle color="#88AAFF">What Feeds Back to RevOps</CardTitle>
                <Row label="LIR by lead score band" value="Are high-scored leads actually achieving LIR? If not, the scoring model is wrong." />
                <Row label="Hidden Gems" value="High potential, low performance. The model overweighted certain signals — which ones?" />
                <Row label="Overperformers" value="Low potential, high performance. What did the scoring model miss?" />
                <Row label="Time to LIR by segment" value="Which segments achieve LIR fastest? This should inform sales targeting." />
                <Row label="Churn reasons" value="Why are merchants leaving? Does this correlate with any pre-sign signals?" />
              </Card>
              <Card>
                <CardTitle color="#88AAFF">Feedback Cadence</CardTitle>
                <Row label="Monthly" value="Automated dashboard — LIR achievement by lead score band, segment, and product. Shared with RevOps automatically." />
                <Row label="Quarterly" value="CS + RevOps alignment meeting. Review 2×2 matrix, identify scoring model improvements, agree on targeting adjustments." />
                <Row label="Ad hoc" value="CSMs flag individual cases where scoring was significantly off — via a structured form in Attio." />
              </Card>
              <Card style={{ border: "1px solid #88AAFF33", background: "#0A0A14" }}>
                <CardTitle color="#88AAFF">The Virtuous Cycle</CardTitle>
                <div style={{ color: "#AAA", fontSize: 13, lineHeight: 2, textAlign: "center", padding: "8px 0" }}>
                  Better scoring → Better targeting → Higher-quality sign-ups<br />
                  → Higher LIR achievement → Better retention → More data → Better scoring
                </div>
                <Row label="Long-term goal" value="Pre-sign potential score converges with actual current ability — sales is consistently signing merchants who succeed." />
              </Card>
            </div>
          )}

          {/* ── BOTTOM 800 ── */}
          {active === "bottom800" && (
            <div>
              <SectionHeader number="Playbook" title="Bottom 800 Playbook" subtitle="Converting existing legacy merchants to All Access. One motion, PV-personalised content, human closer triggered by intent signal." color="#F0C84D" />

              <Card style={{ border: "1px solid #F0C84D44", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">Context</CardTitle>
                <Row label="Who they are" value="~800 existing merchants on legacy pay-as-you-use plans. Mostly Oddle Shop only. All three activity states present — active, semi-active, dormant." />
                <Row label="Why they've been neglected" value="The old usage model gave the team no incentive to service low-paying clients. This was rational under the old structure, not a failure of execution." />
                <Row label="The opportunity" value="At least 2x revenue upside per merchant if migrated to All Access. PV analysis will show exactly which product to lead with per merchant." />
                <Row label="Clean list status" value="All 800 are in Attio. Ready to segment and activate." />
              </Card>

              <Card>
                <CardTitle color="#F0C84D">Segmentation — PV-Driven</CardTitle>
                <Row label="Step 1" value="Pull all 800 from Attio. For each merchant, compute unrealised PV per product (Reserve PV, Enrolment PV) based on their restaurant profile." />
                <Row label="Step 2" value="Rank each merchant by their highest unrealised product PV. This determines which product to lead with in content and pitch." />
                <Row label="Step 3" value="Assign each merchant to a content track — Reserve track, Enrolment track, or multi-product track for merchants with high PV across more than one product." />
                <Row label="Note" value="Active, semi-active and dormant merchants receive the same motion. Activity state does not change the message — PV profile does." sub="⚠ Per-product PV formula pending. Segmentation cannot begin until this is defined." />
              </Card>

              <Card>
                <CardTitle color="#F0C84D">Content Sequence (EDM + WhatsApp)</CardTitle>
                <Row label="Principle" value="Educate first, convert second. The content engine warms the merchant. The human closer converts when intent is shown." />
                <Row label="Channel" value="EDM as primary. WhatsApp as secondary for merchants with active WhatsApp contacts in Attio." />
                <Row label="Sequence design" value="⚠ To be designed by the team. Structure, cadence, and messaging per PV track (Reserve, Enrolment, multi-product) to be defined." />
              </Card>

              <Card style={{ border: "1px solid #88AAFF33", background: "#0A0A14" }}>
                <CardTitle color="#88AAFF">Intent Signal → Human Closer</CardTitle>
                <Row label="Trigger" value="Merchant replies to an email or WhatsApp message, clicks the CTA, or responds positively at any point in the sequence." />
                <Row label="Action" value="Intent flagged in Attio automatically. Merchant routed to a human closer for the All Access migration conversation." />
                <Row label="Who closes" value="⚠ Not yet decided. Options: existing sales rep (capacity permitting), Expansion Role once filled, or a dedicated migration rep." />
                <Row label="The conversation" value="Not a new sale — a migration. Merchant already uses Oddle. The closer explains what All Access replaces, what it adds, and what the new pricing means for them specifically." />
              </Card>

              <Card>
                <CardTitle color="#F0C84D">All Access Migration</CardTitle>
                <Row label="What changes" value="Legacy pay-as-you-use plan replaced by All Access subscription. All products activated, not just Shop." />
                <Row label="What stays" value="Existing Oddle Shop setup, order history, merchant data — nothing is lost." />
                <Row label="Second product activation" value="Led by the product with the merchant's highest unrealised PV. Onboarding for the new product follows the same SLAs as new merchant onboarding." />
                <Row label="Post-migration" value="Merchant enters the standard CS tiering model. 45-day review applies from the date of migration. LIR assessed on new All Access plan." />
              </Card>

              <Card style={{ border: "1px solid #F0C84D33", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">Open Gaps</CardTitle>
                <Row label="Per-product PV formula" value="Segmentation cannot start until this is defined. Blocking the entire motion." />
                <Row label="Human closer not assigned" value="Who handles the All Access migration conversation is undecided. Needs to be resolved before the content sequence can meaningfully run — otherwise warm leads have nowhere to go." />
                <Row label="No MQL equivalent defined" value="What constitutes a conversion-ready signal from the 800 needs to be defined so Attio can route them correctly." />
                <Row label="Content not yet written" value="The content sequence needs to be written per product track (Reserve, Enrolment, multi-product). Likely a marketing + AI GTM Lead collaboration." />
                <Row label="Concurrent with new acquisition" value="This motion runs in parallel with the GTM new acquisition engine. Marketing Lead is currently at capacity on new acquisition — content creation for this sequence needs a dedicated allocation." />
              </Card>
            </div>
          )}

          {/* ── KAM PLAYBOOK ── */}
          {active === "kam" && (
            <div>
              <SectionHeader number="Playbook" title="KAM Playbook" subtitle="Strategic account management for the top 20% of merchants post-45-day review. Pending — being designed by the team." color="#F0C84D" />
              <Card style={{ border: "1px solid #F0C84D44", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">What This Playbook Should Cover</CardTitle>
                <Row label="CS → KAM handoff" value="Handoff document, merchant introduction process, context transfer. Equivalent to the sales → CS handoff in Section 08." />
                <Row label="KAM engagement model" value="Cadence, format, and agenda for quarterly business reviews. What a KAM does in each touchpoint." />
                <Row label="Data-driven insights motion" value="How the KAM uses Oddle data to generate insights and recommend actions to the merchant." />
                <Row label="Oddle Eats campaigns" value="How platform-level campaigns are proposed, co-created, and measured with KAM accounts." />
                <Row label="Multi-product expansion" value="How the KAM drives adoption of additional products within the account beyond the lead product." />
                <Row label="Revenue targets" value="How KAM performance is measured — GMV growth, product expansion, retention rate." />
              </Card>
              <Card style={{ border: "1px solid #F0C84D33", background: "#0F0E0A" }}>
                <CardTitle color="#F0C84D">Status</CardTitle>
                <Row label="Current state" value="⚠ Pending. Colleague is working on a draft. Existing Notion docs (HK 2024, TW 2022) are outdated and not aligned to the All Access model." />
                <Row label="Blocking" value="CS → KAM handoff mechanics cannot be finalised until this playbook defines what the KAM receives and how the transition works." />
                <Row label="Notion page" value="Placeholder created in GTM Home Space — ready for the team to build into." />
              </Card>
            </div>
          )}

          {/* ── FULL FLOW ── */}
          {active === "fullflow" && (
            <div>
              <SectionHeader number="Master · 16" title="Full Revenue Loop" subtitle="End to end — from TAM crawl to RevOps feedback. One loop. Two playbooks. One seam." color="#FF8888" />

              {/* ── VISUAL DIAGRAM ── */}
              <div style={{ background: "#0D0D0D", border: "1px solid #1E1E1E", borderRadius: 14, padding: "32px 24px", marginBottom: 24, overflowX: "auto" }}>

                {/* GTM label */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 3, height: 16, background: "#C8F04D", borderRadius: 2 }} />
                  <div style={{ fontSize: 10, color: "#C8F04D", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>GTM — New Acquisition</div>
                </div>

                {/* Row 1: TAM → Enrich → Outreach */}
                <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 0 }}>
                  {[
                    { n: "1", title: "TAM Crawl", sub: "RevOps scores all restaurants", color: "#C8F04D" },
                    null,
                    { n: "2", title: "Enrich Contacts", sub: "Email, phone, owner number", color: "#C8F04D" },
                    null,
                    { n: "3", title: "3-Channel Outreach", sub: "Ads · AI Agent · Direct Sprint", color: "#C8F04D" },
                  ].map((node, i) => node === null ? (
                    <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                      <div style={{ width: 24, height: 1, background: "#2A2A2A" }} />
                      <div style={{ color: "#2A2A2A", fontSize: 14 }}>▶</div>
                    </div>
                  ) : (
                    <div key={i} style={{ flex: 1, background: "#111", border: `1px solid ${node.color}33`, borderRadius: 8, padding: "10px 14px", minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: node.color + "22", border: `1px solid ${node.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: node.color, flexShrink: 0 }}>{node.n}</div>
                        <div style={{ color: "#F0F0F0", fontSize: 12, fontWeight: 600 }}>{node.title}</div>
                      </div>
                      <div style={{ color: "#666", fontSize: 11 }}>{node.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Arrow down from Outreach */}
                <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "0%" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "33%", padding: "6px 0" }}>
                    <div style={{ width: 1, height: 16, background: "#2A2A2A" }} />
                    <div style={{ color: "#2A2A2A", fontSize: 12, lineHeight: 0.5 }}>▼</div>
                  </div>
                </div>

                {/* Row 2: Chloe + Pitch */}
                <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 0 }}>
                  <div style={{ flex: 1 }} /> {/* spacer */}
                  <div style={{ flex: 1 }} /> {/* spacer */}
                  <div style={{ flex: 1, background: "#111", border: "1px solid #C8F04D33", borderRadius: 8, padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#C8F04D22", border: "1px solid #C8F04D55", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#C8F04D", flexShrink: 0 }}>C</div>
                      <div style={{ color: "#F0F0F0", fontSize: 12, fontWeight: 600 }}>Outreach Manager</div>
                    </div>
                    <div style={{ color: "#666", fontSize: 11 }}>Books appointments from AI replies</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 24, height: 1, background: "#2A2A2A" }} />
                    <div style={{ color: "#2A2A2A", fontSize: 14 }}>▶</div>
                  </div>
                  <div style={{ flex: 1, background: "#111", border: "1px solid #C8F04D33", borderRadius: 8, padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#C8F04D22", border: "1px solid #C8F04D55", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#C8F04D", flexShrink: 0 }}>4</div>
                      <div style={{ color: "#F0F0F0", fontSize: 12, fontWeight: 600 }}>Pitch & Close</div>
                    </div>
                    <div style={{ color: "#666", fontSize: 11 }}>60% win rate · 30-45 mins</div>
                  </div>
                </div>

                {/* Branch row: Won / Negotiation / Lost */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ width: "66.5%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 1, height: 12, background: "#2A2A2A" }} />
                    <div style={{ color: "#2A2A2A", fontSize: 12, lineHeight: 0.5 }}>▼</div>
                    <div style={{ display: "flex", width: "100%", gap: 8, marginTop: 6 }}>
                      {[
                        { label: "Won", desc: "→ Handoff", color: "#4ADE80" },
                        { label: "Negotiation", desc: "→ Follow-Up Agent", color: "#F0C84D" },
                        { label: "Lost", desc: "Rejected in Attio", color: "#F87171" },
                      ].map(b => (
                        <div key={b.label} style={{ flex: 1, background: b.color + "11", border: `1px solid ${b.color}33`, borderRadius: 6, padding: "7px 10px", textAlign: "center" }}>
                          <div style={{ color: b.color, fontSize: 11, fontWeight: 700 }}>{b.label}</div>
                          <div style={{ color: "#555", fontSize: 10, marginTop: 2 }}>{b.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Handoff seam */}
                <div style={{ margin: "20px 0 16px", borderTop: "2px dashed #F0C84D44", position: "relative" }}>
                  <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#0D0D0D", padding: "0 12px", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ color: "#F0C84D", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>⬡ Structured Handoff — The Seam</div>
                  </div>
                </div>

                {/* CS label */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, marginTop: 4 }}>
                  <div style={{ width: 3, height: 16, background: "#88AAFF", borderRadius: 2 }} />
                  <div style={{ fontSize: 10, color: "#88AAFF", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>CS — Activation & Retention</div>
                </div>

                {/* Row 3: Onboarding → Activation → 45-Day Review */}
                <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 0 }}>
                  {[
                    { n: "5", title: "Onboarding", sub: "Day 0–5 · SLAs · Setup", color: "#88AAFF" },
                    null,
                    { n: "6", title: "Activation", sub: "Day 5–35 · LIR pacing", color: "#88AAFF" },
                    null,
                    { n: "7", title: "45-Day Review", sub: "LIR check · Tier assigned", color: "#88AAFF" },
                  ].map((node, i) => node === null ? (
                    <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                      <div style={{ width: 24, height: 1, background: "#2A2A2A" }} />
                      <div style={{ color: "#2A2A2A", fontSize: 14 }}>▶</div>
                    </div>
                  ) : (
                    <div key={i} style={{ flex: 1, background: "#111", border: `1px solid ${node.color}33`, borderRadius: 8, padding: "10px 14px", minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: node.color + "22", border: `1px solid ${node.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: node.color, flexShrink: 0 }}>{node.n}</div>
                        <div style={{ color: "#F0F0F0", fontSize: 12, fontWeight: 600 }}>{node.title}</div>
                      </div>
                      <div style={{ color: "#666", fontSize: 11 }}>{node.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Arrow down + tier branches */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ width: "33%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 1, height: 12, background: "#2A2A2A" }} />
                    <div style={{ color: "#2A2A2A", fontSize: 12, lineHeight: 0.5 }}>▼</div>
                    <div style={{ display: "flex", width: "100%", gap: 8, marginTop: 6 }}>
                      {[
                        { label: "KAM", desc: "Top 20%", color: "#4ADE80" },
                        { label: "PV-Scaled", desc: "Everyone else", color: "#88AAFF" },
                      ].map(b => (
                        <div key={b.label} style={{ flex: 1, background: b.color + "11", border: `1px solid ${b.color}33`, borderRadius: 6, padding: "7px 10px", textAlign: "center" }}>
                          <div style={{ color: b.color, fontSize: 11, fontWeight: 700 }}>{b.label}</div>
                          <div style={{ color: "#555", fontSize: 10, marginTop: 2 }}>{b.desc}</div>
                        </div>
                      ))}
                    </div>
                    {/* Bottom 800 branch */}
                    <div style={{ width: 1, height: 10, background: "#2A2A2A", marginTop: 8 }} />
                    <div style={{ color: "#2A2A2A", fontSize: 12, lineHeight: 0.5 }}>▼</div>
                    <div style={{ marginTop: 6, background: "#1A0F0A", border: "1px dashed #F0C84D44", borderRadius: 6, padding: "7px 12px", textAlign: "center", width: "100%" }}>
                      <div style={{ color: "#F0C84D", fontSize: 11, fontWeight: 700 }}>Bottom 800 Pool</div>
                      <div style={{ color: "#555", fontSize: 10, marginTop: 2 }}>Playbook to be designed</div>
                    </div>
                  </div>
                </div>

                {/* Feedback seam */}
                <div style={{ margin: "20px 0 16px", borderTop: "1px dashed #FF888844", position: "relative" }}>
                  <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#0D0D0D", padding: "0 12px" }}>
                    <div style={{ color: "#FF8888", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>↺ RevOps Feedback Loop</div>
                  </div>
                </div>

                {/* Row 4: Cross-sell + RevOps feedback */}
                <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  {[
                    { n: "8", title: "Ongoing Engagement", sub: "KAM · Expansion Role · Scaled", color: "#88AAFF" },
                    null,
                    { n: "9", title: "Cross-Sell Engine", sub: "Activate unused products", color: "#88AAFF" },
                    null,
                    { n: "↺", title: "RevOps Feedback", sub: "LIR data → scoring model", color: "#FF8888" },
                  ].map((node, i) => node === null ? (
                    <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                      <div style={{ width: 24, height: 1, background: "#2A2A2A" }} />
                      <div style={{ color: "#2A2A2A", fontSize: 14 }}>▶</div>
                    </div>
                  ) : (
                    <div key={i} style={{ flex: 1, background: "#111", border: `1px solid ${node.color}33`, borderRadius: 8, padding: "10px 14px", minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", background: node.color + "22", border: `1px solid ${node.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: node.color, flexShrink: 0 }}>{node.n}</div>
                        <div style={{ color: "#F0F0F0", fontSize: 12, fontWeight: 600 }}>{node.title}</div>
                      </div>
                      <div style={{ color: "#666", fontSize: 11 }}>{node.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Loop back arrow note */}
                <div style={{ marginTop: 16, textAlign: "right" }}>
                  <span style={{ fontSize: 11, color: "#333", fontStyle: "italic" }}>RevOps feedback improves scoring → better targeting → higher LIR rates → loop repeats</span>
                </div>
              </div>

              {/* Adjacent Playbooks */}
              <div style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 11, color: "#555", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Adjacent Playbooks</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { title: "KAM Playbook", status: "Live", desc: "Post-handoff from CSM. Data-driven account growth, Oddle Eats campaigns, insights to action.", color: "#88AAFF" },
                    { title: "Bottom 800 Playbook", status: "Planned", desc: "Nurture + All Access conversion for existing low-tier single-product merchants. Concurrent with GTM.", color: "#F0C84D" },
                  ].map(p => (
                    <div key={p.title} style={{ background: "#0A0A0A", border: `1px solid ${p.color}33`, borderRadius: 8, padding: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ color: "#F0F0F0", fontSize: 14, fontWeight: 600 }}>{p.title}</div>
                        <StatusBadge status={p.status} />
                      </div>
                      <div style={{ color: "#666", fontSize: 12, lineHeight: 1.6 }}>{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── 15 BUILD TRACKER ── */}
          {active === "tracker" && (
            <div>
              <SectionHeader number="Master · 17" title="Build Tracker" subtitle="What's live, what's in progress, what hasn't started. Every gap is visible." color="#FF8888" />
              <Card>
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 90px 100px", gap: 16, paddingBottom: 10, borderBottom: "1px solid #222" }}>
                  {["Area", "Item", "Status", "Owner"].map(h => (
                    <div key={h} style={{ fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</div>
                  ))}
                </div>
                <TrackerRow area="GTM — Data" item="TAM crawl & restaurant universe" status="Live" owner="RevOps" />
                <TrackerRow area="GTM — Data" item="Brand power scoring (Google + Instagram)" status="Live" owner="RevOps" />
                <TrackerRow area="GTM — Data" item="Contact enrichment (email + phone)" status="Live" owner="RevOps" />
                <TrackerRow area="GTM — Data" item="Voice agent — owner number extraction" status="Live" owner="RevOps / AI" />
                <TrackerRow area="GTM — Outreach" item="Paid Ads (Meta + Google custom audiences)" status="Live" owner="Marketing" />
                <TrackerRow area="GTM — Outreach" item="AI Email + WhatsApp outreach agent (n8n + Lemlist)" status="In Progress" owner="AI GTM Lead" note="n8n SDR agents, Lemlist campaigns, Slack approval flow" />
                <TrackerRow area="GTM — Outreach" item="Direct sales sprint (high score pool)" status="Live" owner="Sales" />
                <TrackerRow area="GTM — Outreach" item="Outreach Manager (SDR) role" status="Live" owner="Outreach Manager" />
                <TrackerRow area="GTM — Pipeline" item="Follow-Up Agent (in-negotiation deals)" status="Planned" owner="AI / Sales" note="Design complete, not yet built" />
                <TrackerRow area="GTM — Pipeline" item="Attio pipeline hygiene (all reps)" status="In Progress" owner="Sales Lead" />
                <TrackerRow area="Handoff" item="Handoff document template in Attio" status="In Progress" owner="Sales + CS Ops" note="Some fields exist, not fully enforced" />
                <TrackerRow area="Handoff" item="Internal handoff call (15 mins)" status="Planned" owner="Sales + CSM" note="Process not yet formalised" />
                <TrackerRow area="CS — Data" item="LIR pacing dashboard (BigQuery)" status="In Progress" owner="CS Ops / Data" />
                <TrackerRow area="CS — Data" item="LIR cohort dashboard (monthly)" status="Planned" owner="CS Ops / Data" note="Phase 2, weeks 5-8" />
                <TrackerRow area="CS — Data" item="2×2 tiering matrix thresholds defined" status="In Progress" owner="CS Ops" note="Roughly defined, not documented" />
                <TrackerRow area="CS — Process" item="Team alignment + training on CS workflow" status="Gap" owner="Jon / CS Lead" note="Team hasn't seen v2.0 yet" />
                <TrackerRow area="CS — Process" item="45-day review deck (auto-generated)" status="Planned" owner="CS Ops / Data" note="Phase 2, weeks 5-8" />
                <TrackerRow area="CS — Process" item="Automated at-risk + off-track alerts" status="Planned" owner="CS Ops" note="Phase 2" />
                <TrackerRow area="CS — Growth" item="Cross-sell email sequences (6/8/10 week)" status="Planned" owner="Marketing + CS" note="Phase 3, weeks 9-12" />
                <TrackerRow area="CS — Growth" item="WhatsApp content calendar (bi-weekly)" status="Planned" owner="Marketing + CS" note="Phase 3" />
                <TrackerRow area="CS — Growth" item="Opportunity analysis slide in review deck" status="Planned" owner="CS Ops" note="Phase 3" />
                <TrackerRow area="Feedback Loop" item="RevOps monthly LIR dashboard" status="Planned" owner="CS Ops + RevOps" note="Phase 4, weeks 13+" />
                <TrackerRow area="Feedback Loop" item="Quarterly CS + RevOps alignment cadence" status="Planned" owner="Jon / CS + RevOps" note="Phase 4" />
                <TrackerRow area="Adjacent" item="Bottom 800 Playbook" status="Gap" owner="Jon" note="To be designed — no owner, no motion yet" />
                <TrackerRow area="Adjacent" item="KAM Playbook" status="Live" owner="KAM Lead" note="Exists separately" />
              </Card>
              <div style={{ background: "#0F0A0A", border: "1px solid #F8717133", borderRadius: 12, padding: 20, marginTop: 8 }}>
                <div style={{ fontSize: 11, color: "#F87171", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Critical Gaps — Act First</div>
                {[
                  ["Team has not seen or been trained on CS Workflow v2.0", "This is a blocker for everything downstream. Alignment session needed this week."],
                  ["Handoff document not fully enforced in Attio", "The seam between GTM and CS is broken. Without this, CSM flies blind on every new merchant."],
                  ["Bottom 800 has no owner and no motion", "Two and a half months post All Access launch. This gap is compounding quietly."],
                  ["Follow-Up Agent not yet built", "In-negotiation deals are being dropped. Pipeline is leaking."],
                ].map(([gap, note]) => (
                  <div key={gap} style={{ borderBottom: "1px solid #2A1A1A", padding: "10px 0" }}>
                    <div style={{ color: "#F87171", fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{gap}</div>
                    <div style={{ color: "#666", fontSize: 12 }}>{note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
