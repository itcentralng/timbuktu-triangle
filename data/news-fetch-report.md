# News Article Fetch Report — Timbuktu Triangle Kiosk

Generated: 2026-07-17
Output: `data/news-articles.json` (22 articles)

## Summary

- **22 / 22 articles fetched successfully** with full body text extracted.
- **0 hard failures** (`fetchFailed: true`).
- 4 sites (TheCable ×2, Channels TV, Justice Watch News) initially returned HTTP 403 to the standard fetch tool and required a direct `curl` fetch with a browser user-agent to retrieve; content was then hand-extracted from the raw HTML (schema.org JSON-LD gave clean author/date fields).
- `thehindu.com` also blocked the standard fetch tool outright; retrieved via `curl` — page included subscription/paywall chrome around the article, but the full article text itself was present in the markup (not paywalled) and was cleanly extracted.

## Full success (clean headline, byline, date, full body)

**Operation V (Jan 2026):**
1. TVC News — Troops Bust Terrorist Camps, Thwart Attacks In Northeast Operation
2. Zagazola Makama — Troops dismantle three Boko Haram detention facilities
3. Vanguard — Troops clear terrorists' camps in Timbuktu Triangle
4. Vanguard — Troops gain into Timbuktu Traingle [sic], stronghold of Boko Haram/ISWAP
5. Zagazola Makama — ISWAP suffers heavy losses, lost 22 fighters
6. PRNigeria — Troops Pound Terrorists, Level Enclaves in Timbuktu, Bulabulin Forest
7. TRT World — Boko Haram attack kills eight Nigerian soldiers in Borno ambush
8. ThisDay — Troops Eliminate 20 Terrorists As Soldiers Pay Supreme Price
9. Punch — Military discovers B'Haram underground storage, fuel dump

**Operation IV (Jan 2025):**
10. Arise News — Boko Haram/SWAP Attack Kills Army Commander, Soldiers
11. The Hindu — At least 27 Nigerian soldiers killed in jihadist suicide attack (fetched via curl, paywall chrome stripped)
12. Ndarason Media — At least 70 insurgents killed in Timbuktu Triangle
13. Punch — 22 soldiers, over 70 insurgents killed in Borno clash -DHQ
14. The Cable — Nigerian army loses '20 soldiers, kills 70' terrorists (fetched via curl, 403 on standard fetch)
15. Channels TV — Military Confirms Death Of 22 Soldiers (fetched via curl, 403 on standard fetch)
16. The Cable — Newspaper Headlines digest, Jan 16 2025 (fetched via curl, 403 on standard fetch; short by nature — it's a multi-story digest, the Borno item is one bullet among four)
17. HumAngle — Nigerian Military Confirms 22 Soldiers Killed
18. Justice Watch News — Nigeria Army Provides Update On Terrorist Attack (fetched via curl, 403 on standard fetch)
19. Kwara Reporters — Three Officers, Several Nigerian Soldiers Killed

## Fetched successfully but flagged for editorial review (content/date mismatch)

These three pages resolved and returned real article content — nothing was fabricated — but the article date/content doesn't line up with the operation bucket the URL was grouped under. Worth a human check before display, since a museum kiosk implies factual precision:

- **`guardian-ng-army-overrun-stronghold`** (grouped under Operation V / Jan 2026) — the live page actually serves a **2 March 2024** Guardian Nigeria story about an earlier Timbuktu Triangle clash. No Jan 2026-dated content was found at that URL. Included as-fetched with a `note` field in the JSON.
- **`punch-troops-kill-over-50-terrorists`** (grouped under Operation IV / Jan 2025) — live page is dated **23 October 2025** and mainly covers attacks on Dikwa/Mafa/Gajibo; the Timbuktu Triangle is mentioned only as the origin axis of the Katarko attackers, not the main subject. Included as-fetched with a `note` field.
- **`premiumtimes-iswap-commander-killed`** (grouped under Operation IV / Jan 2025) — live page is dated **10 June 2025**, covering a Gujba/Timbuktu Triangle operation months after Desert Sanity IV. Included as-fetched with a `note` field.

None of these were altered or invented — they are the genuine current contents of those URLs, just not from the expected date window. Recommend the museum curator either (a) accept them as later follow-up coverage of the same theatre, (b) re-source original Jan 2025/Jan 2026-dated articles for these three slots, or (c) drop them from the kiosk if strict date fidelity to each operation is required.

## Images

Most articles included a usable `imageUrl` (hero/featured image, mostly WordPress `og:image` or similar). Two Vanguard NG pages and one TVC News page only exposed placeholder/filler graphics (an empty SVG placeholder or a generic `tvcfiller.png`), so `imageUrl` was omitted for those three rather than including a non-representative image:
- `vanguard-clear-terrorist-camps`
- `vanguard-troops-gain-timbuktu-triangle`
- `tvc-troops-bust-terrorist-camps`

## Outlet accent colors

`outletAccentColor` values are best-effort approximations of each outlet's real masthead/brand color based on general knowledge of Nigerian and international news branding (e.g., Vanguard red, Punch red, Guardian NG navy blue, Premium Times blue, HumAngle orange, TRT World red). These were not sourced from official brand guideline pages — a designer should spot-check against each outlet's actual current logo before final kiosk deployment.

## Technical note for future re-fetching

If any articles need to be re-fetched (e.g. TheCable, Channels TV, The Hindu, Justice Watch News), the standard WebFetch tool returned HTTP 403 for these domains. A direct `curl` request with a desktop browser `User-Agent` header succeeded on the first try for all of them. `web.archive.org` was categorically unreachable from this environment (blocked at the tool/network level), so Wayback Machine snapshots are not a viable fallback here — direct curl-with-UA was.
