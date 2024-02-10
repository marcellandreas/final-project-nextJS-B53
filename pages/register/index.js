import { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { UseMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import AuthComponent from "@/components/Auth";

const RegisterPage = () => {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const { mutationData } = UseMutation();

  const handleSubmit = async () => {
    const response = await mutationData({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/register",
      payload,
    });

    if (!response?.success) {
      toast({
        title: "Gagal Membuat Akun, Harap Periksa kembali",
        description: `${response?.data?.email || response?.message}`,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      router.push("/login");
      toast({
        title: "Berhasil Membuat Akun.",
        description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <AuthComponent>
      <Box textAlign="center">
        <Heading>Register</Heading>
      </Box>
      <Box my={4} textAlign="left">
        <Stack>
          <FormControl>
            <FormLabel>Name User</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setPayload({ ...payload, name: e.target.value })}
              value={payload?.name}
              bg="whiteAlpha.800"
              border="none"
              _focus={{ border: "none", bg: "whiteAlpha.900" }}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={(e) =>
                setPayload({ ...payload, email: e.target.value })
              }
              value={payload?.email}
              bg="whiteAlpha.800"
              border="none"
              _focus={{ border: "none", bg: "whiteAlpha.900" }}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={(e) =>
                  setPayload({ ...payload, password: e.target.value })
                }
                value={payload?.password}
                bg="whiteAlpha.800"
                border="none"
                _focus={{ border: "none", bg: "whiteAlpha.900" }}
              />
              <InputRightElement>
                <Button
                  variant="ghost"
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <Button
              colorScheme="teal"
              variant="solid"
              width="full"
              mt={4}
              type="submit"
              _hover={{ bg: "teal.600" }}
              onClick={() => handleSubmit()}
            >
              Sign Up
            </Button>
          </FormControl>
        </Stack>
      </Box>
      <p>
        Sudah Punya Akun?{" "}
        <a style={{ textDecoration: "underline", color: "blue" }} href="/login">
          Masuk Akun
        </a>
      </p>
    </AuthComponent>
  );
};

export default RegisterPage;
