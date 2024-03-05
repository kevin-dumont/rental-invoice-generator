import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Invoice } from "domain/invoice/models/Invoice";
import { formatPrice } from "shared/utils/numbers/formatPrice";
import { ClientAddressDisplay } from "../ClientAddressDisplay";
import { memo } from "react";
import { Client } from "domain/invoice/models/Client";

const HOST_CLIENT: Client = {
  firstName: "DUMONT KEVIN ET",
  lastName: "LUZIO GLORIA",
  address: {
    street: "55 avenue de Juvisy",
    zipCode: "91390",
    city: "Morsang-sur-Orge",
  },
};

export interface InvoiceCardProps {
  invoice: Invoice;
}

export const InvoiceCard = memo(({ invoice }: InvoiceCardProps) => {
  return (
    <Card marginBottom={10}>
      <CardHeader>
        <Heading size="md">Facture</Heading>
      </CardHeader>
      <CardBody>
        <Flex justify="space-between" marginY={10}>
          <ClientAddressDisplay client={HOST_CLIENT} />
          <ClientAddressDisplay client={invoice.client} />
        </Flex>

        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nom</Th>
                <Th isNumeric>Prix UHT</Th>
                <Th isNumeric>Qty</Th>
                <Th isNumeric>Prix TTC</Th>
              </Tr>
            </Thead>
            <Tbody>
              {invoice?.lineItems.map((item) => (
                <Tr key={item.name}>
                  <Td>{item.name}</Td>
                  <Td isNumeric>{formatPrice(item.unitPrice)}</Td>
                  <Td isNumeric>{item.quantity}</Td>
                  <Td isNumeric>{formatPrice(item.totalPrice)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
});
