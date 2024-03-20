import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../../components/button/button";
import Input from "../../components/input/Input";
import { User, UserContext } from "../../contexts/userContext";
import { apiLogin } from "../../services/apiLogin";

const schema = z.object({
  email: z
    .string()
    .email("* Insira um e-mail válido")
    .min(1, "* Campo obrigatório"),
  senha: z.string().min(8, "* Senhas contém no mínimo 8 caractéres.").max(100),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    apiLogin
      .post("/login", {
        email: data.email,
        senha: data.senha,
        googleId: "",
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setUser({
          id: response.data.id,
          name: response.data.nome,
          email: response.data.email,
          profilePic: response.data.foto_perfil,
        } as User);
        navigate("/");
        toast.success("Bem vindo!");
      })
      .catch((response) => {
        if (response.response) {
          toast.error(response.response.data.message);
        } else {
          toast.error("Erro ao conectar com o servidor!");
        }
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
          type="email"
          placeholder="Digite seu email..."
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          placeholder="Digite sua senha..."
          error={errors.senha?.message}
          type="password"
          {...register("senha")}
        />
        <Button text="Entrar"></Button>
        <div className="flex flex-col items-center text-sm">
          <a href="#" className="text-center text-yellow-300">
            Esqueceu sua senha?
          </a>
          <p>
            Não possui conta?{" "}
            <a href="/cadastro" className="text-center text-yellow-300">
              Cadastrar-se
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
