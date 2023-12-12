import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@mui/material'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { ToastContext } from '../../contexts/ToastContext'
import { apiLogin } from '../../services/apiLogin'


const schema = z.object({
    email: z.string().email("* Insira um e-mail válido").min(1, '* Campo obrigatório'),
    nome: z.string().min(1, '* Campo obrigatório'),
    senha: z.string().min(8, "* Senhas contém no mínimo 8 caractéres.").max(100),
    confirmarSenha: z.string().min(8, "* Senhas contém no mínimo 8 caractéres.").max(100)
  }).superRefine(({ confirmarSenha, senha}, ctx) => {
    if (confirmarSenha !== senha) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '* Senhas não conferem',
        path: ['confirmarSenha']
      })
    }
  })
  
  type FormData = z.infer<typeof schema>
  
export default function Cadastro() {
    const navigate = useNavigate()
    const { toast } = useContext(ToastContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(schema)
    })
  
    function onSubmit(data: FormData) {
      console.log(data.email,data.nome, data.senha)

      apiLogin.post('/usuarios', {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        foto_perfil: '',
        google_id: ''
      }).then((retorno) => {
        toast.success('Cadastro realizado com sucesso!')
        navigate('/login')

      }).catch((retorno) => {
        console.log(retorno)
      })
    }
  
    return (
      <div className="flex w-screen h-screen">
        <div className="w-4/6 h-full">
          <img className="h-full object-cover" src="src/assets/bg-login.jpeg" alt="" />
        </div>
        <form
          className="flex flex-col w-2/6 h-full text-slate-50 justify-center px-12"
          onSubmit={handleSubmit(onSubmit)}>
          <TextField label="nome" helperText={errors.nome?.message} variant="standard" type="text" margin="none" {...register("nome")} />
          <TextField label="e-mail" helperText={errors.email?.message} variant="standard" type="email" margin="none" {...register("email")} />
          <TextField label="senha" helperText={errors.senha?.message} variant="standard" type="password" margin="none" {...register("senha")} />
          <TextField label="confirmarSenha" helperText={errors.confirmarSenha?.message} variant="standard" type="password" margin="none" {...register("confirmarSenha")} />
          <Button type="submit" sx={{ marginTop: '8px', marginBottom: '8px' }}>Cadastrar</Button>
          <div className="flex flex-col items-center text-sm">
            <p>Possui conta? <a href="/login" className="text-center text-yellow-300">login</a></p>
          </div>
        </form>
      </div>
    )
}
