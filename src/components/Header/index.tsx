import { AppBar, Avatar, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext, Usuario } from "../../contexts/userContext";
import { apiLogin } from "../../services/apiLogin";

export default function Header() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  
    useEffect(() => {
      verificaToken()
    }, [localStorage.getItem('token')])

  function verificaToken(){
    if (!localStorage.getItem('token')) return

    apiLogin.post('/token', {
      token: localStorage.getItem('token')
    }).then((retorno) => {
      setUser({
        id: retorno.data.id,
        nome: retorno.data.nome,
        email: retorno.data.email,
        fotoPerfil: retorno.data.foto_perfil
      } as Usuario)
    }).catch((retorno) => {
      console.log(retorno)
    })
  }
  
  return (
    <div>
      <AppBar>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Teste de Digitação
          </Typography>
          {localStorage.getItem('token') ?
            <div className="flex items-center gap-4">
              <p>{user.nome}</p>
              <Avatar src={user.fotoPerfil} alt="Foto Perfil." onClick={(e) => navigate('/paginaPerfil')} />
              <Button color="inherit" onClick={(e) => navigate('/logout')}>Logout</Button>
            </div>
            :
            <Button color="inherit" onClick={(e) => navigate('/login')}>Login</Button>
          }
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: '4rem' }}>
        <Outlet />
      </Container>
    </div>
  )
}
