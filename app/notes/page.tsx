import { createClient } from '@/lib/supabase/server'
import { Suspense } from 'react'

async function NotesList() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select()

  if (!notes) {
    return <p>No notes found</p>
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          {note.title}
        </li>
      ))}
    </ul>
  )
}

export default function Page() {
  return (
    <main>
        <h2>Notes:</h2>
        {/* We wrap the data component in Suspense */}
        <Suspense fallback={<p>Loading notes...</p>}>
            <NotesList />
        </Suspense>
    </main>
  );
}