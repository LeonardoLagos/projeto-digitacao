import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface iInputProps {
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  register?: UseFormRegisterReturn<any>;
  error?: string;
  rules?: RegisterOptions;
}

//Componente que cria todos os Inputs do projeto,
//se quer um input com Zod, use as propriedades (register, error e rules),
//se quer apenas um input convencional use as propriedades (value e setValue)
const Input = ({
  type,
  placeholder,
  name,
  value,
  setValue,
  register,
  error,
}: iInputProps) => {
  const imputStyle =
    "focus:outline-none w-full self-center py-2 rounded-[8px] px-2 border-primary border-2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-blackPrimary/15";

  return (
    <>
      {register ? (
        <div
          className={`flex flex-col ${
            error !== undefined ? "" : "mb-6"
          } w-full`}
        >
          <p className="text-primary">{name}</p>
          <input
            className={imputStyle}
            id={name}
            type={type}
            placeholder={placeholder}
            {...register}
          />
          {error && <p className="text-danger">{error}</p>}
        </div>
      ) : (
        <div className={`flex flex-col mb-2 w-full `}>
          <p className="text-primary">{name}</p>
          <input
            className={imputStyle}
            id={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue!(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

export default Input;
