import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Box,
  Heading,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import notificationStore from "../store";

const schema = z.object({
  name: z.string(),
  email: z.string().email("This is not a valid email."),
  password: z
    .string()
    .min(5, { message: "Password must be 5 characters long" }),
  confirmPassword: z
    .string()
    .min(5, { message: "Password must be 5 characters long" }),
});

type RegisterFormData = z.infer<typeof schema>;

export const Register = () => {
  const { notif, setNotif } = notificationStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

  const registerFn = (data: RegisterFormData) => {
    apiClient
      .post("users/register", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("react-node-login", res.data);
        // reset();
        // navigate("/");
        window.location.href = "/";
        setNotif("Successfully Logged-In");
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
        <u>Register</u>
      </Heading>
      <Box padding="4" w="100%">
        <form style={{ textAlign: "center" }}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Name" {...register("name")} />
            {errors.name && (
              <Text mt="5px" fontSize="sm" color="red">
                {errors.name.message}
              </Text>
            )}
          </FormControl>
          <FormControl mt="3">
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
          <FormControl mt="3">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <Text mt="5px" fontSize="sm" color="red">
                {errors.confirmPassword.message}
              </Text>
            )}
          </FormControl>

          {notif != "" ? (
            <Text color="red" mt="5" fontSize="md">
              {notif}
            </Text>
          ) : (
            ""
          )}
          <Button
            colorScheme="teal"
            size="lg"
            mt="5"
            onClick={handleSubmit((data) => {
              registerFn(data);
            })}
          >
            Submit
          </Button>
        </form>
      </Box>
      <Heading as="h6" size="xs" mt="5">
        If you already have an account then
        <Link
          to="/login"
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
          Login
        </Link>
      </Heading>
    </Container>
  );
};
