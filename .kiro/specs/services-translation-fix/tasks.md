# Implementation Plan

- [x] 1. Add missing translation keys to i18n.js for all three languages




  - Add translation keys for services that are missing from the i18n.js file
  - Ensure all 10 service keys used in HTML have corresponding translations in French, Arabic, and English
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2_

- [x] 1.1 Add advertising_panels translation keys


  - Add `services.advertising_panels.title` and `services.advertising_panels.description` for all three languages (fr, ar, en)
  - Use appropriate translations that match the service description in HTML
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 1.2 Add product_labels translation keys


  - Add `services.product_labels.title` and `services.product_labels.description` for all three languages (fr, ar, en)
  - Use appropriate translations that match the service description in HTML
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 1.3 Add pvc_vinyl translation keys


  - Add `services.pvc_vinyl.title` and `services.pvc_vinyl.description` for all three languages (fr, ar, en)
  - Use appropriate translations that match the service description in HTML
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 1.4 Add business_cards translation keys


  - Add `services.business_cards.title` and `services.business_cards.description` for all three languages (fr, ar, en)
  - Use appropriate translations that match the service description in HTML
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_



- [x] 1.5 Add stickers translation keys





  - Add `services.stickers.title` and `services.stickers.description` for all three languages (fr, ar, en)


  - Use appropriate translations that match the service description in HTML
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_



- [x] 1.6 Add decals translation keys





  - Add `services.decals.title` and `services.decals.description` for all three languages (fr, ar, en)
  - Use appropriate translations that match the service description in HTML
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 1.7 Add vision_film translation keys





  - Add `services.vision_film.title` and `services.vision_film.description` for all three languages (fr, ar, en)
  - Use appropriate translations that match the service description in HTML
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 2. Implement translation key validation and error handling









  - Add console warnings for missing translation keys during development
  - Implement fallback display mechanism when translation keys are not found 
  - _Requirements: 2.3, 2.4_

- [x] 2.1 Add missing key detection to I18nManager


  - Modify the translate method to detect when a translation key is missing
  - Log warnings to console when translation keys are not found
  - _Requirements: 2.3, 2.4_

- [x] 2.2 Implement fallback display mechanism


  - When a translation key is missing, display a user-friendly fallback instead of the raw key
  - Create fallback text by converting key names to readable format (e.g., "advertising_panels" → "Advertising Panels")
  - _Requirements: 2.4_

- [x] 3. Test and verify translation functionality





  - Test all service translations across all three languages (French, Arabic, English)
  - Verify language switching works correctly for all service titles
  - Ensure no translation keys are displayed instead of actual text
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 3.1 Create automated translation validation test


  - Write test function to verify all HTML translation keys have corresponding i18n entries
  - Test that all 10 service tiles display proper translated text in all languages
  - _Requirements: 3.1, 3.2, 3.4_

- [x] 3.2 Test language switching functionality


  - Verify that switching between French, Arabic, and English updates all service titles correctly
  - Ensure no service titles remain as translation keys after language switching
  - Test RTL formatting for Arabic translations
  - _Requirements: 3.2, 3.4_

- [x] 3.3 Verify browser console has no translation errors


  - Test the website in browser and check console for any translation-related warnings or errors
  - Ensure the error handling system works correctly when keys are missing
  - _Requirements: 3.3_