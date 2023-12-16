import { useNavigate } from "react-router-dom"

export default function TabSemDados() {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col w-full h-60 justify-center items-center'>
            <p className='text-xl font-medium'>Sem dados para exibir</p>
            <button className='bg-green-600 rounded px-8 py-2 m-1 font-medium' onClick={() => navigate('/')}>Faça seu primeiro teste!</button>
        </div>
    )
}
