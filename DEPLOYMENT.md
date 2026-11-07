# Deployment: GitHub Pages + Cloudflare + premgaire.com.np

This is a one-time setup. After it, every push to `main` updates the live site automatically.

**Target configuration**

- `https://premgaire.com.np` is the main (canonical) address.
- `https://www.premgaire.com.np` redirects to it automatically (GitHub Pages does this).
- `http://` redirects to `https://`.

---

## Step 1: GitHub repository settings

The repository is `premgaire/website`.

1. **Visibility.** GitHub Pages is free for **public** repositories. If the repository is private, either make it public (**Settings → General → Danger Zone → Change visibility**) or use a paid GitHub plan. The site's content is public anyway, and no secrets are stored in this repository.
2. **Enable Pages with Actions.** Go to **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. **Run the first deployment.** Open the **Actions** tab. The *Deploy website* workflow runs on every push to `main`. If it hasn't run yet, choose **Deploy website → Run workflow**. Wait for a green tick. The site is then reachable at `https://premgaire.github.io/website/`. It may look unstyled at that address; that is expected until the custom domain below is active.
4. **Verify the domain (recommended; prevents domain takeover).** Go to your **account** settings (your profile picture → **Settings → Pages**), not the repository's. Click **Add a domain**, enter `premgaire.com.np`, and GitHub shows a **TXT record** like
   `_github-pages-challenge-premgaire` → `abc123…`.
   Add it in Cloudflare (Step 2, record 7), then click **Verify**.
5. **Set the custom domain.** Back in the repository: **Settings → Pages → Custom domain** → enter `premgaire.com.np` → **Save**. (The repository also contains `public/CNAME` with this domain, so it stays set after every deployment.) GitHub runs a DNS check; it passes once Step 2 is done.
6. **Enforce HTTPS.** Once the DNS check passes and GitHub has issued the certificate (from a few minutes up to 24 hours), tick **Enforce HTTPS** on the same page.

## Step 2: Cloudflare DNS records

In Cloudflare, open **premgaire.com.np → DNS → Records**.

**First, look at what is already there.**
- **Keep** any `MX` records and any `TXT` records containing `v=spf1`, `DKIM` or `_dmarc`. Those handle email.
- **Remove or edit** only records that conflict with the ones below: any other `A`, `AAAA` or `CNAME` record on the name `premgaire.com.np` (shown as `@`) or `www`. These may be placeholders that Cloudflare or the registrar created. Note down what you delete.

**Then make sure exactly these records exist:**

| # | Type | Name | Content / Target | Proxy status | TTL |
|---|---|---|---|---|---|
| 1 | A | `@` | `185.199.108.153` | **DNS only** (grey cloud) | Auto |
| 2 | A | `@` | `185.199.109.153` | DNS only | Auto |
| 3 | A | `@` | `185.199.110.153` | DNS only | Auto |
| 4 | A | `@` | `185.199.111.153` | DNS only | Auto |
| 5 | CNAME | `www` | `premgaire.github.io` | DNS only | Auto |
| 6 | AAAA (optional, IPv6) | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` (four records) | DNS only | Auto |
| 7 | TXT | `_github-pages-challenge-premgaire` | the code from Step 1.4 | – | Auto |

These IP addresses are GitHub Pages' official addresses (docs.github.com → *Managing a custom domain for your GitHub Pages site*).

### Proxy (orange cloud) or DNS only (grey cloud)?

Start with **DNS only** (grey cloud) for records 1–6. GitHub can only issue the HTTPS certificate when it sees its own servers directly. This is the simplest, most reliable setup, and GitHub already provides a global CDN and HTTPS.

If you later want Cloudflare's proxy (orange cloud) for analytics or extra caching, switch it on **only after** GitHub shows *Enforce HTTPS* ticked and working, and then set:

- **SSL/TLS → Overview → Encryption mode: Full (strict)**. Never "Flexible": with GitHub that causes endless redirect loops.
- **SSL/TLS → Edge Certificates → Always Use HTTPS: On**.

### SSL/TLS settings (either way)

- **SSL/TLS → Overview:** **Full (strict)**.
- **SSL/TLS → Edge Certificates:** *Always Use HTTPS* on; *Minimum TLS version* 1.2.
- Leave **HSTS** off until the site has worked over HTTPS for a few weeks.

### Nameservers (.com.np)

Cloudflare must be the domain's active DNS. In Cloudflare's **Overview** tab the domain should say **Active**. If it says *Pending*, the nameservers at the `.np` registry (register.com.np) are not yet set to the two Cloudflare nameservers shown in Cloudflare's Overview tab. Update them at register.com.np; `.np` changes can take up to 24–48 hours.

## Step 3: Check that everything works

After DNS changes, allow up to an hour (sometimes longer).

- [ ] `https://premgaire.com.np` loads with a padlock.
- [ ] `https://www.premgaire.com.np` redirects to `https://premgaire.com.np`.
- [ ] `http://premgaire.com.np` redirects to `https://`.
- [ ] Repository **Settings → Pages** shows "Your site is live at https://premgaire.com.np" with *Enforce HTTPS* ticked.
- [ ] Email to your domain (if any) still works.

Useful checkers: https://dnschecker.org (look up `premgaire.com.np`, type A), and the Pages settings page, which reports DNS problems.

## Step 4: Google Search Console

1. Go to https://search.google.com/search-console and click **Add property**.
2. Choose **Domain**, enter `premgaire.com.np`, and copy the `google-site-verification=…` TXT value.
3. In Cloudflare **DNS**, add a **TXT** record with name `@` and that value. Then click **Verify** in Search Console.
   (Alternative: choose **URL prefix** `https://premgaire.com.np/`, choose the *HTML tag* method, copy only the `content="…"` code into `googleSiteVerification:` in `src/data/profile.yaml`, commit, wait for the deploy, and verify.)
4. In Search Console, open **Sitemaps** and submit `sitemap-index.xml`.
5. Optional: add the site's URL to your Google Scholar, ORCID (*Websites & social links*) and LinkedIn (*Contact info → Website*) profiles. These links help search engines connect the site to you.

## Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| Pages settings: "DNS check unsuccessful" | Records not yet propagated, a conflicting record on `@`/`www`, or the proxy is on (orange cloud). Set the records to grey cloud and wait. |
| "Enforce HTTPS" greyed out | The certificate is still being issued. Wait up to 24 hours with DNS only. Remove and re-add the custom domain to retry. |
| "Too many redirects" | Cloudflare SSL mode is *Flexible*. Change it to **Full (strict)**. |
| 404 page from GitHub | The workflow hasn't run successfully, or Pages Source isn't set to **GitHub Actions**. |
| Site appears without styling at `premgaire.github.io/website/` | Expected. The site is built for the root of the custom domain. |
