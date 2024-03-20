import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../../components/button/button";
import Input from "../../components/input/Input";
import { ToastContext } from "../../contexts/ToastContext";
import { apiLogin } from "../../services/apiLogin";

const schema = z
  .object({
    email: z
      .string()
      .email("* Insira um e-mail válido")
      .min(1, "* Campo obrigatório"),
    nome: z.string().min(1, "* Campo obrigatório"),
    senha: z
      .string()
      .min(8, "* Senhas contém no mínimo 8 caractéres.")
      .max(100),
    confirmarSenha: z
      .string()
      .min(8, "* Senhas contém no mínimo 8 caractéres.")
      .max(100),
  })
  .superRefine(({ confirmarSenha, senha }, ctx) => {
    if (confirmarSenha !== senha) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "* Senhas não conferem",
        path: ["confirmarSenha"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

export default function Cadastro() {
  const navigate = useNavigate();
  const { toast } = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    apiLogin
      .post("/usuarios", {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        foto_perfil: "",
        google_id: "",
      })
      .then((retorno) => {
        toast.success("Cadastro realizado com sucesso!");
        navigate("/login");
      })
      .catch((retorno) => {
        console.log(retorno);
      });
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="w-4/6 h-full">
        <img
          className="h-full object-cover"
          src="src/assets/bg-login.jpeg"
          alt=""
        />
      </div>
      <form
        className="flex flex-col w-2/6 h-full text-slate-50 justify-center px-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          name="nome"
          placeholder=""
          error={errors.nome?.message}
          type="text"
          register={register("nome")}
        />
        <Input
          name="e-mail"
          placeholder=""
          error={errors.email?.message}
          type="email"
          register={register("email")}
        />
        <Input
          name="senha"
          placeholder=""
          error={errors.senha?.message}
          type="password"
          register={register("senha")}
        />
        <Input
          name="confirmar senha"
          placeholder=""
          error={errors.confirmarSenha?.message}
          type="password"
          register={register("confirmarSenha")}
        />
        <Button text="Cadastrar" />
        <div className="flex flex-col items-center text-sm">
          <p>
            Possui conta?{" "}
            <a href="/login" className="text-center text-yellow-300">
              login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
