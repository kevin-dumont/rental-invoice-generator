import { Flex, Text } from "@chakra-ui/react";

export function Signatures() {
  return (
    <Flex mt={10} justifyContent="space-between" mb={0} gap={10}>
      <Text
        flex={1}
        fontSize={12}
        fontWeight="bold"
        border="1px solid"
        borderColor="gray.300"
        bg="gray.50"
        p={4}
        height={150}
        rounded="md"
      >
        Date et signature du bailleur
      </Text>
      <Text
        flex={1}
        fontSize={12}
        fontWeight="bold"
        border="1px solid"
        borderColor="gray.300"
        bg="gray.50"
        p={4}
        height={150}
        rounded="md"
      >
        Date et signature du locataire
      </Text>
    </Flex>
  );
}
