import { Flex, List, ListItem } from '@chakra-ui/react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <Flex w="100%" alignContent={"flex-start"}>
        <Link href="/">Home</Link>
        <Link href="/wildyData">Wildy Data</Link>
    </Flex>
  )
}