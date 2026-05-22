# A Memoir of the Rishu Project: From a Xinjiang Trip to a Home Cloud

## 1. The Xinjiang Trip, and What I Saw Along the Way

**August 23, 2025** was the day Rishu was born in my head.

At the time, I was on the way to the next scenic spot, scrolling through my phone. By chance, I came across something about “using AI to recreate someone who can truly chat with you,” and an idea suddenly clicked. Following my memory, I found again a video I had watched in early 2025 about building a chatbot with AI using AstrBot. For a moment, I even had the thought of training my own LLM.

It needed a name. Honestly, the earliest inspiration for the name “梨汁” came from “果糖” (yes, probably that VTuber). After a few turns of evolution, it finally settled as “梨汁.”

Later, I found **MaiBot**, a bot project truly created for “human-like” interaction. I excitedly told WangTY about it, and he generously gave me 15 yuan to sponsor the API costs for the first few attempts. That was also the first money Rishu ever earned.

## 2. Hello, Rishu

The day after I returned home from Xinjiang, I started working on the project. My definition for Rishu was: “**a little gray cat, extremely cute, making my body spin**.”

That setting actually came from a friend of mine, **Mita Mountain** (also known as Clash, not the proxy software!!! His homepage is ~~[clash.ink](https://clash.ink)~~ [mitahill.com](https://mitahill.com)). I directly reused his homepage template, only changing “little blue cat” into “little gray cat.”

At that time, I was using a package shared in the MaiBot group. MaiBot was probably at version 0.10.1 then. I replaced the default SiliconFlow setup with the **Alibaba Cloud API** funded by WangTY’s 15 yuan. Everything was ready.

I opened NapCat on my computer and logged into my QQ alt account. With trembling hands, I typed a single full stop (“。”) and sent it. That was where everything began.

There is one detail worth adding: that QQ alt account actually has quite a long history. It had existed since around 2022 to 2023, after I registered my main QQ account. Back then, there was no MaiBot and no AstrBot. In the tech circles I followed, a project called **Yunzai** was popular.

Yunzai had many forks. At first, I used the original Yunzai and ran it on a Windows workstation at school. Later, I happened to discover **TRSS-Yunzai** and began running it in my Manjaro virtual machine.

Looking back now, why did the Arch Linux command line feel so familiar when I first touched it in February 2026? It turns out I had already dealt with pacman three years earlier.

## 3. Rewriting Prompts Again and Again, and Witnessing Truly Powerful Models

Later on, I joined almost every MaiBot group. Around that time, I first witnessed how impressive **Gemini 2.5 Pro** was.

I also started using RinkoAI ([rinkoai.com](https://rinkoai.com)), using the free models it provided as substitutes for paid ones. During that period, I even tried the free Grok 4 Fast.

When I used Gemini 2.5 Pro back then, I kept thinking: why does this model take so long to think, with the chain of thought lasting more than 30 seconds? And according to the official pricing, every use would cost several cents, even though I never put a single cent into RinkoAI.

By the end of October, I discovered **LINUX DO ([linux.do](https://linux.do))**, an AI discussion community. Unfortunately, the site was soon blocked in China. But there is always a way around difficulties. Soon after, I started using **Mint API ([x666.me](https://x666.me))**. With its generous resources, I had almost unlimited Gemini 2.5 Pro quota.

It was also around that time that I officially settled on the Chinese and English name for 梨汁: **Rishu**. By the way, in early November, I also met Eric-Terminal ([ericterminal.com](https://ericterminal.com)), and that friendship has continued to this day.

## 4. Turbulence and the Personality Palette

By **late December 2025**, Google suddenly cut the free quota for individual AI Studio users. In an instant, almost all the public-benefit APIs I had been using for free collapsed.

Thankfully, there was still a way forward. I soon found a relay solution through Gemini CLI and switched over smoothly. Around the transition from late 2025 to early 2026, I also registered for and started using “Black and White Public Welfare Station” ([ai.hybgzs.com](https://ai.hybgzs.com)). Truly, I have felt grateful countless times for those public-service site owners quietly contributing in the corners of the internet.

Later, **Chartyr** (homepage: [char.icu](https://char.icu)) shared a prompt set called the **Personality Palette** in a MaiBot group. It originated from 类脑, an AI discussion server on Discord. The core logic, as I understood it, was very advanced: **it uses the character persona as the absolute anchor, and uses concrete “when” and “how” behaviors as the main structure**.

At first, I tried to imitate that structure with Gemini 3 Pro and wrote a version for Rishu, but the actual results were not ideal.

Then came **January 29, 2026**. I was at WangTY’s home that day, and I spent one or two full hours in the afternoon manually rewriting a new version of the Personality Palette. I also blended in part of the essence from Eric’s more traditional prompts for Vivian. The results were excellent. Aside from some tiny later adjustments, that prompt set has remained almost unchanged to this day, May 2026.

## 5. Workstations, Cloud Servers, and the Home Cloud

The physical server behind Rishu also went through a long and bumpy moving history:

- **2025.8 · School workstation**  
  This was the same machine that had run Yunzai. But NapCat was extremely unfriendly to my account on Windows. It was almost “offline every half day, risk-controlled every two days.” On top of that, the school often performed security checks, cutting the network or deleting files. It was far too unstable, so I had to give it up.

- **2025.9 · 8H8G “oversold” free machine**  
  It was free, but the bandwidth was stingy, only 3M. Since it used a shared IP, it was hit by DDoS attacks every day.

- **2025.9 · Independent VPS in the United States**  
  A 2-core, 2GB independent VPS. It was very cheap, only 6 yuan per month. Overall it was smooth and pleasant to use. Since it was overseas and had an independent IP, it almost never suffered DDoS attacks.

- **2025.9 · Yunnan NAT cloud server**  
  I bought a Yunnan 2-core, 2GB NAT machine from “Budachuangzao Internet” ([lipxr.cn](https://lipxr.cn)) for 3 yuan per month. It was cheap, yes, but it was also DDoSed every day.

- **2025.12 · Jiangsu high-bandwidth server**  
  Through the owner of [xi-clouds.cn](https://xi-clouds.cn), I bought a Jiangsu 4H4G machine for 9 yuan per month. Acting as an agent, the owner directly helped me apply for **100M symmetrical upload and download bandwidth**, and the experience was extremely smooth.

## 6. Rishu’s Home Keeps Getting Better

Entering 2026, Rishu finally said goodbye to the drifting “rental” era and moved into a villa:

- **2026.1 · WangTY Home Cloud 1.0**  
  The configuration was 4C16G. After moving to a local physical machine, Rishu finally said goodbye to those annoying DDoS attacks. During this period, fnOS had a widely discussed vulnerability incident, but fortunately everything ended safely. After patching, there were no major issues.

- **2026.2 to now (2026.5) · WangTY Home Cloud 2.0, top configuration**  
  The server configuration jumped directly to **14 cores and 32GB RAM**, with an **i5-14600K** CPU. Honestly, using a desktop CPU of this level to run a lightweight QQ bot is basically “using a cannon to swat a mosquito.” The performance is almost too luxurious. But it has also become the most stable and powerful home Rishu has had since birth.

Looking at the latency and response times, I sincerely feel: Rishu’s home really is getting better day by day.

## 7. The Top-Level Domain and the Future

After all that tinkering, I realized I had somehow bought a top-level domain for an AI. As of May 2026, the architecture around **[rishu.cfd](https://rishu.cfd)** is as follows:

- **[rishu.cfd (@)](https://rishu.cfd)**: the main site, the front door.
- **[docs.rishu.cfd](https://docs.rishu.cfd)**: development documents and lore/settings for Rishu.
- **[status.rishu.cfd](https://status.rishu.cfd)**: the monitoring dashboard, used to check the status of the Rishu main site, backend server, and our Minecraft server in real time.
- **[verify.rishu.cfd](https://verify.rishu.cfd)**: a planned encrypted verification system, not fully finished yet.

As for the second-level domain [rishu.us.ci](https://rishu.us.ci) that I applied for before, it was blocked in China for certain reasons, making it very unstable domestically. I barely use it now.

After all these twists and turns, this is the full trail Rishu has left behind up to May 2026.
