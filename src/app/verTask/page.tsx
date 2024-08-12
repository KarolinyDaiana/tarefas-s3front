'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CardImage from "@/componentes/cardImage/CardImage";
import { IoCaretBack } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { read } from "fs";

interface VisualizarPedidoProps {
    searchParams: {
        id: number
    }
}

export default function AdicionarTask({ searchParams }: VisualizarPedidoProps) {

    const idTask = searchParams.id

    const { back } = useRouter();

    const [nome, setNome] = useState("")
    const [imagens, setImagens] = useState<any[]>([])
    const [img, setImg] = useState<any>()
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

    // const salvarImagens = () => {
    //     imagens.forEach((item) => {
    //         postImg(item)
    //     })
    //     // const task = { nome: titulo }
    //     // fetch(`http://localhost:8552/file/${idTask}`, {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json'
    //     //     },
    //     //     body: JSON.stringify(task)
    //     // })
    //     console.log("vai salvar a imagem")
    // }

    const postImg = () => {
        if (!img) {
            alert("Não há imagem!")
        } else {
            const formData = new FormData();

            formData.append('file', img)

            fetch(`http://localhost:8552/file/${idTask}`, {
                method: 'POST',
                body: formData
            })
            setImg("")
        }
    }

    const excluirTask = () => {
        fetch(`http://localhost:8552/task/${idTask}`, {
            method: 'DELETE'
        }).then(res => {
            return res.json();
        })
    }

    const handleImageChange = (e: any) => {
        // const file = e.target.files[0];
        // const reader = new FileReader();

        // reader.onloadend = () => {
        //     setImagens([...imagens, reader.result])
        //     setImg(reader.result)
        // };

        // if (file) {
        //     reader.readAsDataURL(file);
        // } else {
        //     setImagens(imagens);
        // }
        const file = e.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            setImagens([...imagens, URL.createObjectURL(file)]);
            setImg(file);
        }
    };

    return (
        <main className="w-[50%] m-auto flex flex-col justify-center h-full gap-4 py-20">
            <div className="flex flex-row justify-start gap-2 items-center w-full">
                <IoCaretBack className="font-bold text-2xl hover:-translate-x-1 duration-100 cursor-pointer" onClick={() => back()} />
                <p className="text-2xl font-semibold">{nome}</p>
            </div>
            <form action={postImg} className="flex flex-col gap-4">
                <div className="border-2 border-teal-900 w-full rounded-md p-2">

                    <div className="grid grid-cols-5 m-auto">
                        {
                            files.map((item) => (
                                <CardImage idFile={item.id} />
                            ))
                        }
                    </div>
                    <p className={`${img ? `font-semibold text-base px-2 text-teal-900` : `hidden`}`}>Nova imagem:</p>
                    {/* {
                            imagens &&
                            imagens.map((item) => (
                                <div className="flex flex-col items-center p-2">
                                    <img className="h-24" src={item} />
                                    <div onClick={() => setImagens(imagens.filter(value => value != item))} className="p-2 w-full justify-center flex">
                                        <FaTrash color="#f53421" size={20} />
                                    </div>
                                </div>
                            ))
                        } */}
                    {
                        img ?
                            <div className="flex flex-col items-center p-2">
                                <img className="h-24" src={img as string} />
                                <div onClick={() => setImg("")} className="p-2 w-full justify-center flex">
                                    <FaTrash color="#f53421" size={20} />
                                </div>
                            </div>
                            : <></>
                    }

                    <input type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-2 file:border-solid file:border-teal-900
                                file:text-sm file:font-semibold
                                file:bg-transparent file:text-teal-900
                                hover:file:shadow-sm duration-100" />
                </div>
                <div className="w-full flex flex-row gap-2">
                    <button onClick={() => excluirTask()} type="button" className="hover:bg-teal-700 hover:text-branco duration-300 border-teal-700 border-2 text-teal-700 p-2 rounded-md w-full">Excluir</button>
                    <button type="submit" className="hover:bg-teal-950 duration-300 bg-teal-700 text-violet-100 p-2 rounded-md w-full">Salvar</button>
                </div>
            </form>
        </main>
    )
}