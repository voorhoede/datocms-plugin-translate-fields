import { StrictMode, ReactNode } from 'react'
import ReactDOM from 'react-dom'

export function render(component: ReactNode): void {
  return ReactDOM.render(
    <StrictMode>{component}</StrictMode>,
    document.getElementById('root')
  )
}
