export interface ComboBoxProps<T> {
  /**
   * Name attribute for the hidden input field (used for form submission)
   * @example "user" or "country" or "plan"
   */
  name: string

  /**
   * Label text displayed above the input field
   * @example "Select a user" or "Choose your plan"
   */
  label: string

  /**
   * Current selected value (should be the ID from getOptionId)
   * This is controlled - you manage this in your component state
   * @example "1" or "pro" or "us"
   */
  value: string

  /**
   * Callback fired when user selects an option
   * Receives the full selected object (or undefined if not found)
   *
   * @param option - The complete selected object from your options array
   *
   * @example
   * onChange={(user) => {
   *   if (user) {
   *     setSelectedId(user.id)
   *     setSelectedUser(user)
   *     console.log(user.email) // Access any property
   *   }
   * }}
   */
  onChange: (option: T | null) => void

  /**
   * Array of options to display in the dropdown
   * Can be any type: strings, objects, or custom types
   *
   * @example
   * // String array
   * ['apple', 'banana', 'cherry']
   *
   * @example
   * // Object array
   * [
   *   { id: '1', name: 'John', email: 'john@example.com' },
   *   { id: '2', name: 'Jane', email: 'jane@example.com' }
   * ]
   */
  options: T[]

  /**
   * Function to extract the unique ID from each option
   * This ID is used for:
   * - Matching with the `value` prop
   * - React keys
   * - Form submission value
   *
   * @param option - An item from your options array
   * @returns A unique string identifier
   *
   * @example
   * // For strings
   * getOptionId={(fruit) => fruit}
   *
   * @example
   * // For objects
   * getOptionId={(user) => user.id}
   */
  getOptionId: (option: T) => string

  /**
   * Function to extract the display label from each option
   * This text is shown:
   * - In the input field when selected
   * - In the dropdown (unless using renderOption)
   *
   * @param option - An item from your options array
   * @returns The text to display
   *
   * @example
   * // For strings
   * getOptionLabel={(fruit) => fruit}
   *
   * @example
   * // For objects
   * getOptionLabel={(user) => user.name}
   */
  getOptionLabel: (option: T) => string

  /**
   * Optional function to control what text is searched when user types
   * If not provided, defaults to getOptionLabel
   * Use this to search across multiple fields
   *
   * @param option - An item from your options array
   * @returns A string containing all searchable text
   *
   * @example
   * // Search by name AND email
   * getSearchValue={(user) => `${user.name} ${user.email}`}
   *
   * @example
   * // Search by multiple fields
   * getSearchValue={(product) => `${product.name} ${product.sku} ${product.brand}`}
   */
  getSearchValue?: (option: T) => string

  /**
   * Optional custom render function for dropdown items
   * If not provided, displays getOptionLabel result
   * Use this for rich UI with descriptions, icons, badges, etc.
   *
   * @param option - An item from your options array
   * @returns React node to render in the dropdown
   *
   * @example
   * // Simple with description
   * renderOption={(user) => (
   *   <div>
   *     <div className="font-bold">{user.name}</div>
   *     <div className="text-sm text-gray-500">{user.email}</div>
   *   </div>
   * )}
   *
   * @example
   * // With icons and badges
   * renderOption={(plan) => (
   *   <div className="flex items-center gap-2">
   *     <span>{plan.icon}</span>
   *     <span>{plan.name}</span>
   *     <span className="badge">${plan.price}</span>
   *   </div>
   * )}
   */
  renderOption?: (option: T) => React.ReactNode

  /**
   * Whether the field is required
   * Adds a red asterisk (*) to the label
   * @default false
   */
  required?: boolean

  /**
   * Error message to display below the input
   * Shows in red text when provided
   * Also adds error styling to the input border
   *
   * @example error={!value ? 'Please select an option' : ''}
   */
  error?: string

  /**
   * Placeholder text shown in the search input inside the dropdown
   * @default "Search..."
   * @example "Search users..." or "Type to filter..."
   */
  placeholder?: string

  /**
   * Additional CSS classes to apply to the input container
   * @example "w-full" or "mb-4"
   */
  className?: string
}
