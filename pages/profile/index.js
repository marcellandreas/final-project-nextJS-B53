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
import CreateBlog from "@/components/blog/create";
import BlogPost from "@/components/blog";
import { UseQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { useUser } from "@/hooks/useContext";

const ProfilePage = () => {
  const { userData } = useUser();

  const { data: postingMe } = UseQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=me",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  const toast = useToast();

  const handleSubmit = () => {
    // Simpan logika untuk menyimpan data profil
    toast({
      title: "Profil berhasil diperbarui",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

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
          maxW="400px"
          // maxWidth="500px"
          p={5}
          position={"relative"}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          bg="white"
        >
          <Box bg="gray" p={2} borderRadius={4} position="sticky">
            <Box textAlign="center">
              <Avatar size="xl" name={userData?.name} />
              <Heading size="lg" mt={4}>
                {userData?.name}
              </Heading>
            </Box>
            <Box
              mt={2}
              display={"flex"}
              flexWrap={"wrap"}
              gap={4}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              <Box>
                <Flex direction={"column"} alignItems={"center"}>
                  <p className=" font-bold">Email</p>
                  <p>{userData?.email}</p>
                </Flex>
                <Flex direction={"column"} alignItems={"center"}>
                  <p className=" font-bold">Hobby</p>
                  <p>{userData?.hobby || "-"}</p>
                </Flex>
              </Box>
              <Box>
                <Flex direction={"column"} alignItems={"center"}>
                  <p className=" font-bold">Date of birth</p>
                  <p>{userData?.dob || "-"}</p>
                </Flex>
                <Flex direction={"column"} alignItems={"center"}>
                  <p className=" font-bold">Phone</p>
                  <p>{userData?.phone || "-"}</p>
                </Flex>
              </Box>
            </Box>
          </Box>
          <Box pt={5}>
            <CreateBlog />
          </Box>
          <Box pt={5} gap={2} display={"flex"} flexDirection="column">
            {postingMe?.data.map((data) => (
              <BlogPost data={data} />
            ))}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ProfilePage;
