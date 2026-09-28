import { subscribeToSchemeChange } from '@epic-web/client-hints/color-scheme'
import { useEffect } from 'react'
import { useRevalidator } from 'react-router'
import { hintsUtils } from '../hints'

/**
 * Injects an inline script that checks/sets Client Hint Cookies (if not
 * present), and reloads the page if any Cookie was set to an inaccurate value.
 * Render it in the document `<head>`.
 */
export function ClientHintCheck({ nonce }: { nonce: string }) {
  const { revalidate } = useRevalidator()
  useEffect(() => subscribeToSchemeChange(() => revalidate()), [revalidate])

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: hintsUtils.getClientHintCheckScript(),
      }}
    />
  )
}
