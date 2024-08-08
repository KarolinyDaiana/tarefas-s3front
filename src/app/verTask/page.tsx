'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CardImage from "@/componentes/cardImage/CardImage";
import { IoCaretBack } from "react-icons/io5";

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

    useEffect(() => {
        fetch(`http://localhost:8552/task/${idTask}`)
            .then((res) => res.json())
            .then((data) => {
                setNome(data.nome);
                setFiles(data.files);
                console.log(data);
            });
    }, [idTask])

    return (
        <main className="w-[50%] m-auto flex flex-col justify-center h-full gap-4 py-20">
            <div className="flex flex-row justify-start gap-2 items-center w-full">
                {/* <p className="font-bold text-2xl hover:-translate-x-1 duration-100 cursor-pointer" onClick={() => back()}>{"<"}</p> */}
                <IoCaretBack className="font-bold text-2xl hover:-translate-x-1 duration-100 cursor-pointer" onClick={() => back()} />
                <p className="text-2xl font-semibold">{nome}</p>
            </div>
            <div className="border-2 border-teal-900 w-full rounded-md p-2">
                <input type="file" />
                <div className="grid grid-cols-5 m-auto">
                    {
                        files.map((item, key) => (
                            <CardImage key={key} idFile={item.id} />
                        ))
                    }
                </div>
            </div>
            <div className="w-full flex flex-row gap-2">
                <button className="hover:bg-teal-700 hover:text-branco duration-300 border-teal-700 border-2 text-teal-700 p-2 rounded-md w-full">Excluir</button>
                <button className="hover:bg-teal-950 duration-300 bg-teal-700 text-violet-100 p-2 rounded-md w-full">Salvar</button>
            </div>
        </main>
    )
}