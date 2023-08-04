import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Image,
  Spacer,
} from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import { ColorModeSwitch } from "./ColorModeSwitch";
import { Link, useNavigate } from "react-router-dom";
import notificationStore from "../store";

export const loginKey = localStorage.getItem("react-node-login");

export const NavBar = () => {
  const { notif, setNotif } = notificationStore();

  const navigate = useNavigate();

  const logoutFn = () => {
    localStorage.setItem("react-node-login", "");
    setNotif("");
    // navigate("/login");
    window.location.href = "/login";
  };
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" padding="10px">
      <Box>
        <Link to="/">
          <Image src={logo} boxSize="60px"></Image>
        </Link>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        {loginKey == "" || loginKey == undefined || loginKey == null ? (
          <>
            <Link to="/register">
              <Button colorScheme="teal">Sign Up</Button>
            </Link>
            <Link to="/login">
              <Button colorScheme="teal">Log in</Button>
            </Link>
          </>
        ) : (
          <>
            <Button colorScheme="teal" onClick={() => logoutFn()}>
              Logout
            </Button>
          </>
        )}
        <ColorModeSwitch />
      </ButtonGroup>
    </Flex>
  );
};
