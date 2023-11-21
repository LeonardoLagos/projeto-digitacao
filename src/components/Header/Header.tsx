import { AppBar, Avatar, Button, Container, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

export default function Header() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
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
          {user ?
            <div className="flex items-center gap-4">
              <p>{user.nome}</p>
              <Avatar src={user.fotoPerfil} alt="Foto Perfil." onClick={(e) => navigate('/paginaPerfil')}/>
              <Button color="inherit" onClick={(e) => navigate('/logout')}>Logout</Button>
            </div>
            :
            <Button color="inherit" onClick={(e) => navigate('/login')}>Login</Button>
          }
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: '3rem' }}>
        <Outlet />
      </Container>
    </div>
  )
}
