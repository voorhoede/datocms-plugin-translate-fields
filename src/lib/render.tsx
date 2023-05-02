import { StrictMode, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

const domNode = document.getElementById('root')!
const root = createRoot(domNode)
export function render(component: ReactNode): void {
  return root.render(<StrictMode>{component}</StrictMode>)
}
