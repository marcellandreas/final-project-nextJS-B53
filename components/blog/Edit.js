import React, { useState } from "react";
import { Box, Flex, Button, Textarea, useToast } from "@chakra-ui/react";
import { UseMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";

const EditBlog = ({ payload, setPayload, onSubmit, onClose }) => {
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
          <Box display="flex" gap={2}>
            <Button onClick={onClose} colorScheme="blue" width={"100%"}>
              Ya, Kembali
            </Button>
            <Button onClick={onSubmit} colorScheme="blue" width={"100%"}>
              Ya, Edit
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default EditBlog;
