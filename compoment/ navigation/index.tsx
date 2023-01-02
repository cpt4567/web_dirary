import { Divider, Drawer, IconButton, List, Toolbar } from "@mui/material";
import { useState } from "react";
import { mainListItems } from "../dashboard/listItems";

interface Props {open:boolean,onClick:()=> void }


export default function Navigation({open,onClick}:Props) {

    return (
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={onClick}>
             </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />

          </List>
        </Drawer>
    )
}