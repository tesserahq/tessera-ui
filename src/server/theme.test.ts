import { describe, expect, it } from 'vitest'

import { setTheme } from './theme'

describe('setTheme', () => {
  it('sets a persistent theme cookie', () => {
    const cookie = setTheme('dark')

    expect(cookie).toContain('_theme=dark')
    expect(cookie).toContain('Max-Age=31536000')
    expect(cookie).toContain('Path=/')
    expect(cookie).toContain('SameSite=Lax')
  })

  it('expires the theme cookie when using the system theme', () => {
    const cookie = setTheme('system')

    expect(cookie).toContain('_theme=')
    expect(cookie).toContain('Max-Age=-1')
    expect(cookie).toContain('Path=/')
    expect(cookie).toContain('SameSite=Lax')
  })
})
