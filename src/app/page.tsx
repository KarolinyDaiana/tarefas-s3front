'use client'
import { useRouter } from 'next/navigation'

export default function PaginaInicial() {
  const router = useRouter()

  return (
    <main className="w-full flex flex-col items-center justify-center h-full gap-4">
        <h1 className='font-bold text-2xl'>Bem vindo ao seu gerenciador de tarefas!</h1>
      <div className='flex flex-col gap-2'>
        <button className='bg-teal-700 text-violet-100 p-2 rounded-md' onClick={() => router.push('./verTask')}>Ver tarefas</button>
        <button className='bg-teal-700 text-violet-100 p-2 rounded-md' onClick={() => router.push('./adicionarTask')}>Adicionar tarefa</button>
      </div>
    </main>
  );
}
