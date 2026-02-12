import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComboBox } from './combo-box'
import { withRouter } from 'storybook-addon-remix-react-router'
import React from 'react'

const meta: Meta<typeof ComboBox> = {
  title: 'Components/ComboBox',
  component: ComboBox,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    withRouter,
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

// 1. Simple string array
export const StringArray: Story = {
  render: () => {
    const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry']
    const [selected, setSelected] = React.useState<string | undefined>(fruits[0])

    return (
      <div className="space-y-4">
        <ComboBox
          name="fruit"
          label="Select a fruit"
          value={selected ?? ''}
          onChange={(fruit) => setSelected(fruit)}
          options={fruits}
          getOptionId={(fruit) => fruit}
          getOptionLabel={(fruit) => fruit}
          placeholder="Search fruits..."
        />

        {selected && (
          <div className="p-3 bg-muted rounded text-sm">
            <p>
              Selected: <strong>{selected}</strong>
            </p>
          </div>
        )}
      </div>
    )
  },
}

// 2. Object array - Direct access to all properties!
export const ObjectArray: Story = {
  render: () => {
    type User = { id: string; name: string; email: string; role: string }

    const users: User[] = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
    ]

    const [selected, setSelected] = React.useState<User | undefined>(users[0])

    return (
      <div className="space-y-4">
        <ComboBox
          name="user"
          label="Assign to user"
          value={selected?.id ?? ''}
          onChange={(user) => setSelected(user)}
          options={users}
          getOptionId={(user) => user.id}
          getOptionLabel={(user) => user.name}
          getSearchValue={(user) => `${user.name} ${user.email}`}
          renderOption={(user) => (
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-muted-foreground text-xs">{user.email}</span>
            </div>
          )}
          placeholder="Search users..."
        />

        {selected && (
          <div className="p-4 bg-muted rounded space-y-1 text-sm">
            <p>
              <strong>ID:</strong> {selected?.id}
            </p>
            <p>
              <strong>Name:</strong> {selected?.name}
            </p>
            <p>
              <strong>Email:</strong> {selected?.email}
            </p>
            <p>
              <strong>Role:</strong> {selected?.role}
            </p>
          </div>
        )}
      </div>
    )
  },
}

// 3. Complex object with pricing
export const CustomOptionDisplay: Story = {
  render: () => {
    type Plan = {
      id: string
      name: string
      price: number
      description: string
      features: number
    }

    const plans: Plan[] = [
      {
        id: 'free',
        name: 'Free Plan',
        price: 0,
        description: 'Perfect for getting started',
        features: 5,
      },
      {
        id: 'pro',
        name: 'Pro Plan',
        price: 29,
        description: 'For professionals and small teams',
        features: 20,
      },
      {
        id: 'enterprise',
        name: 'Enterprise Plan',
        price: 99,
        description: 'Advanced features for large organizations',
        features: 50,
      },
    ]

    const [selectedPlan, setSelectedPlan] = React.useState<Plan | undefined>(plans[0])

    return (
      <div className="space-y-4">
        <ComboBox
          name="plan"
          label="Select a plan"
          value={selectedPlan?.id ?? ''}
          onChange={(plan) => setSelectedPlan(plan)}
          options={plans}
          getOptionId={(plan) => plan.id}
          getOptionLabel={(plan) => plan.name}
          renderOption={(plan) => (
            <div className="flex items-start justify-between gap-4 w-full">
              <div className="flex flex-col">
                <span className="font-semibold">{plan.name}</span>
                <span className="text-muted-foreground text-xs">{plan.description}</span>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold">${plan.price}</div>
                <div className="text-muted-foreground text-xs">/month</div>
              </div>
            </div>
          )}
          placeholder="Choose your plan..."
        />

        {selectedPlan && (
          <div className="p-4 border rounded-lg space-y-2">
            <h3 className="font-bold text-lg">{selectedPlan.name}</h3>
            <p className="text-muted-foreground text-sm">{selectedPlan.description}</p>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-2xl font-bold">${selectedPlan.price}</span>
              <span className="text-muted-foreground">
                {selectedPlan.features} features included
              </span>
            </div>
          </div>
        )}
      </div>
    )
  },
}

// 4. Empty state handling
export const EmptyState: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string | undefined>('')

    const categories = ['Technology', 'Design', 'Marketing', 'Sales', 'Support']

    return (
      <div className="space-y-4">
        <ComboBox
          name="category"
          label="Category"
          value={selected ?? ''}
          onChange={(category) => setSelected(category)}
          options={categories}
          getOptionId={(c) => c}
          getOptionLabel={(c) => c}
          placeholder="Select a category..."
        />

        <div className="p-3 bg-muted rounded text-sm">
          {selected ? (
            <p>
              Selected: <strong>{selected}</strong>
            </p>
          ) : (
            <p className="text-muted-foreground">No selection yet</p>
          )}
        </div>
      </div>
    )
  },
}

// 5. Required field with error
export const Required: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string>('')
    const categories = ['Technology', 'Design', 'Marketing', 'Sales', 'Support']

    return (
      <div className="space-y-4">
        <ComboBox
          name="category"
          label="Category"
          value={selected}
          onChange={(category) => {
            if (category) {
              setSelected(category)
            }
          }}
          options={categories}
          getOptionId={(c) => c}
          getOptionLabel={(c) => c}
          required
          error={!selected ? 'Please select a category' : ''}
          placeholder="Select a category..."
        />

        <div className="p-3 bg-muted rounded text-sm">
          {selected ? (
            <p>
              Selected: <strong>{selected}</strong>
            </p>
          ) : (
            <p className="text-muted-foreground">No selection yet</p>
          )}
        </div>
      </div>
    )
  },
}
