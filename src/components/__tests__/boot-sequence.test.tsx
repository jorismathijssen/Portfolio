import { render, screen, act } from '@testing-library/react'
import { BootSequence } from '@/components/boot-sequence'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: { children: React.ReactNode, className?: string, [key: string]: unknown }) => (
      <div className={className} {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('BootSequence', () => {
  it('renders initial state', () => {
    render(<BootSequence onComplete={() => {}} />)
    // Initially empty or just cursor, but we check if component mounts
    const container = screen.getByText((content, element) => {
      return element?.className.includes('bg-black') ?? false
    })
    expect(container).toBeInTheDocument()
  })

  it('calls onComplete after sequence finishes', async () => {
    jest.useFakeTimers()
    const onComplete = jest.fn()
    
    render(<BootSequence onComplete={onComplete} />)
    
    // Fast-forward time to cover all delays
    // Total delay is roughly 200+600+400+500+400+800+1000+1200 = ~5100ms
    act(() => {
      jest.advanceTimersByTime(7000)
    })

    expect(onComplete).toHaveBeenCalled()
    
    jest.useRealTimers()
  })
})
