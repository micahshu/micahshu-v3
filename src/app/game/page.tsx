import MazeGame from '@/components/MazeGame'

export const metadata = {
  title: 'Maze Game — Micah Shu',
}

export default function GamePage() {
  return (
    <div
      style={{
        height:         'calc(100dvh - 4rem)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        background:     'var(--color-bg)',
        overflow:       'hidden',
      }}
    >
      <MazeGame />
    </div>
  )
}
