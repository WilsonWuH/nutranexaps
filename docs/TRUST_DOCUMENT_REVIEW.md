# Trust Document Review Register

Review date: 2026-09-03  
Publication authorization: confirmed by the owner on 2026-09-03

This register records what is visible in the supplied website document images. It is a publication and renewal control, not a substitute for issuer verification, legal review, or a buyer's product- and market-specific qualification.

| Document | Name / scope visible in supplied copy | Date status on review date | Public handling |
| --- | --- | --- | --- |
| Business Licence | 山东佰安瑞生物药业有限公司; established Dec 25, 2013 | Public copy issued Jan 10, 2024; no fixed expiry printed | Public gallery |
| Food Production Licence | SC13137152113920; 山东佰安瑞生物药业有限公司 | Dec 10, 2025–Dec 9, 2030 | Public gallery |
| Food Production Licence Item Details | Other foods entry includes phosphatidylserine | Through Dec 9, 2030 | Public gallery |
| U.S. Food Facility Registration Record | Private registrar record naming Shandong Nutranexa Biopharmaceutical Co., Ltd. | Printed expiry Dec 31, 2026; renewal due soon | Controlled buyer review only; removed from homepage and public gallery |
| Kosher Certificate | Phosphatidylserine; Shandong Nutranexa Biopharmaceutical Co., Ltd. | Through May 31, 2027 | Public gallery |
| Halal Certificate | Phosphatidylserine; Nutranexa / Shushi brand references | Dec 26, 2024–Dec 26, 2027 | Public gallery |
| PS 70% COA | Model PP701; lot C00120260604; 72.9 g/100g PS | Representative historical batch | Public gallery with sample warning |

## Controls implemented

- `config/trust/documents.mjs` is the single source for public descriptions, dates, publication status, and review status.
- `npm run trust:verify` checks that every referenced file exists, fails when a dated public record expires, and warns 120 days before renewal.
- The FDA-related image is not displayed publicly. FDA states that it does not issue or recognize private food-facility registration certificates and that assignment of a registration number is not approval or endorsement: <https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/questions-regarding-whether-food-facilities-are-required-pay-registration-fees-and-private>.
- Current shipment COAs and current controlled copies remain request-based and must be matched to the exact product, source, lot, destination market, and commercial entity.

## Renewal priorities

1. Replace or revalidate the controlled U.S. food-facility registration evidence before Dec 31, 2026.
2. Recheck Kosher scope and obtain the next copy before May 31, 2027.
3. Recheck Halal scope and obtain the next copy before Dec 26, 2027.
4. Recheck the production licence and item details before Dec 9, 2030 or sooner if the entity, site, scope, or licence record changes.
