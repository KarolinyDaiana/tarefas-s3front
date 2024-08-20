'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { FaCaretRight, FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

interface ITask {
    idTask: number
}

const CardTask = ({ idTask }: ITask) => {
    const router = useRouter()

    const [nome, setNome] = useState("")

    fetch(`http://localhost:8552/task/${idTask}`).then(res => {
        return res.json();
    }).then(data => {
        setNome(data.nome)
    });

    const deletarTask = () => {
        fetch(`http://localhost:8552/task/${idTask}`, {
            method: 'DELETE'
        }).then(res => {
        return res.json();
    })
    }

    return (
        <div className="border-2 border-teal-900 items-center rounded-md justify-between flex flex-row gap-2 p-2 w-full">
            <p className="w-full">{nome}</p>
            <div className="flex flex-row gap-2">
                <button onClick={() => deletarTask()} className="bg-teal-700 hover:bg-teal-900 duration-100 text-violet-100 p-2 rounded-md"><FaTrash /></button>
                <button className="bg-teal-700 hover:bg-teal-900 duration-100 text-violet-100 p-2 rounded-md"><MdModeEditOutline /></button>
                <button onClick={() => router.push(`/verTask?id=${idTask}`)} className="bg-teal-700 hover:bg-teal-900 duration-100 text-violet-100 p-2 rounded-md"><FaCaretRight className="text-xl"/></button>
            </div>
        </div>
    )
}
export default CardTask;