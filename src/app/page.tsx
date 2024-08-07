'use client'
import CardTask from '@/componentes/cardTask/CardTask'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PaginaInicial() {
  const router = useRouter()

  const [tarefas, setTarefas] = useState<Object[]>([])
  const [titulo, setTitulo] = useState("")
  const [idTask, setIdTask] = useState()

  useEffect(() => {
    fetch('http://localhost:8552/task').then(res => {
      return res.json()
    }).then(data => {
      setTarefas(data)
      setIdTask(data.id)
      console.log(data)
    })
  }, [])

  return (
    <main className="w-[50%] m-auto flex flex-col items-center justify-center h-full gap-4 py-20">
      <h1 className='font-bold text-2xl'>Bem vindo ao seu gerenciador de tarefas!</h1>
      <div className='flex flex-row gap-2 w-full'>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.value)}
          type="text" placeholder="Titulo da tarefa"
          className="p-2 w-full rounded-md border-2 border-teal-900"
        />
        {/* <button className='w-1/4 bg-teal-700 text-violet-100 p-2 rounded-md' onClick={() => router.push('./verTask')}>Ver tarefas</button> */}
        <button className='w-1/3 bg-teal-700 text-violet-100 p-2 rounded-md'>Adicionar tarefa</button>
      </div>

      <div className='flex flex-col justify-center gap-4 m-auto w-full'>
        {
          tarefas.map((item, key) => (
            <CardTask key={key} idTask={item.id} />
          ))
        }
      </div>

    </main>
  );
}
