'use client'
import { useState } from "react";

export default function AdicionarTask() {

    const [nome, setNome] = useState("")
    const [urlFto, setUrlFto] = useState("")

    fetch('http://localhost:8552/task/9').then(res => {
        return res.json();
    }).then(data => {
        setNome(data.nome)
        console.log(data)
    });
    fetch('http://localhost:8552/file/5').then(res => {
        return res.text();
    }).then(data => {
        console.log(data)
        setUrlFto(data)
    });

    return (
        <main className="w-full flex flex-col items-center justify-center h-full gap-4">
            <div>
                {nome}
            </div>
            <img className="w-32" src={urlFto} />
        </main>
    )
}