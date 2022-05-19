import { Flex, List, ListItem, Text, Link } from '@chakra-ui/react'

export default function Navbar() {
  return (
    <Flex bg="#757575" borderBottom="2px solid black" p="4px 50px 4px 50px" fontSize="22px" w="100%" alignContent={"flex-start"}>
        <Link href="/">
            <Text _hover={{bg:"#212121"}} borderRadius="8px" m="0px 5px 0px 0px" p="5px 10px 5px 10px" color="white" bg="#424242">Home</Text>
        </Link>
    </Flex>
  )
}