import React, { useState } from "react";
import { Box, Flex, Button, Textarea, useToast } from "@chakra-ui/react";
import { UseMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import showToast from "@/utils/useToast";

const CreateBlog = () => {
  const { mutationData } = UseMutation();
  const [payload, setPayload] = useState({
    description: "",
  });
  const toast = useToast();

  const handleSubmit = async () => {
    if (!payload.description) {
      toast({
        title: "Error",
        description: "Komentar tidak boleh kosong",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const response = await mutationData({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/post",
      payload,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (response?.success) {
      toast({
        title: "Berhasil Menambahkan Post",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center" bg="gray.100">
      <Box
        p={4}
        maxW="400px"
        w="100%"
        bg="white"
        boxShadow="md"
        borderRadius="md"
      >
        <Box mt={4}>
          <Textarea
            placeholder="Tambahkan komentar Anda"
            mb={2}
            onChange={(e) =>
              setPayload({ ...payload, description: e.target.value })
            }
            value={payload?.description}
          />
          <Button onClick={handleSubmit} colorScheme="blue" width={"100%"}>
            Kirim
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default CreateBlog;
