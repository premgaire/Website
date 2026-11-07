# premgaire.com.np

The personal academic and professional website of **Prem Nath Gaire**, Lecturer at Boston International College, Nepal.

- **Live site:** https://premgaire.com.np
- **Built with:** [Astro](https://astro.build) (static site generator). No database, no server, no ongoing cost.
- **Hosting:** GitHub Pages, deployed automatically by GitHub Actions on every push to `main`
- **Domain & DNS:** Cloudflare

| Guide | What it covers |
|---|---|
| [MAINTENANCE.md](MAINTENANCE.md) | **Start here.** How to update your bio, add publications, publish articles, add projects, replace photos and change links |
| [DEPLOYMENT.md](DEPLOYMENT.md) | One-time GitHub Pages and Cloudflare DNS setup, HTTPS, Google Search Console |
| [CONTENT-REVIEW.md](CONTENT-REVIEW.md) | Items Prem should check or supply |

## Where things live

```
src/
├── data/                      ← short, structured information (YAML)
│   ├── profile.yaml           name, title, intro, email, profile links, research interests
│   ├── publications.yaml      ALL publications (one list)
│   ├── cv.yaml                education, experience, grants, awards, international engagements
│   ├── activities.yaml        workshops, talks, professional training, courses taught
│   └── navigation.yaml        the main menu
├── content/                   ← longer writing (Markdown)
│   ├── articles/              one file per op-ed / insight  (Insights page)
│   ├── projects/              one file per research project or entrepreneurship initiative
│   └── pages/                 biography, research agenda, teaching philosophy, entrepreneurship overview
├── pages/                     page templates (you rarely need to touch these)
├── components/                reusable building blocks (publication entry, project entry …)
├── layouts/BaseLayout.astro   shared header/footer and SEO metadata
└── styles/global.css          the design system (colours, fonts, spacing)
public/
├── images/profile.jpg         your photo  (replace with a new file of the same name)
├── images/og-image.jpg        the preview image shown when the site is shared on social media
├── documents/                 PDFs (CV, open-access papers)
└── CNAME                      the custom domain for GitHub Pages
.github/workflows/deploy.yml   automatic build and deployment
```

## Pages

| Address | Content |
|---|---|
| `/` | Introduction, photo, research interests, selected publications, current research, key figures, latest insights |
| `/about/` | Biography, education, experience, grants, awards, international engagements, editorial work, short bio |
| `/research/` | Interests, research agenda, ongoing and completed projects |
| `/publications/` | Publications by category, conference presentations, opinion articles |
| `/teaching/` | Teaching philosophy, courses, approaches, workshops, talks, academic development |
| `/entrepreneurship/` | Incubation, startup support, industry–academia collaboration, ecosystem engagement |
| `/insights/` | Op-eds and commentary (with RSS feed at `/insights/rss.xml`) |
| `/contact/` | Email and professional profiles |

Search-engine features: page titles and descriptions, canonical URLs, Open Graph and X/Twitter previews, `sitemap-index.xml`, `robots.txt`, and Schema.org structured data (`Person` on every page, `ScholarlyArticle` for publications, `Article` for insights).

## Working on your computer (optional)

You can edit everything directly on github.com (see MAINTENANCE.md). If you prefer to preview changes on your computer first, install [Node.js](https://nodejs.org) 20 or newer, then:

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:4321. The page refreshes as you save files. To build the final site into `dist/`, run `npm run build`.
