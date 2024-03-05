import { Text } from "@chakra-ui/react";
import { Client } from "domain/invoice/models/Client";

export const ClientAddressDisplay = ({ client }: { client: Client }) => {
  return (
    <div>
      <Text as="strong">
        {client.firstName} {client.lastName}
      </Text>
      <Text>{client.address.street}</Text>
      <Text>
        {client.address.zipCode} {client.address.city}
      </Text>
    </div>
  );
};
