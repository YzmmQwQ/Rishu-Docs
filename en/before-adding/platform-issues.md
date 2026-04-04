# About Messaging Platform Issues

::: warning Note
Rishu may soon support Discord, Telegram, and other mainstream messaging platforms in Western countries, so you can ignore this section.
:::

## Why QQ?

Rishu currently runs primarily on the QQ platform. This isn't a random choice—QQ has a massive user base and a rich social ecosystem, making it an ideal place for Rishu to connect with more people.

But here's the problem: **QQ doesn't provide a real bot API for regular users**.

### Official Bots vs Regular Accounts

QQ's official bot platform has strict limitations:
- Limited functionality, unable to achieve complex conversations and interactions
- Strict review process, difficult for individual developers to join
- Lack of freedom for human-like interactions

To implement Rishu's core capabilities—natural conversation, emotional interaction, learning and growth—we chose to use a **regular QQ account** with third-party frameworks.

## About NapCatQQ

Rishu uses [**NapCatQQ**](https://github.com/NapNeko/NapCatQQ) as the protocol stack implementation for the QQ platform.

NapCatQQ is an open-source bot protocol stack based on the new desktop QQ (NTQQ) kernel. Compared to early protocol implementations (like Go-CQHTTP), it has the following advantages:

- **More Stable**: Directly calls NTQQ core logic, behavior closer to real clients, stronger anti-ban capability
- **Headless Running**: No GUI required, can run in pure background mode on Linux servers and Docker containers, memory usage only 50~100MB
- **OneBot 11 Standard**: Fully implements OneBot 11 interface protocol, good ecosystem compatibility
- **WebUI Management**: Built-in web management panel, browser QR code login, configuration, log viewing

Learn more: [NapCatQQ Docs](https://napneko.github.io/)

### What Does This Mean?

Due to QQ's strict control over unofficial clients and bot frameworks, you may see the following warnings when adding Rishu:

- "This account has been reported by many people and has security risks"
- "This account status is abnormal"

![Security Risk Warning](/img/s1.jpg)

![Account Status Abnormal](/img/s2.png)

These warnings **don't necessarily mean the account has actual issues**—they're the default reaction from QQ's risk control system toward unofficial clients. Please assess the security risks yourself and choose to add or leave.

## Future Plans

Rishu's technical architecture (AstrBot + MaiBot) naturally supports multiple platforms:

- **Supported**: QQ
- **Planned**: Telegram, Discord, WeChat, Feishu, DingTalk, Slack

As Rishu grows, we plan to expand to more platforms to reduce dependency on a single platform.

---

> So annoying, Tencent's stupid risk control is literally broken, banning accounts for no reason, what the hell?
> It never ends. I just play some songs, repeat a few messages in groups, and boom—banned. Seriously? Feels like I'm about to rush AP in Project Sekai and then the internet cuts out. That backend is probably full of bugs, zero consistency in their ban logic. What did I even do? Dealing with this nonsense every day, can't even log in without them judging me. Pure mental damage.
