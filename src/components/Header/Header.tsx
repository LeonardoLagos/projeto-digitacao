import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function Header() {
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
          <Button color="inherit" onClick={(e) => navigate('/login')}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{marginTop: '3rem'}}>
        <Outlet />
      </Container>
    </div>
  )
}
