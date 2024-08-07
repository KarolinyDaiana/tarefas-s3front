'use client'
import { useState } from "react";

export default function AdicionarTask() {

    const [imagem, setImagem] = useState()
    const [titulo, setTiulo] = useState()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImagem(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImagem(null);
        }
    };

    fetch('http://localhost:8552/task/9').then(res => {
        return res.json();
    }).then(data => {
        console.log(data)
    });
    // console.log(fetch('http://localhost:8552/task/5'))
    
    const enviarTask = () => {
        console.log(imagem)
    }

    return (
        <main className="w-full flex flex-col items-center justify-center h-full gap-4">
            <form className="flex flex-col gap-4" action="http://localhost:8552/file/9" method="post" encType="multipart/form-data">
                <input required 
                    value={titulo} 
                    type="text" placeholder="Titulo da tarefa" 
                    className="p-2 w-full rounded-md border-2 border-teal-900"
                />
                <input required
                    name="file" 
                    type="file" 
                    placeholder="Selecione uma imagem" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                />

                {imagem && <img src={imagem} className="rounded-md border-teal-900 border-2 self-center size-36 bg-cover" alt="Selected" style={{ marginTop: '20px', maxWidth: '100%' }} />}
                
                <button onClick={() => enviarTask()} type="submit" className="bg-teal-700 text-violet-100 p-2 rounded-md">Enviar</button>
            </form>
        </main>
    )
}