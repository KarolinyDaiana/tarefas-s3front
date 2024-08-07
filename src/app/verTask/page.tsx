'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

interface VisualizarPedidoProps {
    searchParams: {
        id: number
    }
}

export default function AdicionarTask({ searchParams }: VisualizarPedidoProps) {

    const idTask = searchParams.id

    const { back } = useRouter();

    const [nome, setNome] = useState("")
    const [files, setFiles] = useState<Object[]>([])
    const [filesUrl, setFilesUrl] = useState<string[]>([])
    // const [urlFto, setUrlFto] = useState("")

    fetch(`http://localhost:8552/task/${idTask}`).then(res => {
        return res.json();
    }).then(data => {
        setNome(data.nome)
        console.log(data)
    });
    // fetch('http://localhost:8552/file/1').then(res => {
    //     return res.text();
    // }).then(data => {
    //     console.log(data)
    //     setUrlFto(data)
    // });

    return (
        <main className="w-[50%] m-auto flex flex-col justify-center h-full gap-4 py-20">
            <div className="flex flex-row justify-start gap-2 items-center w-full">
                <p className="font-bold text-2xl hover:-translate-x-1 duration-100 cursor-pointer" onClick={() => back()}>{"<"}</p>
                <p className="text-2xl font-semibold">{nome}</p>
            </div>
            <div className="border-2 border-teal-900 w-full h-24 rounded-md">
                <input type="file" />
            </div>
            {/* <img className="w-32" src={urlFto} /> */}
            <div className="w-full flex flex-row gap-2">
                <button className="border-teal-700 border-2 text-teal-700 p-2 rounded-md w-full">Excluir</button>
                <button className="bg-teal-700 text-violet-100 p-2 rounded-md w-full">Salvar</button>
            </div>
        </main>
    )
}