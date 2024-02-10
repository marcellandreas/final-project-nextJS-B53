import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { TiThSmall } from "react-icons/ti";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import { FormatDate } from "@/utils/formatDate";
import Cookies from "js-cookie";
import { useUser } from "@/hooks/useContext";
import EditBlog from "./Edit";
import { UseMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import Reply from "./Reply";

const BlogPost = ({ data, isLoading }) => {
  const { userData } = useUser();
  const router = useRouter();
  const toast = useToast();
  const { mutationData } = UseMutation();

  const [payload, setPayload] = useState({
    description: "",
  });

  const [blogId, setBlogId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (blogId !== null) {
      async function fecthData() {
        const res = await fetch(
          `https://paace-f178cafcae7b.nevacloud.io/api/post/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("user_token")}`,
            },
          }
        );
        const Blog = await res.json();
        setPayload({
          description: Blog?.data?.description,
        });
      }

      fecthData();
    }
  }, [blogId]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleEditClick = () => {
    openModal("edit");
  };

  const handleDeleteClick = () => {
    openModal("delete");
  };

  const handleSubmitUpdate = async () => {
    const response = await mutationData({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/post/update/${blogId}`,
      method: "PATCH",
      payload,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });

    if (response?.success) {
      router.reload();
      closeModal();
    }
  };

  const handleDelete = async () => {
    const response = await mutationData({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${blogId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });

    if (response?.success) {
      router.reload();
      alert(`${id} berhasil dihapus`);
    }
  };

  const handleLike = async (id) => {
    const response = await mutationData({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/likes/post/${id}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (response?.success) {
      router.reload();
      toast({
        title: "Berhasil Like",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleUnlike = async (id) => {
    const response = await mutationData({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/unlikes/post/${id}`,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (response?.success) {
      router.reload();

      toast({
        title: "Berhasil Unlike",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center" minHeight="20vh">
      <Box
        p={4}
        maxW="400px"
        w="100%"
        bg="white"
        boxShadow="md"
        borderRadius="md"
      >
        <Flex justifyContent="space-between">
          <Box>
            <Heading as="h1" fontSize="xl" mb={0}>
              {data?.user?.name},
            </Heading>
            <Text fontSize="md" color="gray.600" mb={0}>
              {data?.user?.email}
            </Text>
            <Text fontSize="md" color="gray.600" mb={5}>
              {FormatDate(data?.created_at)}
            </Text>
          </Box>
          <Box>
            {data?.users_id === userData?.id && (
              <Menu>
                <MenuButton>
                  <TiThSmall />
                </MenuButton>
                <MenuList gap={2} display="flex" flexDirection="column" p={2}>
                  <MenuItem
                    display="flex"
                    gap={2}
                    bg="blue.600"
                    color="white"
                    onClick={() => {
                      handleEditClick();
                      setBlogId(data?.id);
                    }}
                  >
                    <MdEdit />
                    Edit
                  </MenuItem>
                  <MenuItem
                    display="flex"
                    gap={2}
                    bg="red.600"
                    color="white"
                    onClick={() => {
                      setBlogId(data?.id);
                      handleDeleteClick();
                    }}
                  >
                    <MdDelete />
                    Hapus
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Box>
        </Flex>
        <Text fontSize="md" color="gray.800">
          {data?.description}
        </Text>
        <Flex mt={4}>
          <Flex justifyContent="center" alignItems="center" flex={1}>
            <IconButton
              aria-label="Like"
              icon={<FiHeart color={data?.is_like_post ? "red" : "gray"} />}
              onClick={() => {
                !data?.is_like_post
                  ? handleLike(data?.id)
                  : handleUnlike(data?.id);
              }}
            />
            <Text ml={2}>{data?.likes_count} Liked</Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center" flex={1}>
            <IconButton
              aria-label="Reply"
              icon={<FiMessageCircle />}
              colorScheme="blue"
              onClick={() => {
                onOpen();
                setBlogId(data?.id);
                setUserId(data?.user.id);
              }}
              ml={4}
            />
            <Text ml={2}>{data?.replies_count} Replies</Text>
          </Flex>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <Reply id={blogId} userId={userId} onClose={onClose} />
        </Modal>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {modalType === "edit" ? "Edit Postingan" : "Hapus Postingan"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {modalType === "edit" && (
                <>
                  <EditBlog
                    payload={payload}
                    setPayload={setPayload}
                    onClose={closeModal}
                    onSubmit={handleSubmitUpdate}
                  />
                </>
              )}
              {modalType === "delete" && (
                <>
                  <Text>Apakah anda ingin menghapus </Text>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={closeModal}>
                      Kembali
                    </Button>
                    <Button colorScheme="blue" onClick={handleDelete}>
                      Ya, Hapus
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default BlogPost;
