export const showToast = (toast, { title, description, status }) => {
  toast({
    title: title,
    description: description,
    status: status,
    duration: 2000,
    isClosable: true,
    position: "top",
  });
};
