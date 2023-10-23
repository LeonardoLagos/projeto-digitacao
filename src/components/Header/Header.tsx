import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <div className='mb-16'>
        <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Teste de Digitação
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        </AppBar>
    </div>
  )
}
