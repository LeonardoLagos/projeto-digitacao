import { Button, TextField } from "@mui/material";

export default function Login() {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-4/6 h-full">
        <img className="h-full object-cover" src="src/assets/bg-login.jpeg" alt="" />
      </div>
      <div className="flex flex-col w-2/6 h-full text-slate-50 justify-center px-12">
        <TextField label="e-mail" variant="standard" margin="dense" />
        <TextField label="senha" variant="standard" margin="dense" />
        <Button>Entrar</Button>
      </div>
    </div>
  )
}
