'use client'
import CardTask from "@/componentes/cardTask/CardTask";
import { useEffect, useState } from "react";

export default function AdicionarTask() {

    const [tarefas, setTarefas] = useState([])



    useEffect(() => {
        if (tarefas) {
            fetch('http://localhost:8552/task').then(res => {
                return res.json()
            }).then(data => {
                setTarefas(data)
                console.log(data)
            })
        }
    })
    return (
        <main className="w-full flex flex-col items-center justify-center m-auto h-full gap-4">
            <div className="flex flex-row justify-center gap-4 m-auto w-full">
                {
                    tarefas.map((item, key) => (
                        <CardTask key={key} idTask={item.id} />
                    ))
                }
            </div>
        </main>
    )
}