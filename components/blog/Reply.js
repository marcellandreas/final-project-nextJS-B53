import { useUser } from "@/hooks/useContext";
import { UseMutation } from "@/hooks/useMutation";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Reply = ({ id, onClose, userId }) => {
  const { userData } = useUser();

  const toast = useToast();
  const [dataReply, setDataReply] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { mutationData } = UseMutation();

  const [idReply, setIdReply] = useState(null);
  useEffect(() => {
    if (id !== null) {
      async function fecthData() {
        const res = await fetch(
          `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          }
        );
        const Blog = await res.json();
        setDataReply(Blog?.data);
        setIsLoading(false);
      }

      fecthData();
    }
  }, [id, isLoading]);

  const [payload, setPayload] = useState({
    description: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleSubmitReply = async () => {
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
      url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
      payload,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (response?.success) {
      setIsLoading(true);
      toast({
        title: "Berhasil Menambahkan Post",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleDelete = async () => {
    const response = await mutationData({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/delete/${idReply}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });

    if (response?.success) {
      setIsLoading(true);
      handleCloseDeleteModal();
      toast({
        title: "Berhasil Menghapus komentar",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <ModalContent>
      <ModalHeader>Reply</ModalHeader>
      <ModalBody>
        <Textarea
          placeholder="Tambahkan komentar Anda"
          mb={2}
          onChange={(e) =>
            setPayload({ ...payload, description: e.target.value })
          }
          value={payload?.description}
        />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
        <Button colorScheme="blue" onClick={handleSubmitReply}>
          Kirim
        </Button>
      </ModalFooter>
      <ModalBody>
        <Box mt={4}>
          <Heading as="h2" fontSize="lg" mb={2}>
            Balasan
          </Heading>
          <>
            {dataReply &&
              dataReply.map((data) => (
                <Box bg="gray.100" p={2} mb={2} borderRadius="md">
                  <Flex justifyContent="space-between">
                    <Heading as="h3" fontSize="md" mb={1}>
                      {data?.user?.name}
                    </Heading>
                    {userData?.id === userId ? (
                      <Button
                        onClick={() => {
                          handleOpenDeleteModal();
                          setIdReply(data?.id);
                        }}
                      >
                        hapus
                      </Button>
                    ) : null}
                  </Flex>

                  <Text fontSize="md">{data?.description}</Text>
                </Box>
              ))}
          </>
        </Box>
      </ModalBody>
      <Modal isOpen={showDeleteModal} onClose={handleCloseDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Konfirmasi Hapus</ModalHeader>
          <ModalBody>Apakah Anda yakin ingin menghapus balasan ini?</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseDeleteModal}>
              Batal
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ModalContent>
  );
};

export default Reply;
