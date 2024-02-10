import {
  Box,
  Flex,
  Spacer,
  Heading,
  Button,
  useDisclosure,
  IconButton,
  VStack,
  HStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { UseMutation } from "@/hooks/useMutation";
import { UseQueries } from "@/hooks/useQueries";
import ProfileUser from "./profile";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);

  const { mutationData } = UseMutation();
  const router = useRouter();

  const { data: dataNotif } = UseQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notifications",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  const handleLogout = async () => {
    const response = await mutationData({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });

    if (!response?.success) {
      toast({
        title: "gagal login",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      Cookies.remove("user_token");
      router.push("/login");
    }
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify={{ base: "space-between", md: "center" }}
      wrap="wrap"
      padding={3}
      bg={useColorModeValue("gray.300", "gray.800")}
      color={useColorModeValue("gray.800", "gray.100")}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          <Link href="/">
            Sosial<span className=" text-slate-600">Sanber</span>
          </Link>
        </Heading>
      </Flex>

      <Spacer />

      <Box display={{ base: "block", md: "none" }}>
        <ProfileUser dataNotif={dataNotif} handleLogout={handleLogout} />
      </Box>

      {isMobile ? (
        <IconButton
          icon={<CloseIcon />}
          aria-label="Close Menu"
          display={{ base: "block", md: "none" }}
          onClick={() => {
            onClose();
            setIsMobile(false);
          }}
        />
      ) : (
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          display={{ base: "block", md: "none" }}
          onClick={() => {
            onOpen();
            setIsMobile(true);
          }}
        />
      )}

      <Box
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        justifyContent={"flex-end"}
        flexGrow={1}
      >
        {isMobile ? (
          <VStack
            spacing={4}
            align="stretch"
            as="ul"
            listStyleType="none"
            pt={{ base: 4, md: 0 }}
          >
            <Button variant="ghost">
              <Link href="/">Home</Link>
            </Button>
          </VStack>
        ) : (
          <HStack
            spacing={4}
            justifyContent={"flex-end"}
            align="center"
            as="ul"
            listStyleType="none"
            pt={{ base: 4, md: 0 }}
          >
            <Button variant="ghost">
              <Link href="/">Home</Link>
            </Button>

            <ProfileUser dataNotif={dataNotif} handleLogout={handleLogout} />
          </HStack>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
