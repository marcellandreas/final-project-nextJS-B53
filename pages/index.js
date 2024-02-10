import Navbar from "@/components/navbar";
import Blog from "@/components/blog";
import CreateBlog from "@/components/blog/create";
import { UseQueries } from "@/hooks";
import Cookies from "js-cookie";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  const { data, isLoading } = UseQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  if (isLoading) {
    return (
      <p className="flex justify-center items-center h-screen">
        Halaman Sedang memuat...
      </p>
    );
  }

  return (
    <>
      <Navbar />
      <section className="p-2">
        <CreateBlog />

        <Flex flexDirection={"column"} gap={3} pt={3} bg="gray.100">
          {data?.data.map((data) => (
            <Blog key={data.id} data={data} />
          ))}
        </Flex>
      </section>
    </>
  );
}
