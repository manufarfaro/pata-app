import Head from "next/head";
import { ReactNode, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle, ArrowBackIosNew, Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const LogoContainer = styled(Box)`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  img {
    max-height: 64px;
  }
`;

type AppLayoutProps = {
  children: ReactNode;
  title?: string;
};

export default function AppLayout({ children, title }: AppLayoutProps) {
  const { data: session } = useSession();
  const titleText = title ? `Pata - ${title}` : "Pata";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Head>
        <title>{titleText}</title>
        <meta name="description" content="Pata" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ height: "100vh" }}>
        <AppBar position="fixed">
          <Toolbar>
            <LogoContainer sx={{ width: "25px", height: "25px" }}>
              <Image
                alt="pata logo"
                src={"/images/pata-logo.svg"}
                layout="fill"
              />
            </LogoContainer>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {session?.user?.image ? (
                  <Avatar alt={session.user.name!} src={session.user.image} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => signOut()}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Salir</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Container>
          <main>{children}</main>
        </Container>
      </Box>
    </>
  );
}
