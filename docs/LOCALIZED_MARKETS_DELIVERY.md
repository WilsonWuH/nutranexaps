# Nutranexa 韩语与土耳其语子目录交付说明

## 范围与架构

- 英文继续使用根路径 `/`，未迁移到 `/en/`。
- 韩语使用 `/ko/`，土耳其语使用 `/tr/`。
- `apps/kr-site` 与 `apps/tr-site` 两个独立站应用未修改；主站子目录由 `tools/build_market_subdirectories.mjs` 单独生成。
- 本地化源内容位于 `content/ko/site.mjs` 与 `content/tr/site.mjs`，共享公司配置与路由映射位于 `config/locales/markets.mjs`。
- 每个市场 18 页，共 36 页；共享图片、CSS、表单 API、Schema 与 Analytics 逻辑。

## URL 清单

下列路径在 `/ko` 与 `/tr` 下各有一份：

1. `/`
2. `/about/`
3. `/contact/`
4. `/quote/`
5. `/sample-request/`
6. `/quality-control/`
7. `/technical-documents/`
8. `/packaging-delivery/`
9. `/faq/`
10. `/blog/`
11. `/products/`
12. `/products/soy-phosphatidylserine/`
13. `/products/sunflower-phosphatidylserine/`
14. `/products/ps-specifications/`
15. `/applications/`
16. `/applications/dietary-supplements/`
17. `/applications/functional-foods/`
18. `/applications/oem-odm/`

## SEO 与关键词映射

每页均包含独立 Title、Meta Description、H1、正文、canonical、Open Graph、图片 ALT、JSON-LD、内链与语言切换。完整 Title/Description 以两个内容源文件为准，构建校验会检查缺失项。

| 页面组 | 韩语主题 | 土耳其语主题 | 主要转化 |
|---|---|---|---|
| 首页 | 포스파티딜세린 원료 공급업체 | fosfatidilserin üreticisi / tedarikçisi | 报价、样品 |
| 大豆产品 | 대두 유래 포스파티딜세린 | soya kaynaklı fosfatidilserin | 技术资料、报价 |
| 向日葵产品 | 해바라기 유래 포스파티딜세린 | ayçiçeği kaynaklı fosfatidilserin | 样品、技术资料 |
| 规格页 | PS 함량 / PS 20% / PS 50% | PS oranı / PS 20% / PS 50% | 规格书、COA |
| 应用页 | 건강기능식품 / 기능성 식품 / OEM·ODM | takviye edici gıda / fonksiyonel gıda / OEM | 开发咨询 |
| 质量与文档 | 품질 관리 / COA / 규격서 | kalite kontrol / COA / TDS / SDS | 文档申请 |
| 报价与样品 | 견적 / 샘플 | fiyat / numune | 询盘提交 |

## hreflang 与 sitemap

- 有真实英文对应页时输出 `en`、`ko`、`tr`、`x-default`，且英文指向根路径。
- 仅韩/土存在的页面只互相映射，避免虚构英文对应页。
- 主索引：`/sitemap.xml`
- 英文：`/sitemap-en.xml`
- 韩语：`/sitemap-ko.xml`
- 土耳其语：`/sitemap-tr.xml`
- 原有其他语言：`/sitemap-existing-locales.xml`

## 表单与后台字段

前端包含姓名、公司、国家、商务邮箱、网站、电话、WhatsApp、KakaoTalk（韩语）、PS 来源、PS 含量、应用、预计数量、样品、文档、留言和隐私同意。

后台记录 Language、Locale、Source Page、Landing Page、Referrer、UTM Source/Medium/Campaign、Submitted Time、Requested Product/Assay、Estimated Quantity、Sample Required、Documents Required。`/api/inquiry` 执行服务端必填与邮箱校验、字段长度清洗、honeypot 和基于 IP 的短期限流，再转发邮件通知。

## Analytics 事件

已实现或预留：`page_language`、`quote_form_submit`、`sample_form_submit`、`coa_request`、`specification_request`、`email_click`、`phone_click`、`whatsapp_click`、`kakao_click`、`product_view`、`document_download`、`contact_form_success`、`distributor_inquiry`、`oem_odm_inquiry`。事件写入 `window.dataLayer`，需在生产环境接入 GA4/GTM 容器。

## Naver 配置

1. 已获取并配置 Naver Search Advisor 所有权验证 meta。
2. 已于 2026-07-13 在 Search Advisor 完成所有权确认。
3. 已提交 `https://nutranexaps.com/sitemap-ko.xml`（Naver 登记时间：2026-07-13 23:04:57，Asia/Shanghai）。
4. 检查 `/ko/` 抓取、canonical、移动端与 robots 状态。
5. 后续围绕供应商选择、来源比较、COA/规格书和样品评估维护 Naver Blog 内容，并链接到对应韩语落地页。

## 测试命令与结果

- `npm run build`：通过，包括 Next.js 编译与 TypeScript 检查。
- `npm run verify:markets`：36/36 页面通过，覆盖编码、Title、Meta、H1、canonical、hreflang、ALT、Schema、内链、表单字段和 sitemap。
- `npm run i18n:verify`：原有 414 个本地化页面、6 份字典和 414 个 sitemap URL 通过。
- `npm run verify:markets:browser`：韩/土首页与联系页的桌面及 390px 移动端通过；导航可操作，无横向溢出；服务端无效表单返回 400。
- `npm audit`：0 个已知漏洞。

## 已知问题与 TODO

- 已完成生产部署、Naver 所有权确认和韩语 sitemap 提交。
- 已配置 KakaoTalk ID `wilsonps1`，韩语站支持一键复制并记录 `kakao_click`。
- TODO：提供 GA4/GTM ID。
- TODO：确认 CRM 接口或 webhook；当前已支持邮件通知。
- TODO：首次使用 FormSubmit 邮件转发时确认收件邮箱激活状态，并完成一笔受控测试询盘。
- TODO：确认 PS 70%/80% 是否真实可供；确认前不公开为固定产品。
- 已确认标准 MOQ 为 25 kg / 1 桶；TODO：确认交期、Incoterms、TDS/SDS/GMO/过敏原文档范围。
- TODO：所有韩国与土耳其市场的法规和健康声称上线前执行 `LEGAL REVIEW REQUIRED`。
- TODO：接入生产域名后运行正式 Lighthouse/Core Web Vitals，并以真实 CDN、缓存和网络数据复测。
