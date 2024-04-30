import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const NavigationBar = React.forwardRef(function NavigationBar(_props, ref) {
  return (
    <AppBar position="static" ref={ref}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Apartamento Parquelândia
        </Typography>
        <Typography variant="h6" component="div">
          Sobre
        </Typography>
        {/* Adicione mais itens de navegação conforme necessário */}
      </Toolbar>
    </AppBar>
  );
});

export default NavigationBar;
