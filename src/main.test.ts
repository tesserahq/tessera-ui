import { describe, expect, it } from 'vitest'

import * as tessera from './main'

describe('public API', () => {
  it.each([
    'TesseraProvider',
    'useApp',
    'AuthProvider',
    'AuthGuard',
    'useAuth',
    'ProfileMenu',
    'FormField',
    'FormSelect',
    'FormWrapper',
  ])('exports %s', (name) => {
    expect(tessera).toHaveProperty(name)
  })
})
