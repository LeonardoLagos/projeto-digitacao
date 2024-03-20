import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalInfoCompleto from "../../components/modalInfoCompleto";
import { HistoricoContext } from "../../contexts/historicoContext";
import { UserContext } from "../../contexts/userContext";
import { api } from "../../services/api";
import { textCard } from "../dashboard";

export interface spanProps {
  className: string;
  children: string;
}

interface dadosCaractere {
  caractere: string;
  numero_acertos: number;
  numero_erros: number;
}

interface TeclasDigitadas {
  id_usuario: string;
  caractere_correto: string;
  caractere_digitado: string;
}

export default function Home() {
  const { user } = useContext(UserContext);
  const { atualizaHistorico } = useContext(HistoricoContext);

  const [contagem, setContagem] = useState(0);
  const [listaLetras, setListaLetras] = useState<spanProps[]>([]);
  const refDivPalavras = useRef<HTMLDivElement>(null);
  const refInputDigitacao = useRef<HTMLInputElement>(null);
  const [cronometroAtivo, setCronometroAtivo] = useState(false);
  const [cronometro, setCronometro] = useState(60);
  const [textosFinalizados, setTextosFinalizados] = useState<textCard[]>(
    [] as textCard[]
  );
  const [textoCardAtual, setTextoCardAtual] = useState<textCard>();
  const [historicoTeclasDigitadas, setHistoricoTeclasDigitadas] = useState<
    TeclasDigitadas[]
  >([] as TeclasDigitadas[]);

  const navigate = useNavigate();

  async function preencheTexto() {
    setCronometroAtivo(false);
    const frase = await buscaTexto();
    //listaPalavras[Math.floor(Math.random() * listaPalavras.length)]
    if (frase === undefined) return;

    setListaLetras([]);
    for (const letra of frase) {
      setListaLetras((prev) => [...prev, { className: "", children: letra }]);
    }
    refInputDigitacao.current?.focus();
  }

  async function buscaTexto(): Promise<string> {
    return await api
      .get("/", {
        timeout: 3000,
        params: {
          quantidade: "10",
        },
      })
      .then((validation) => {
        return validation.data;
        // window.location.href = 'http://cerejeiras.wcogeo.com.br:81'//navigate("/dashboard", { replace: true })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    buscaTexto();
    preencheTexto();
    document.body.addEventListener("click", () =>
      refInputDigitacao.current?.focus()
    );
    if (!localStorage.getItem("id_usuario")) return;

    console.log("att");
    atualizaHistorico();
  }, []);

  useEffect(() => {}, [listaLetras]);

  useEffect(() => {
    if (contagem <= 0) return;
    if (contagem === listaLetras.length) {
      finalizaDigitacao();
    } else {
      setCronometroAtivo(true);
    }
  }, [contagem]);

  useEffect(() => {
    if (!cronometroAtivo) return;
    const interval = setInterval(() => {
      setCronometro((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cronometroAtivo]);

  useEffect(() => {
    if (cronometro === 0) {
      finalizaDigitacao();
      setCronometroAtivo(false);
      return;
    }
  }, [cronometro]);

  function handleApagar(e: React.KeyboardEvent<HTMLInputElement>) {
    const teclaPresionada = e.key;
    if (teclaPresionada === "Backspace") {
      if (contagem === 0) return;
      const caractereAnterior = listaLetras[contagem - 1];

      caractereAnterior.className = caractereAnterior.className.replace(
        "bg-lime-600",
        ""
      );
      caractereAnterior.className = caractereAnterior.className.replace(
        "bg-red-600",
        ""
      );
      caractereAnterior.className = caractereAnterior.className.replace(
        "bg-amber-500",
        ""
      );
      setContagem((prev) => prev - 1);
      return;
    }
  }

  function handleDigitacao(e: React.ChangeEvent<HTMLInputElement>) {
    const caractereDigitado = e.target.value;

    const letraCorreta = listaLetras[contagem];
    if (contagem === listaLetras.length) {
      return;
    }

    if (localStorage.getItem("id_usuario")) {
      setHistoricoTeclasDigitadas((prev) => {
        prev.push({
          id_usuario: localStorage.getItem("id_usuario"),
          caractere_correto: letraCorreta.children,
          caractere_digitado: caractereDigitado,
        } as TeclasDigitadas);
        return prev;
      });
    }

    my_if: if (caractereDigitado === letraCorreta.children) {
      if (letraCorreta.className.includes("erro")) {
        letraCorreta.className += " bg-amber-500";
        break my_if;
      }

      letraCorreta.className += " bg-lime-600";
    } else {
      letraCorreta.className += " bg-red-600";
      if (letraCorreta.className.includes("erro")) break my_if;

      letraCorreta.className += " erro";
    }
    setContagem((prev) => prev + 1);
  }

  function handleAtualizaTexto() {
    preencheTexto();
    setHistoricoTeclasDigitadas([] as TeclasDigitadas[]);
    switchDigitacao(true);
    setCronometro(60);
    setContagem(0);
  }

  function segundosPraMinutos(segundos: number) {
    var min = Math.floor(segundos / 60);
    var sec = Math.floor(segundos % 60);

    var mDisplay = min > 10 ? min : "0" + min;
    var sDisplay = sec >= 10 ? sec : "0" + sec;
    return mDisplay + ":" + sDisplay;
  }

  function switchDigitacao(bool: boolean) {
    if (refInputDigitacao.current) {
      refInputDigitacao.current.disabled = !bool;
    }
  }

  function finalizaDigitacao() {
    switchDigitacao(false);
    setCronometroAtivo(false);
    let quantidadeAcertos = 0;
    let quantidadeCorrecoes = 0;
    let quantidadeErros = 0;

    listaLetras.forEach((letra) => {
      if (letra.className.includes("bg-lime-600")) {
        quantidadeAcertos++;
      }
      if (letra.className.includes("bg-red-600")) {
        quantidadeErros++;
      }
      if (letra.className.includes("bg-amber-500")) {
        quantidadeCorrecoes++;
      }
    });

    setTextosFinalizados((prev) => {
      prev.push({
        text: listaLetras,
        hitCount: quantidadeAcertos,
        errorCount: quantidadeErros,
        patchCount: quantidadeCorrecoes,
        totalTime: cronometro,
        wordsPerMinute: (
          (contagem / 5) *
          (cronometro == 0 ? 1 : 60 / cronometro)
        )
          .toFixed(2)
          .replace(".00", "") as unknown as number,
      } as textCard);
      return prev;
    });

    if (!localStorage.getItem("id_usuario")) return;

    api
      .post("/historico/teclas", {
        lista_teclas: historicoTeclasDigitadas,
      })
      .then((retorno) => {
        // console.log(retorno)
      })
      .catch((retorno) => {
        console.log(retorno);
      });

    api
      .post("/historico/textos", {
        id_usuario: localStorage.getItem("id_usuario"),
        texto: JSON.stringify(listaLetras),
        numero_acertos: quantidadeAcertos,
        numero_erros: quantidadeErros,
        numero_correcoes: quantidadeCorrecoes,
        palavras_por_minuto: (
          (contagem / 5) *
          (cronometro == 0 ? 1 : 60 / cronometro)
        )
          .toFixed(2)
          .replace(".00", ""),
        tempo_total: 60 - cronometro,
      })
      .then((retorno) => {
        // console.log(retorno)
      })
      .catch((retorno) => {
        console.log(retorno);
      });
  }

  return (
    <div className="flex flex-col text-slate-50" style={{ height: "93vh" }}>
      <div className="flex gap-1">
        {/* <p>Linguagem:</p>
        <select className="outline outline-1 rounded px-1 text-sm">
          <option value="pt-br">🏳Português</option>
          <option value="en-us">🏳Inglês</option>
        </select> */}
      </div>
      <div
        id="divPalavras"
        className="w-full h-56 outline outline-1 rounded mt-4 mb-1 p-2 text-xl font-medium overflow-auto text-justify"
        ref={refDivPalavras}
        onClick={() => refInputDigitacao.current?.focus()}
      >
        {listaLetras.map((letra, index) => {
          if (letra.children === " ") {
            return (
              <span
                className={letra.className + " inline-block text-center"}
                style={{ minWidth: "4px", height: "27px" }}
                key={index}
              >
                &nbsp;
              </span>
            );
          }
          return (
            <span className={letra.className} key={index}>
              {letra.children}
            </span>
          );
        })}
      </div>
      <div className="flex items-center justify-end w-full mt-1 gap-1">
        <div className="justify-center">
          <p className="bg-slate-700 rounded font-medium px-2">
            {segundosPraMinutos(cronometro)}
          </p>
        </div>
        <button
          className="w-1/4 bg-sky-600 rounded"
          onClick={() => {
            handleAtualizaTexto();
          }}
        >
          {/* <RefreshIcon></RefreshIcon> */}
        </button>
      </div>
      <input
        autoFocus
        tabIndex={0}
        type="text"
        ref={refInputDigitacao}
        className="w-0 h-0"
        onChange={(e) => {
          handleDigitacao(e);
          e.target.value = "";
        }}
        onKeyUp={(e) => handleApagar(e)}
      />
      <div className="flex">
        {textosFinalizados.length > 0 && (
          <div className="flex flex-col bg-slate-800  w-1/4 h-96 rounded mt-2 overflow-y-auto">
            {textosFinalizados.map((texto, index) => {
              let multiplicadorTempo = 1;
              if (texto.totalTime !== 0) {
                multiplicadorTempo = 60 / texto.totalTime;
              }
              const sum = texto.hitCount + texto.errorCount + texto.patchCount;
              const porcentagemAcertos =
                sum == 0 ? 0 : (texto.hitCount / sum) * 100;
              const porcentagemCorrecoes =
                sum == 0 ? 0 : (texto.patchCount / sum) * 100;

              return (
                <div
                  className="text-white whitespace-nowrap bg-slate-600 rounded  px-4  py-2 m-1 text-sm font-medium"
                  key={index}
                  onClick={() => {
                    setTextoCardAtual(texto);
                  }}
                >
                  <div className="flex items-center ">
                    <p className="text-lime-500">{texto.hitCount}</p>/
                    <p className="text-red-400">{texto.errorCount}</p>/
                    <p className="text-amber-500">{texto.patchCount}</p>
                    <div className="flex bg-red-500 h-2 w-full rounded overflow-hidden mx-2">
                      <div
                        className="bg-lime-500"
                        style={{
                          width: `${porcentagemAcertos}%`,
                          height: "8px",
                        }}
                      ></div>
                      <div
                        className="bg-amber-500"
                        style={{
                          width: `${porcentagemCorrecoes}%`,
                          height: "8px",
                        }}
                      ></div>
                    </div>
                    <p className="text-lime-500">
                      {porcentagemAcertos.toFixed(2).replace(".00", "")}%
                    </p>
                  </div>
                  {/* <p>tempo: {60 - texto.tempoRestante}s</p> */}
                  <p>Velocidade: {texto.wordsPerMinute} ppm</p>
                </div>
              );
            })}
          </div>
        )}
        {textoCardAtual && (
          <ModalInfoCompleto informacoesModal={textoCardAtual} />
        )}
      </div>
    </div>
  );
}
