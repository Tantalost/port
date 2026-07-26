<script setup>
import { ref } from 'vue'
import { useSmoothScroll } from './composables/useSmoothScroll.js'
import WatchdogBoot from './components/WatchdogBoot.vue'
import AsciiField from './components/AsciiField.vue'
import TerminalIntro from './components/TerminalIntro.vue'
import WordCycler from './components/WordCycler.vue'
import SectionHead from './components/SectionHead.vue'
import CertCard from './components/CertCard.vue'
import ExperienceLog from './components/ExperienceLog.vue'
import AchievementsPanel from './components/AchievementsPanel.vue'
import SignOff from './components/SignOff.vue'
import MarginRail from './components/MarginRail.vue'

const wrapper = ref(null)
const content = ref(null)
const { progress } = useSmoothScroll(wrapper, content, { ease: 0.09 })
const booted = ref(false)

const sheets = ['00', '01', '02']

const certs = [
  { code: 'Google', name: 'Google Cybersecurity Professional', issuer: 'Coursera',
    year: '2025', id: 'OS-XXXXXX', state: 'active',
    image: '/certs/cert-01.jpg' },
  { code: 'CC', name: 'Certified in Cybersecurity', issuer: 'ISC2',
    year: '2025', id: 'XXXXXXX', state: 'active',
    image: '/certs/cert-02.jpg' },
  { code: 'SEC+', name: 'CompTIA Security+', issuer: 'CompTIA',
    year: 'xxxx', id: 'XXXXXX', state: 'ongoing',
    image: '/certs/cert-03.jpg' },
  { code: '????', name: 'TBA', issuer: '????',
    year: 'xxxx', id: 'XXXXXXX', state: 'unk',
    image: '/certs/cert-04.jpg' },
]

const results = [
  { rank: '26th', event: 'HTB Cyber Apocalypse', year: '2026',
    team: 'CyberWirez', field: 'of 6,100 teams' },
  { rank: '63rd', event: 'HTB Global Cyber Skills Benchmark', year: '2026',
    team: 'Shinigami.ph', field: 'of 589 teams' },
  { rank: '1st', event: 'Kaspersky SAS', year: '2025',
    team: 'PwnSec', field: 'of 18,000 teams' },
  { rank: '3rd', event: 'Hack4Gov CTF', year: '2025',
    team: 'CtrlAltElite', field: 'of 100 teams' },
  { rank: '3rd', event: 'International CyberDrill Warzone', year: '2025',
    team: 'solo', field: 'finalist' },
]

const coins = [
  { code: 'MVP', name: 'HTB Global Cyber Skills Benchmark', year: '2025', solved: true },
  { code: '???', name: 'N/A', solved: false },
]

const experience = [
  {
    role: 'Cybersecurity Associate',
    org: 'ISRM',
    location: 'Remote',
    from: '2026-06', to: 'present',
    bullets: [
      'Triage and validate L1 alerts across SIEM/EDR, averaging under 90 seconds per alert across 40+ alerts a shift.',
      'Cut average triage-to-escalation time from 22 minutes to 9 a 28% drop in analyst noise.',
      'First-responder on 70+ IR cases a year spanning phishing, malware, and insider-threat activity, from initial alert to handoff-ready timeline.',
    ],
    tools: ['Splunk', 'MITRE ATT&CK', 'FTK', 'Autopsy', 'Volatility', 'EnCase'],
  },
  {
    role: 'Bug Bounty Hunter',
    org: 'YesWeHack',
    location: 'Remote',
    from: '2026-03', to: 'present',
    bullets: [
      'Hunt for XSS, SQLi, and IDOR. Chaining low-severity findings into high-impact exploit paths.',
      'Submitted 45+ vulnerability reports with an 85% acceptance rate, including several high/critical-severity findings validated by program triage teams.',
      'Cut report-to-triage turnaround by writing reproducible PoCs and clear impact write-ups.',
    ],
    tools: ['Burp Suite', 'subfinder', 'httpx', 'ffuf', 'semgrep', 'katana'],
  },
  {
    role: 'Cyber Security Intern',
    org: 'HackHalt Cyber Intelligence Council',
    location: 'Remote',
    from: '2026-06', to: '2026-07',
    bullets: [
      'Assisted the SOC team with log monitoring and alert triage using Splunk.',
      'Built and documented 10 detection rules/dashboards during the internship, later adopted into the teams standard monitoring workflow.',
      'Reduced onboarding documentation gaps by writing runbooks for 5+ common alert types used by the next intern cohort.',
    ],
    tools: ['Splunk', 'Bash', 'Jira', 'VirusTotal', 'Python',],
  },
]
</script>

