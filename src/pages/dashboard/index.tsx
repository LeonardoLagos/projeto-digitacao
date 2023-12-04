import { Avatar, Box, Tab, Tabs } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/userContext'
import { spanProps } from '../Home'
import { CustomTabPanel, a11yProps } from '../../services/paginacaoMui'
import TabVelocidade from '../../components/tabVelocidade'
import TabPrecisao from '../../components/tabPrecisao'
import TabErros from '../../components/tabErros'
import { HistoricoContext } from '../../contexts/historicoContext'

export interface cardTexto {
  texto: spanProps[],
  numero_acertos: number,
  numero_erros: number,
  tempo_total: number,
  palavras_por_minuto: number,
  data: Date | null
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [value, setValue] = useState(0);
  const { user } = useContext(UserContext)
  const { atualizaHistorico } = useContext(HistoricoContext)
  
  useEffect(() => {
      if (localStorage.getItem('token') == null) {
          navigate('/')
          return
      }

      atualizaHistorico()
  }, [user.id])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='flex flex-col text-white gap-2'>
      <div className='flex mt-4 ml-2 gap-4'>
        <Avatar src={user.fotoPerfil} sx={{ cursor: 'pointer', scale: '1.3' }}></Avatar>
        <div className='flex flex-col'>
          <p className='text-xl font-medium'>{user.nome}</p>
          <p className='text-sm font-light text-slate-300'>{user.email}</p>
        </div>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="🚀Velocidade" {...a11yProps(0)} />
            <Tab label="🎯Precisão" {...a11yProps(1)} />
            <Tab label="❌Relatório de erros" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TabVelocidade></TabVelocidade>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TabPrecisao></TabPrecisao>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TabErros></TabErros>
        </CustomTabPanel>
      </Box>
    </div>
  )
}
