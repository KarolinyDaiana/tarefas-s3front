'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { FaTrash } from "react-icons/fa";

interface ITask {
    idFile: number
}

const CardImage = ({ idFile }: ITask) => {
    const id = idFile
    const [url, setUrl] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8552/file/${id}`).then(res => {
            return res.text();
        }).then(data => {
            console.log(data)
            setUrl(data)
        });
    }, [])

    return (
        <div className="flex flex-col items-center p-2">
            <img className="h-24" src={url} />
            <div className="bg-[#fea345] p-2 w-full justify-center flex">
                <FaTrash color="#f53421" size={20} />
            </div>
        </div>
    )
}
export default CardImage;