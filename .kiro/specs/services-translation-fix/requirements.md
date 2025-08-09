# Requirements Document

## Introduction

The services section on the 4K Print website is displaying translation keys instead of the actual translated service titles. This occurs because there is a mismatch between the translation keys used in the HTML (index.html) and the translation keys defined in the internationalization system (i18n.js). The issue affects all languages (French, Arabic, English) and impacts the user experience by showing technical keys like "services.advertising_panels.title" instead of proper service names.

## Requirements

### Requirement 1

**User Story:** As a website visitor, I want to see properly translated service titles in my selected language, so that I can understand what services are offered without seeing technical translation keys.

#### Acceptance Criteria

1. WHEN a user visits the services section THEN all service titles SHALL display the correct translated text instead of translation keys
2. WHEN a user switches languages THEN all service titles SHALL update to show the correct translations in the selected language
3. WHEN a user views the services section in French THEN titles SHALL display in proper French (e.g., "Panneaux Publicitaires", "Étiquettes de Produits")
4. WHEN a user views the services section in Arabic THEN titles SHALL display in proper Arabic with correct RTL formatting
5. WHEN a user views the services section in English THEN titles SHALL display in proper English (e.g., "Advertising Panels", "Product Labels")

### Requirement 2

**User Story:** As a developer maintaining the website, I want consistent translation key naming between HTML and i18n files, so that the translation system works reliably and is easy to maintain.

#### Acceptance Criteria

1. WHEN reviewing the codebase THEN translation keys in HTML SHALL match exactly with keys defined in i18n.js
2. WHEN adding new services THEN the translation key naming convention SHALL be consistent and predictable
3. WHEN the translation system loads THEN there SHALL be no missing translation keys that would cause fallback to key names
4. IF a translation key is missing THEN the system SHALL log a warning and display a fallback value instead of the raw key

### Requirement 3

**User Story:** As a quality assurance tester, I want to verify that all service translations are working correctly, so that I can ensure the website displays properly in all supported languages.

#### Acceptance Criteria

1. WHEN testing the services section THEN all 10 service tiles SHALL display proper translated titles
2. WHEN switching between languages THEN no service title SHALL remain as a translation key
3. WHEN inspecting the browser console THEN there SHALL be no translation-related errors or warnings
4. WHEN validating translations THEN each service SHALL have consistent naming across all three languages