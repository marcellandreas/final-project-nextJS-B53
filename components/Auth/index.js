import { Box, Flex } from "@chakra-ui/react";

const AuthComponent = ({ children }) => {
  return (
    <Flex
      width="full"
      height="100vh"
      align="center"
      background={"gray"}
      justifyContent="center"
      bgGradient="linear(to-r, rgba(255,255,255,0.5), rgba(255,255,255,0.5))"
    >
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="rgba(255,255,255,0.5)"
        backdropFilter="blur(5px)"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default AuthComponent;
