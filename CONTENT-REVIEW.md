# Content review: items for Prem to confirm or supply

All content on the site comes from these sources:

1. **Prem Gaire – CV** (Google Doc, last updated September 2026)
2. **Prem Gaire – Short Bio** (Google Doc, May 2025)
3. **Prem Gaire – Website Content Pack** (Claude doc, November 2026), which was itself drawn from the CV
4. **Prem Gaire.png** headshot (Google Drive)

Nothing has been invented. Where a source was silent or ambiguous, the item is listed below. Edit the named file to change anything (see MAINTENANCE.md).

## Please confirm

| # | Item | Where it appears | File to edit |
|---|---|---|---|
| 1 | **Doctoral plans.** The site says "I plan to deepen this work through doctoral research" (content pack wording). Your CV says you are "seeking a higher degree by research (MPhil/PhD)". Keep, reword or remove. | About, Research | `src/content/pages/about.md`, `research.md` |
| 2 | **Incubation figures** (5 cohorts; 130+ students in 30+ teams; 10+ teams incubated; 5 teams funded by UGC; 7+ collaboration agreements) come from the May 2025 short bio. Are they still current? | Home, Entrepreneurship | `src/pages/index.astro`, `src/pages/entrepreneurship.astro`, `src/content/projects/*.md` |
| 3 | **Research interests.** Your CV lists three (startup innovation, entrepreneurship education, digital technologies). Two more were added from your published and ongoing work: *business incubation and startup ecosystems* and *industry–academia–government collaboration*. Keep or remove. | Home, Research | `src/data/profile.yaml` |
| 4 | **Grades.** The La Trobe aggregate score (78.37%) and BBA GPA (3.61) are shown. Many academic sites omit grades; remove them if you prefer. | About | `src/data/cv.yaml` |
| 5 | **BBA thesis year** is shown as 2014 (the year your BBA ended). Correct it if different. | Publications | `src/data/publications.yaml` |
| 6 | **Positioning.** Following the new brief, the site presents you as an academic and ecosystem practitioner, not as a consultancy. The content pack's service offers (consulting, mentoring formats, pricing) are not listed as services; the Contact page invites collaboration, teaching, workshops and program work instead. | Contact, Home | `src/pages/contact.astro` |

## Please supply (optional, improves the site)

| # | Item | How to add |
|---|---|---|
| 7 | **Title of the working paper** presented at the 2nd BIC National Research Conference (Nov 25, 2022). Currently shown as "Working paper presentation". | `src/data/activities.yaml` → `talks` |
| 8 | **Short abstracts** for the two journal articles. The current one-line summaries are restatements of the titles; replace them with your own wording or the published abstract. | `src/data/publications.yaml` → `summary` |
| 9 | **CV PDF** (without phone number or referees). | MAINTENANCE.md §6 |
| 10 | **Certificate links.** Your CV links training certificates in Google Drive. They were left off because their sharing settings couldn't be verified. If they are public and you want them on the site, add `link:` lines. | `src/data/activities.yaml` → `training` |
| 11 | **English summaries** of the two Naya Patrika op-eds, one sentence each. | `src/content/articles/2022-*.md` → `summary` |
| 12 | **Photo credit.** If the photographer requires attribution, tell me and I'll add a credit line. | `src/data/profile.yaml` → `photoAlt` / footer |

## Deliberately not published

- **"Entrepreneurship and Innovation in Nepal: Ten Perspectives for Rethinking the Future"** (Google Doc, 6 Nov 2026). It's an unpublished op-ed collection with its own newspaper publication strategy. Publishing it here first could stop newspapers accepting the articles. Once each article appears in print, add it to Insights (MAINTENANCE.md §3), with the full text or a link to the newspaper.
- **Manuscripts and drafts in your Drive**: the *JORT* special-issue manuscript, the mountain-tourism special-issue manuscript, the systematic review on entrepreneurship programs and policies in Nepal, the conceptual paper, and the BHM *Fundamentals of Entrepreneurship* textbook draft. Their submission status is unknown, and under-review work is often kept off public pages. If you want any listed, add them to `publications.yaml` with `type: working-paper`, with the status in `venue` (for example "Under review").
- **Phone number and referees' contact details**, for privacy.
- **Testimonials.** There are no real quotes yet.

## Professional email

The site uses **namaste@premgaire.com.np** everywhere (it is set once, in `src/data/profile.yaml`). Make sure this mailbox actually receives mail. The free option is Cloudflare **Email Routing** (Cloudflare → *Email → Email Routing*): create `namaste@premgaire.com.np` and forward it to your Gmail. Cloudflare adds the required MX and TXT records automatically. Send yourself a test email after setting it up.
