import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Box,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import notificationStore from "../store";
import apiClient from "../services/api-client";

const schema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z
    .string()
    .min(5, { message: "Password must be 5 characters long" }),
});
type LoginFormData = z.infer<typeof schema>;

export const Login = () => {
  const { notif, setNotif } = notificationStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const loginFn = (data: LoginFormData) => {
    // console.log(data);
    apiClient
      .post("auth/login", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("react-node-login", res.data);
        // reset();
        // navigate("/");
        window.location.href = "/";
        setNotif("You are successfully logged-in");
      })
      .catch((err) => {
        // console.log(err);
        // console.log(err.code);
        // console.log(err.response.data);
        setNotif(err.response.data);
      });
  };

  return (
    <Container maxW="2xl" centerContent>
      <Heading
        // border="1px"
        as="h1"
        // bg="tomato"
        mt="10"
        pt="3"
        pb="5"
        pl="6"
        pr="6"
        rounded="md"
      >
        <u>Login</u>
      </Heading>
      {notif != "" ? (
        <Text color="red" mt="5" fontSize="md">
          {notif}
        </Text>
      ) : (
        ""
      )}
      <Box padding="4" w="100%">
        <form style={{ textAlign: "center" }}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <Text mt="5px" fontSize="sm" color="red">
                {errors.email.message}
              </Text>
            )}
          </FormControl>
          <FormControl mt="3">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <Text mt="5px" fontSize="sm" color="red">
                {errors.password.message}
              </Text>
            )}
          </FormControl>
          <Button
            colorScheme="teal"
            size="lg"
            mt="5"
            onClick={handleSubmit((data) => {
              loginFn(data);
            })}
          >
            Submit
          </Button>
        </form>
      </Box>

      <Heading as="h6" size="xs" mt="5">
        If you don't have an account then
        <Link
          to="/register"
          style={{
            marginLeft: "5px",
            color: "black",
            background: "white",
            paddingTop: "2px",
            paddingBottom: "5px",
            paddingLeft: "7px",
            paddingRight: "7px",
            borderRadius: "3px",
          }}
        >
          Register
        </Link>
      </Heading>
    </Container>
  );
};
