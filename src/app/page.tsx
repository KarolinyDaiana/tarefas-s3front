'use client'
import CardTask from '@/componentes/cardTask/CardTask'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PaginaInicial() {
  const router = useRouter()

  const [tarefas, setTarefas] = useState<Object[]>([])
  const [titulo, setTitulo] = useState("")

  useEffect(() => {
    atualizarTarefas()
  }, [])

  const atualizarTarefas = () => {
    fetch('http://localhost:8552/task').then(res => {
      return res.json()
    }).then(data => {
      setTarefas(data)
      console.log(data)
    })
  }

  const salvarTask = () => {
    const task = {nome: titulo}
    fetch('http://localhost:8552/task/novatask', {
      method:'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)  
    })
    setTitulo("")
  }

  return (
    <main className="w-[50%] m-auto flex flex-col items-center justify-center h-full gap-4 py-20">
      <h1 className='font-bold text-2xl'>Bem vindo ao seu gerenciador de tarefas!</h1>
      <form action={salvarTask} className='flex flex-row gap-2 w-full'>
        <input 
          required
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          type="text" placeholder="Titulo da tarefa"
          className="p-2 w-full rounded-md border-2 border-teal-900"
        />
        <button type='submit' className='w-1/3 hover:bg-teal-900 duration-100 bg-teal-700 text-violet-100 p-2 rounded-md'>Adicionar tarefa</button>
      </form>

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
