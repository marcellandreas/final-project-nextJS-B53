import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

export const CustomForm = ({ type, label, placeholder, onChange, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          bg="whiteAlpha.800"
          border="none"
          _focus={{ border: "none", bg: "whiteAlpha.900" }}
        />
        {type === "password" && (
          <InputRightElement>
            <Button
              variant="ghost"
              h="1.75rem"
              size="sm"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
};
