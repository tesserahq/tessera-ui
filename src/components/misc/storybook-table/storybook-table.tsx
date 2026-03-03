import React from 'react'

/** Single prop row for StorybookTable */
export interface PropRow {
  name: string
  required: boolean
  type: string
  default?: string
  description?: string
}

/** Table for component props: Name, Required, Type, Default, Description */
export function StorybookTable({
  rows,
  title,
}: {
  rows: PropRow[]
  title?: string
}): React.ReactNode {
  return (
    <div>
      {title && <h4 style={{ fontWeight: 'bold' }}>{title}</h4>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Required</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Type</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Default</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.name ?? index}>
              <td style={{ padding: '0.5rem' }}>
                <code>{row.name}</code>
              </td>
              <td style={{ padding: '0.5rem' }}>{row.required ? 'Yes' : 'No'}</td>
              <td style={{ padding: '0.5rem' }}>
                <code>{row.type}</code>
              </td>
              <td style={{ padding: '0.5rem' }}>
                {row.default != null ? <code>{row.default}</code> : '—'}
              </td>
              <td style={{ padding: '0.5rem' }}>{row.description ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
