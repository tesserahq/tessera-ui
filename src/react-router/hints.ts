/**
 * Client Hints, shared by the server (`getHints` in the root loader) and the
 * client (`ClientHintCheck`).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Client_hints
 */
import { getHintUtils } from '@epic-web/client-hints'
import { clientHint as colorSchemeHint } from '@epic-web/client-hints/color-scheme'
import { clientHint as timeZoneHint } from '@epic-web/client-hints/time-zone'

export const hintsUtils = getHintUtils({
  theme: colorSchemeHint,
  timeZone: timeZoneHint,
})

export const { getHints } = hintsUtils
