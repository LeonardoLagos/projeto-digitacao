import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'


const schema = z.object({
    email: z.string().email("Insira um e-mail válido").min(1),
    nome: z.string().min(1),
    senha: z.string().min(8, "Senhas contém no mínimo 8 caractéres.").max(100),
    confirmarSenha: z.string().min(8, "Senhas contém no mínimo 8 caractéres.").max(100)
  })
  
  type FormData = z.infer<typeof schema>
  
export default function Cadastro() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(schema)
    })
  
    function onSubmit(data: FormData) {
      console.log(data.email, data.senha)
    }
  
    return (
      <div className="flex w-screen h-screen">
        <div className="w-4/6 h-full">
          <img className="h-full object-cover" src="src/assets/bg-login.jpeg" alt="" />
        </div>
        <form
          className="flex flex-col w-2/6 h-full text-slate-50 justify-center px-12"
          onSubmit={handleSubmit(onSubmit)}>
          <TextField label="nome" variant="standard" type="text" margin="none" {...register("nome")} />
          <div className="h-6 w-full">
            {errors.nome?.message && <p className=" text-red-500">{errors.nome.message}</p>}
          </div>
          <TextField label="e-mail" variant="standard" type="email" margin="none" {...register("email")} />
          <div className="h-6 w-full">
            {errors.email?.message && <p className=" text-red-500">{errors.email.message}</p>}
          </div>
          <TextField label="senha" variant="standard" type="password" margin="none" {...register("senha")} />
          <div className="h-6 w-full">
            {errors.senha?.message && <p className=" text-red-500">{errors.senha.message}</p>}
          </div>
          <TextField label="confirmarSenha" variant="standard" type="password" margin="none" {...register("confirmarSenha")} />
          <div className="h-6 w-full">
            {errors.confirmarSenha?.message && <p className="text-red-500">{errors.confirmarSenha.message}</p>}
          </div>
          <Button type="submit" sx={{ marginTop: '8px', marginBottom: '8px' }}>Entrar</Button>
          <div className="flex flex-col items-center text-sm">
            <a href="#" className="text-center text-yellow-300">Esqueceu sua senha?</a>
            <p>Não possui conta? <a href="/cadastro" className="text-center text-yellow-300">Cadastrar-se</a></p>
          </div>
        </form>
      </div>
    )
}
