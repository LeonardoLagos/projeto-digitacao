import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HistoricoContext } from "../../contexts/historicoContext";
import { UserContext } from "../../contexts/userContext";
import { spanProps } from "../Home";

export interface textCard {
  text: spanProps[];
  hitCount: number;
  errorCount: number;
  patchCount: number;
  totalTime: number;
  wordsPerMinute: number;
  data?: Date;
  data_resumida?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const { user } = useContext(UserContext);
  const { listaHistorico, atualizaHistorico } = useContext(HistoricoContext);

  useEffect(() => {
    if (!localStorage.getItem("id_usuario")) {
      navigate("/");
      return;
    }
  }, [localStorage.getItem("id_usuario")]);

  useEffect(() => {
    atualizaHistorico();
    console.log("att");
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col text-white gap-2">
      {/* <div className="flex mt-4 ml-2 gap-4">
        <Avatar
          src={user.profilePic}
          sx={{ cursor: "pointer", scale: "1.3" }}
        ></Avatar>
        <div className="flex flex-col">
          <p className="text-xl font-medium">{user.name}</p>
          <p className="text-sm font-light text-slate-300">{user.email}</p>
        </div>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="🚀Velocidade" {...a11yProps(0)} />
            <Tab label="🎯Precisão" {...a11yProps(1)} />
            <Tab label="❌Relatório de erros" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {listaHistorico && <TabVelocidade></TabVelocidade>}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {listaHistorico && <TabPrecisao></TabPrecisao>}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TabErros></TabErros>
        </CustomTabPanel>
      </Box> */}
    </div>
  );
}
