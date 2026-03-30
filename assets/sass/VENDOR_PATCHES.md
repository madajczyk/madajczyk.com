# Bulma Vendor Patches

This directory vendors Bulma `1.0.4` with a small local Sass-compatibility patch.

Why this exists:
- newer Dart Sass versions emit deprecation warnings for legacy Bulma `if()`, `unquote()`, `map-get()`, and `index()` usage
- the goal is to keep `assets/sass/` close to upstream while making future Sass upgrades less noisy

Local patch applied:
- `utilities/functions.scss`
  - removed deprecated `if(condition, a, b)` usage in `bulmaStringToNumber()`
- `utilities/mixins.scss`
  - replaced deprecated `if()` and `map-get()` usages with explicit `@if` logic and `map.get()`
- `helpers/typography.scss`
  - replaced deprecated `index()` and selector-interpolated `if()` usage
- `utilities/css-variables.scss`
  - replaced deprecated global `unquote()` with `string.unquote()`

Upgrade note:
- when Bulma releases a newer version, refresh `assets/sass/` from upstream first
- then rebuild and verify whether these patches are still needed
- site-specific overrides live outside this vendor tree in `assets/site.scss` and `assets/site-sass/`
