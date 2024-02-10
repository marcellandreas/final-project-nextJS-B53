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
import Cookies from "js-cookie";
import AuthComponent from "@/components/Auth";
import { CustomForm, CustomInput } from "@/components/Form";

const LoginPage = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const { mutationData } = UseMutation();

  const handleSubmit = async () => {
    const response = await mutationData({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/login",
      payload,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });

    if (!response?.success) {
      toast({
        title: "Login Gagal",
        description: "Email dan password salah",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      Cookies.set("user_token", response?.data?.token, {
        expires: new Date(response?.data?.expires_at),
        path: "/",
      });
      router.push("/");
    }
  };

  return (
    <AuthComponent>
      <Box textAlign="center">
        <Heading>Login</Heading>
      </Box>
      <Box my={4} textAlign="left">
        <Stack>
          {/* <CustomInput
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
            value={payload?.email}
          /> */}

          <CustomForm
            type="email"
            label="Email address"
            placeholder="Enter your email"
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
            value={payload?.email}
          />
          <CustomForm
            type="password"
            label="Password"
            placeholder="Enter your password"
            onChange={(e) =>
              setPayload({ ...payload, password: e.target.value })
            }
            value={payload?.password}
          />
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
              Sign in
            </Button>
          </FormControl>
        </Stack>
      </Box>
      <p>
        Belum Punya Akun?{" "}
        <a
          style={{ textDecoration: "underline", color: "blue" }}
          href="/register"
        >
          Buat Akun
        </a>
      </p>
    </AuthComponent>
  );
};

export default LoginPage;
