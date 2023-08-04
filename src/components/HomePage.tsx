import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import notificationStore from "../store";

export const HomePage = () => {
  const { notif } = notificationStore();

  useEffect(() => {
    apiClient
      .get("/users/register")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  return (
    <>
      <Text textAlign="center" fontSize="9xl">
        Welcome
      </Text>
      {notif != "" ? (
        <Text textAlign="center" color="red" mt="5" fontSize="md">
          {notif}
        </Text>
      ) : (
        ""
      )}
    </>
  );
};
