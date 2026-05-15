import type { Meta, StoryObj } from '@storybook/react-vite'
import type React from 'react'
import { withRouter } from 'storybook-addon-remix-react-router'
import { Applications } from './application'
import { TesseraUIContext, type ITesseraUIContextProps } from '../../provider/AppProvider'
import type { Application } from '../../types/application'
import ApplicationDocs from './application.mdx'

const applicationsMock: Application[] = [
  {
    name: 'Conversa',
    url: 'https://conversa.mylinden.family/',
    logo: 'https://conversa.mylinden.family/assets/conversa-logo-CQQoTleh.png',
    description: '',
    id: 'a1eef4de-3c97-4ba7-98cd-11180365d892',
    created_at: '2026-03-11T15:51:07.418935',
    updated_at: '2026-03-12T17:55:22.419976',
  },
  {
    name: 'Orcha',
    url: 'https://orcha.mylinden.family',
    logo: 'https://orcha.mylinden.family/assets/orcha-logo-DsPf1K6a.png',
    description: 'description',
    id: '3cb3e05b-e18d-482e-9f22-5f2c78c8806d',
    created_at: '2026-02-28T23:45:05.813178',
    updated_at: '2026-03-11T16:03:53.361358',
  },
  {
    name: 'Sendly',
    url: 'https://sendly.mylinden.family',
    logo: 'https://sendly.mylinden.family/assets/sendly-logo-D2OCIBYH.png',
    description: '',
    id: '04edeea2-ee2e-4686-8cd7-6d9eddd1e829',
    created_at: '2026-02-28T23:45:05.813176',
    updated_at: '2026-02-28T23:45:05.813176',
  },
  {
    name: 'Indexa',
    url: 'https://identity.mylinden.family',
    logo: 'https://indexa.mylinden.family/assets/indexa-logo-YPFY67JR.png',
    description: '',
    id: '38f08c97-19ab-44d0-a175-3aea10fb4f18',
    created_at: '2026-02-28T23:45:05.813172',
    updated_at: '2026-03-12T17:56:17.776130',
  },
  {
    name: 'Quore',
    url: 'https://quore.mylinden.family',
    logo: 'https://quore.mylinden.family/assets/quore-logo-CUYpVLvD.png',
    description: '',
    id: 'e9a6f63d-85a1-4f1e-ac1b-5224bf1b381f',
    created_at: '2026-02-28T23:45:05.813169',
    updated_at: '2026-03-12T17:58:00.620574',
  },
  {
    name: 'Custos',
    url: 'https://custos.mylinden.family',
    logo: 'https://custos.mylinden.family/assets/custos-logo-C9mafeqj.png',
    description: '',
    id: 'f961ae8a-d224-40cb-ab13-3dafa497eb7a',
    created_at: '2026-02-28T23:45:05.813166',
    updated_at: '2026-02-28T23:45:05.813167',
  },
  {
    name: 'Vaulta',
    url: 'https://vaulta.mylinden.family',
    logo: 'https://vaulta.mylinden.family/assets/vaulta-logo-IPJFGars.png',
    description: '',
    id: '2d751baf-3533-4759-a9db-0fdad18437e2',
    created_at: '2026-02-28T23:45:05.813164',
    updated_at: '2026-02-28T23:45:05.813164',
  },
  {
    name: 'Looply',
    url: 'https://looply.mylinden.family',
    logo: 'https://looply.mylinden.family/assets/looply-logo-BcNwZYOK.png',
    description: '',
    id: 'aa8235ae-59f8-4c33-8a64-5efa9352c7f7',
    created_at: '2026-02-28T23:45:05.813160',
    updated_at: '2026-02-28T23:45:05.813161',
  },
  {
    name: 'Identies',
    url: 'https://identies.mylinden.family',
    logo: 'https://identies.mylinden.family/assets/identies-logo-EL6bwbBR.png',
    description: '',
    id: '3b1e0947-ea6c-4ddb-84be-26dcd545fafd',
    created_at: '2026-02-28T23:45:05.813154',
    updated_at: '2026-02-28T23:45:05.813157',
  },
]

const buildContext = (overrides?: Partial<ITesseraUIContextProps>): ITesseraUIContextProps => ({
  token: 'storybook-token',
  user: null,
  isLoadingIdenties: false,
  error: null,
  isLoadingApps: false,
  applications: applicationsMock,
  updateUser: async () => {},
  ...overrides,
})

const withAppContext =
  (contextValue: ITesseraUIContextProps) =>
  // eslint-disable-next-line react/display-name
  (Story: React.ComponentType): React.JSX.Element => (
    <TesseraUIContext.Provider value={contextValue}>
      <Story />
    </TesseraUIContext.Provider>
  )

const meta: Meta<typeof Applications> = {
  title: 'Shortcut/Applications',
  component: Applications,
  parameters: {
    layout: 'centered',
    docs: {
      page: ApplicationDocs,
    },
  },
  decorators: [withRouter],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [withAppContext(buildContext())],
}
