# Website maintenance guide

You never need to touch the code to keep this website up to date. All content lives in plain text files:

- **`.yaml` files** (in `src/data/`) hold short, structured information such as publications, CV entries and links.
- **`.md` (Markdown) files** (in `src/content/`) hold longer writing such as articles, project descriptions and your biography.

When you save a change to the `main` branch on GitHub, the website rebuilds and goes live automatically, usually within **2–3 minutes**.

---

## How to edit a file on GitHub (no software needed)

1. Go to your repository on github.com and open the file (for example `src/data/publications.yaml`).
2. Click the **pencil icon** (Edit this file).
3. Make your change.
4. Click **Commit changes…**, write a short note (for example "Add 2027 journal article"), keep **Commit directly to the main branch** selected, and click **Commit changes**.
5. To watch the update, open the **Actions** tab. A green tick means the site is live. A red cross means something is wrong in the file you edited (see *If something breaks* below).

**To create a new file:** open the folder (for example `src/content/articles/`) and click **Add file → Create new file**. Type the file name, paste the content, and commit.
**To delete a file:** open it, click the **⋯** menu (top right), choose **Delete file**, and commit.
**To upload an image or PDF:** open the folder (for example `public/documents/`), click **Add file → Upload files**, and commit.

### Three rules for YAML files

1. Keep the **indentation** (the spaces at the start of lines) exactly as in the neighbouring entries. Use spaces, never tabs.
2. Put text inside **double quotes** `"…"`. If the text itself contains a double quote, use a single quote `'` inside it instead.
3. Each item in a list starts with `- ` (dash and space).

---

## 1. Update your personal information

**File:** `src/data/profile.yaml`

This file holds your name, job title, affiliation, the home-page introduction, research interests, email, LinkedIn, Google Scholar and ORCID links, and the Google Search Console code. Change the text after the colon. The header, footer, home page and contact page all update together.

- **Biography (About page):** `src/content/pages/about.md`
- **Short third-person bio:** `src/content/pages/short-bio.md`
- **Research agenda:** `src/content/pages/research.md`
- **Teaching philosophy:** `src/content/pages/teaching.md`
- **Entrepreneurship overview:** `src/content/pages/entrepreneurship.md`
- **Education, experience, grants, awards, international engagements, editorial work:** `src/data/cv.yaml`
- **Workshops, talks, professional training, courses taught:** `src/data/activities.yaml`

## 2. Add a publication

**File:** `src/data/publications.yaml`

Copy an existing block (from `- id:` down to the line before the next `- id:`), paste it **at the top of the list**, and edit it:

```yaml
- id: gaire-2027-short-name        # any unique name: lowercase, hyphens, no spaces
  type: journal                    # journal | conference | chapter | working-paper | thesis
  title: "Full title of the paper"
  authors: "Gaire, P. N., & Co-author, A."
  year: 2027
  venue: "Journal Name"
  volume: "15"                     # optional
  issue: "2"                       # optional
  pages: "1–20"                    # optional
  doi: "10.xxxx/xxxxx"             # optional: only the DOI, not the full link
  url: "https://..."               # optional: use if there is no DOI
  pdf: "/documents/my-paper.pdf"   # optional: upload the PDF to public/documents/ first
  summary: "One plain-language sentence about the paper."   # optional
  featured: true                   # optional: also show on the home page
```

Delete any optional line you don't need. Publications are grouped by `type` and sorted by year automatically. Only enter a DOI that the publisher has issued.

## 3. Publish an opinion article or insight

**Folder:** `src/content/articles/`

1. Open `src/content/articles/_TEMPLATE.md` and copy its contents.
2. Create a new file in the same folder named like `2027-01-15-short-title.md` (lowercase, hyphens, no spaces). The name becomes the web address: `premgaire.com.np/insights/2027-01-15-short-title/`.
3. Paste the template, fill in the lines between the two `---` lines, and write the article below them.
4. Set `draft: false` (or delete the `draft` line) when you are ready to publish. While it is `draft: true`, the article stays hidden.

**Article already published in a newspaper?** Add `outlet: "Naya Patrika"` and `externalUrl: "https://…"` and leave the body empty. The site will list it and link to the newspaper (see the two existing Naya Patrika files as examples). Or publish the full text here too, if the newspaper allows it: remove `externalUrl` and paste the text.

Writing tips: a blank line starts a new paragraph; `## Heading` makes a sub-heading; `**bold**`, `*italic*`, `[link text](https://…)`, and `> quotation`. Nepali text works as normal; set `language: ne`.

## 4. Add a research project or entrepreneurship initiative

**Folder:** `src/content/projects/`

Copy `_TEMPLATE.md` into a new file (for example `regional-innovation-study.md`) and fill it in:

- `category: research` puts it on the Research page; ongoing research also appears on the home page.
- `category: entrepreneurship` puts it on the Entrepreneurship page.
- `status: ongoing` or `status: completed`.
- `order:` controls the order (lower numbers first).

When a project finishes, change `status: ongoing` to `status: completed` and update `period`.

## 5. Replace your photograph and images

- **Profile photo:** upload a new file named exactly **`profile.jpg`** to `public/images/` (GitHub will ask to replace the old one). Use a square image of about 900 × 900 pixels, under 300 KB. To compress it, use a free tool such as squoosh.app.
- **Social-sharing preview** (shown when the site is shared on LinkedIn, Facebook, WhatsApp and X): replace `public/images/og-image.jpg` with a 1200 × 630 pixel image.
- **Other images in articles:** upload them to `public/images/` and insert them in an article with `![Description of the image](/images/file-name.jpg)`. Always write a short description for screen-reader users.

## 6. Add your CV

Upload the PDF to `public/documents/` (for example `Prem-Gaire-CV.pdf`), then in `src/data/profile.yaml` set:

```yaml
cv: "/documents/Prem-Gaire-CV.pdf"
```

A "CV (PDF)" link then appears on the home and About pages. Leave the phone number and referees' details out of the public version.

## 7. Update contact and social links

In `src/data/profile.yaml`, change `email:` or the lines under `links:`. To remove a profile, delete its line. The menu itself is in `src/data/navigation.yaml`.

## 8. Deploy changes

Nothing extra is needed. Every commit to `main` triggers the **Deploy website** workflow (see the **Actions** tab). To re-run it by hand, open **Actions → Deploy website → Run workflow**.

## If something breaks

- **Red cross in Actions:** click it, then click **build** to see the message. It usually names the file and line, for example a missing quote or wrong indentation in a YAML file, or a `type:` that isn't one of the allowed words. Fix that file and commit again. The live site stays on the last working version until then.
- **Undo a change:** open the file, click **History**, open the previous version, and copy its text back. Or ask someone to revert the commit.
- **Change not visible:** wait 3 minutes and refresh with Ctrl + Shift + R (Cmd + Shift + R on Mac).

## Yearly checklist

- Check year-dependent text (for example "2019 to 2024", "present") in `profile.yaml`, `cv.yaml` and the `src/content/pages/*.md` files.
- Move finished projects to `status: completed`.
- Check that links in `publications.yaml` and `activities.yaml` still work.
- Update the Node.js version or Astro if GitHub Actions shows warnings (a developer can do this in a few minutes).
