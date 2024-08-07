'use client'
import { useState } from "react";

export default function AdicionarTask() {

    const [tarefas, setTarefas] = useState([])

    const verTarefas = () => {
        fetch('http://localhost:8552/task').then(res => {
            return res.json()
        }).then(data => {
            setTarefas(data)
            console.log(data)
        })
    }

    const requisicaoImagem = (id: number) => {
        fetch(`http://localhost:8552/file/${id}`).then(res => {
            return res.text();
        }).then(data => {
            return data;
        });
    }

    const verImagem = (files: Object[]) => {
        return(
            files.map((item, key) => (
                <img key={key} className="size-20" src={requisicaoImagem(item.id)!} />
            ))
        )
    }


    return (
        <main className="w-full flex flex-col items-center justify-center h-full gap-4">
            <button onClick={() => verTarefas()}>Ver tarefas</button>
            <div>
                {
                    tarefas.map((item, key) => (
                        <div className="border border-teal-900 p-2 m-4" key={key}>
                            <p>{item.nome}</p>
                            {verImagem(item.files)}
                        </div>
                    ))
                }
            </div>
        </main>
    )
}