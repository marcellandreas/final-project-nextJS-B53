import { useUser } from "@/hooks";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaRegBell } from "react-icons/fa";
import { MdAccountCircle, MdLogout } from "react-icons/md";

const ProfileUser = ({ handleLogout, dataNotif }) => {
  const { userData } = useUser();

  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
        {userData?.name}
      </MenuButton>

      <MenuList gap={3} display="flex" flexDirection="column">
        <MenuItem>
          <Link href="/profile">
            <Flex gap={2} justifyContent={"center"} alignItems="center">
              <MdAccountCircle className="text-xl" />
              Profile
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem gap={2} bgSize={4}>
          <Link href="/notifications" className="flex gap-2">
            <span className="relative text-xl">
              <FaRegBell />
              <p className=" absolute -top-2 flex justify-center items-center rounded-full w-4 h-4 -right-1 bg-red-400 text-sm ">
                {dataNotif?.data?.length}
              </p>
            </span>
            <span>Notifikasi</span>{" "}
          </Link>
        </MenuItem>
        <MenuItem onClick={() => handleLogout()}>
          <Flex gap={2} justifyContent={"center"} alignItems="center">
            <MdLogout className="text-xl" />
            Log out
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileUser;
