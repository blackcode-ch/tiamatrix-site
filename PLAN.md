# First build and review plan

Prepared 8 November 2026. Plan and first build due Tuesday 10 November.

## Direction

One centred reading column, warm paper and forest ink, a green accent, large editorial headings, 19px body copy, generous spacing. Four complete pages guide readers from understanding to installation to the first session. Plain words, no invented endorsements, no tracking, no account wall.

## Delivery checklist

1. Verify release, installer, public docs and license; check domain records and existing Vercel access.
2. Build the four static pages and a labelled synthetic approval illustration.
3. Create the public repository; run Chromium only in public CI; inspect phone and desktop screenshots for every page in both themes; fix observed defects and rerun.
4. If CI passes, create only a Vercel preview using existing access; report evidence and questions. Production waits for Andrea.

## Source audit

Audited product commit: `55881c38935a083998a0688ac4c03f3c990eb3b7` in https://github.com/blackcode-ch/tmx-go-public.

- Release: https://github.com/blackcode-ch/tmx-go-public/releases/tag/fleet-v1.0.1. Signed headless binaries: macOS arm64/amd64, Linux amd64, Windows amd64.exe; SHA256SUMS and signature. These are not desktop installers.
- `README.md`: local agent team, QR invitations, direct/group chat, developer build commands and prerequisites. Its phone guide, design document and screenshot links point to files missing from the public tree.
- `scripts/install-macos.sh`: pinned signature verification, latest stable fleet selection, OpenSSL with Ed25519 OR Swift/CryptoKit, normal-user install, user LaunchAgent, status command. The script applies an ad-hoc macOS signature; do not call it notarised.
- `internal/skill/SKILL.md`: isolated trial; P2P, DHT, mDNS, NAT mapping, WhatsApp, Companion and automatic updates disabled. Installation requires disposable-machine qualification in absent TRIAL.md. No complete public Windows/Linux installation walkthrough exists; this build says so rather than inventing commands.
- `ui/src/components/chat/invite-dialog.tsx`: person/group selection, QR/link, Chats → Join, expiry, revoke.
- `ui/src/components/device-pairing.tsx`: trusted-host pairing, owner PIN or host approval, two-minute code, Settings → Owner devices.
- `ui/src/pages/inbox.tsx`: Needs you, allow/deny.
- No root LICENSE file in the tree; GitHub license API returns 404. Apache is unconfirmed; public source visibility does not establish open-source reuse permission.

## Read-only domain checks, 8 November

Queried local DNS, Google public DNS-over-HTTPS, and RDAP (`https://rdap.org/domain/<domain>`). Local DNS refused three names; a second independent DNS path returned NXDOMAIN for them.

| Domain | Finding | Ownership conclusion |
| --- | --- | --- |
| tiamatrix.com | Registered 7 August 2025; RDAP expiry 7 August 2027; Cloudflare nameservers fiona and rob | Registrant ownership is not established by these records |
| tiamatrix.ch | Public DNS NXDOMAIN; RDAP lookup 404 | No registration evidence from these checks; availability/ownership not proven |
| tiamatrix.io | Public DNS NXDOMAIN; RDAP lookup 404 | No registration evidence from these checks; availability/ownership not proven |
| tiamatrix.app | Public DNS NXDOMAIN; RDAP lookup 404 | No registration evidence from these checks; availability/ownership not proven |

Existing Vercel CLI authentication succeeds. The account's accessible team lists four unrelated domains; no Tiamatrix domain is listed. This does not prove the domain is held elsewhere or owned by someone else.

Free path: use the generated Vercel preview URL now. After explicit launch approval, request `tiamatrix-site.vercel.app` if available. Attach a custom domain later only after ownership is demonstrated; no purchase is authorised.

## Three questions for review

1. Can the maintainer publish/confirm the actual license? Apache is currently unverified.
2. Which enabled public build and Windows/Linux/phone setup guide should we offer beyond the restricted trial?
3. Can the owner confirm control of tiamatrix.com, and approve the reviewed site before any production launch?
