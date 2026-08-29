export interface TagsInputProps {
  /**
   * Current list of tags. This is controlled - you manage this in your component state.
   * @example ['newsletter', 'vip']
   */
  value: string[]

  /**
   * Callback fired whenever the tag list changes (add or remove).
   *
   * @param tags - The full updated list of tags
   *
   * @example
   * onChange={(tags) => setTags(tags)}
   */
  onChange: (tags: string[]) => void

  /**
   * Placeholder text shown in the input when there are no tags yet.
   * @default "Add a tag"
   */
  placeholder?: string

  /**
   * Additional CSS classes to apply to the input container.
   * @example "w-full" or "mb-4"
   */
  className?: string

  /**
   * Disables adding/removing tags and dims the control.
   * @default false
   */
  disabled?: boolean
}
