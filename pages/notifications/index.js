import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  useToast,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import { UseQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";

const NotificationsPage = () => {
  const { data: notifications } = UseQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notifications",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  const toast = useToast();

  return (
    <>
      <Navbar />
      <Flex
        width="full"
        minHeight="100vh"
        // align="center"
        justifyContent="center"
        bg="gray.100"
      >
        <Box
          p={10}
          maxW="440px"
          position={"relative"}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          bg="white"
        >
          <Box>
            <Heading>Notifications</Heading>
            {notifications?.data?.length === 0 ? (
              <p>Tidak ada notifikasi</p>
            ) : (
              <Box display="flex" flexDirection="column" gap={2} pt={5}>
                {notifications?.data.map((data) => (
                  <section
                    key={data.id}
                    className=" bg-slate-100 p-2 rounded-lg"
                  >
                    <p>user {data?.user?.name} telah memberikan Like</p>
                  </section>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default NotificationsPage;