<template>
  <WatchdogBoot @done="booted = true" />

  <MarginRail :progress="progress" :sheets="sheets" />

  <div ref="wrapper" class="scroll-wrapper">
    <div ref="content" class="scroll-content">
      <header class="hero sheet">
        <div class="hero-field">
          <AsciiField :cols="88" :rows="30" :start="booted" />
        </div>

        <div class="hero-copy">
          <p class="eyebrow" v-reveal>00 · Index</p>

          <h1 class="h-display" v-reveal="{ delay: 80 }">
            Tantalost?<br />
            <span class="dim">Cybersecurity Associate</span>
          </h1>

          <div class="hero-terminal" v-reveal="{ delay: 180 }">
            <TerminalIntro :start="booted" />
          </div>

          <p class="claim" v-reveal="{ delay: 260 }">
            Systems should be
            <WordCycler
              :words="['hardened', 'monitored', 'contained', 'auditable', 'boring']"
            />
          </p>
        </div>

        <p class="scroll-hint" v-reveal="{ delay: 700 }">↓ scroll</p>
      </header>
      <section class="section sheet">
        <SectionHead sheet="01" label="Certifications" />
        <div class="certs">
          <CertCard
            v-for="(c, i) in certs"
            :key="c.code"
            :cert="c"
            :index="i"
            v-reveal="{ delay: (i % 2) * 90 }"
          />
        </div>
      </section>
      <section class="section sheet">
        <SectionHead sheet="02" label="Record" />

        <div class="record">
          <div class="record-col">
            <p class="col-label">Experience</p>
            <ExperienceLog :entries="experience" />
          </div>

          <div class="record-col">
            <p class="col-label">Achievements</p>
            <AchievementsPanel :results="results" :coins="coins" />
          </div>
        </div>
      </section>
      <section class="sheet closing-block">
        <SignOff />
      </section>

    </div>
  </div>
</template>

<style scoped>
/* ---------- hero ---------- */
.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-content: center;
  padding-block: 12vh 8vh;
}

.hero-field {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 0;
  pointer-events: none;
}

.hero-copy {
  position: relative;
  z-index: 1;
  max-width: 70ch;
}

.hero-terminal {
  margin-top: clamp(1.8rem, 4.5vh, 3rem);
  border-left: 1px solid var(--rule-strong);
  padding-inline-start: 1.3rem;
}

.claim {
  margin-top: clamp(1.8rem, 4.5vh, 3rem);
  font-size: var(--step-2);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.scroll-hint {
  position: absolute;
  bottom: 3vh;
  left: calc(var(--rail) + var(--gutter));
  font-size: var(--step--1);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--faint);
  z-index: 1;
}

/* ---------- certifications ---------- */
.certs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 270px), 1fr));
  gap: clamp(1rem, 2.2vw, 1.6rem);
}

/* ---------- record: experience | achievements ---------- */
/* No position:sticky anywhere in here - the smooth-scroll wrapper
   breaks it. See the README. */
.record {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 4.5rem);
}

.col-label {
  font-size: var(--step--1);
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--faint);
  padding-bottom: 0.6rem;
  margin-bottom: 1.6rem;
  border-bottom: 1px solid var(--rule-strong);
}

@media (max-width: 900px) {
  .record { grid-template-columns: 1fr; gap: clamp(3rem, 8vh, 5rem); }
}

/* ---------- sign-off ---------- */
.closing-block { padding-bottom: clamp(5rem, 14vh, 9rem); }
</style>
