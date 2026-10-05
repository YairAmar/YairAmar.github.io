---
name: profile-sync
description: Check Yair's public research record (arXiv, Google Scholar, LinkedIn, GitHub) against the personal site and draft updates for new papers, venues, roles, and news items. Use when the user asks to "sync my site", "check for new papers", "is my site up to date", "add my latest work", or runs a periodic site refresh.
---

# Profile sync

Find what changed in the user's public record since the site was last updated, draft the edits, get approval, then ship them with the `site-ship` skill.

## Sources, in order

1. **arXiv**: run `python3 .claude/skills/profile-sync/scripts/arxiv_check.py`. It lists every arXiv paper by "Yair Amar" and marks each one `ON-SITE` or `NEW` by matching the arXiv ID in `src/data/site.ts`. Also check whether an `ON-SITE` paper has a newer version (`https://arxiv.org/abs/<id>`), since a new version can mean a venue acceptance.
2. **Google Scholar**: profile `https://scholar.google.com/citations?user=XXgJht4AAAAJ`. Plain fetch and web search don't work for Scholar, so use Chrome (`navigate`, then `get_page_text`) and close the tab afterwards. It shows venue updates and the citation count.
3. **LinkedIn**: `https://www.linkedin.com/in/yair-amar-b65b62144/details/experience/` through Chrome (WebFetch returns HTTP 999). Use it to spot role or date changes.
4. **GitHub**: run `gh repo list YairAmar --visibility public` to find new public code worth linking from a publication.

Read the sources only. Never post, edit, or message anything on these sites.

## Drafting

Produce a short report with these parts:
- **New items**: each with the exact site.ts entry you'd add (title, authors in paper order, venue, year, links), plus a news line dated by first-submission or acceptance month.
- **Changed items**: for example "under review" turning into an acceptance, or a new code repo.
- **Mismatches**: where sources disagree with each other or with the site. LinkedIn and the site already differ on purpose in two places. The site shows the defence role ending in 2026 and Sheba as "Senior Research Scientist", both by the user's choice. Don't "fix" these.

Then ask the user which items to apply.

## Rules

- A name match is not proof of authorship. Only list papers where coauthors, affiliation, or topic fit the user (speech enhancement with Ivry and Cohen, coding agents with the Accomplish team). Papers by Yaniv Galron or other authors that sit in the user's thesis folders are style references, not the user's work.
- Keep the site's conventions: the user's name is bolded automatically, equal contribution is marked with `*` plus a note, and advisor names auto-link through the `people` map. A workshop version and its arXiv preprint form one entry, with the arXiv link and a note naming the other title.
- Don't add double-blind submissions under review unless the user says so.
- After the user approves, apply the edits and follow `site-ship` (shots, review, ship, live check).
- This skill only drafts and applies on request. To run it on a schedule later, wrap it in a routine with the `schedule` skill. That needs the user's explicit go-ahead.
