import { observer } from "mobx-react-lite";
import { FiPrinter } from "react-icons/fi";

import {
  Button,
  Container,
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
  Text,
  Box,
} from "@chakra-ui/react";

import { ClientAddressDisplay } from "application/components/ui/ClientAddressDisplay";
import { EditablePrice } from "application/components/ui/EditablePrice";
import { Editable } from "application/components/ui/Editable";
import { formatPrice } from "shared/utils/numbers/formatPrice";
import { InvoiceScreenViewModel } from "./view-model";

import style from "./style.module.scss";
import { Client } from "domain/invoice/entities/Client";
import { Header } from "application/components/ui/Header";

const DEFAULT_ADDRESS = `55 avenue de Juvisy
91390 Morsang-sur-Orge`;

const HOST_CLIENT: Client = {
  name: "DUMONT KEVIN ET LUZIO GLORIA",
  address: DEFAULT_ADDRESS,
};

const NAME_MAPPER = {
  nightPrice: "Nuitée",
  stayTaxes: "Taxes de séjour",
  cleaningFees: "Frais de ménage",
};

export interface InvoiceScreenProps {
  viewModel: InvoiceScreenViewModel;
}

const InvoiceScreen = ({ viewModel }: InvoiceScreenProps) => {
  const bindings = {
    nightPrice: viewModel.onNightPriceChange,
    cleaningFees: viewModel.onCleaningFeesChange,
    stayTaxes: undefined,
  } as const;

  return (
    <>
      <Header className={style.notPrintable} />
      <Container maxW="container.lg">
        <Flex justify="center" mt={5}>
          <Button
            onClick={viewModel.onClickPrint}
            leftIcon={<FiPrinter />}
            className={style.notPrintable}
            mb={5}
          >
            Imprimer
          </Button>
        </Flex>

        <Card mb={10} className={style.card}>
          <CardHeader>
            <Heading size="md" display="flex" alignItems="center">
              Facture N°
              <Editable<string>
                value={viewModel.invoice.id}
                onChange={viewModel.onIdChange}
              />
            </Heading>
            <Heading size="sm" color="gray" fontWeight="xs">
              (prestation de service)
            </Heading>
          </CardHeader>
          <CardBody>
            <Flex justify="space-between" mb={10}>
              <div>
                <ClientAddressDisplay client={HOST_CLIENT} />
                <Text fontSize={12}>Tél: 0762064374</Text>
                <Text fontSize={12}>SIRET: 94971080000010</Text>
                <Text fontSize={12}>
                  N° de TVA : Non-assujetti à la TVA (LMNP)
                </Text>
              </div>
              <ClientAddressDisplay
                client={viewModel.invoice.client}
                onChange={viewModel.onClientChange}
              />
            </Flex>

            <Flex justify="space-between">
              <Box
                fontSize={12}
                p={4}
                border="1px solid #F1F1F1"
                borderRadius={10}
              >
                <Flex align="center">
                  <Text>Séjour du </Text>
                  <Editable<string>
                    mx={1}
                    type="date"
                    value={viewModel.fieldStart}
                    onChange={viewModel.onChangeStart}
                    render={() => viewModel.displayStart}
                  />
                  <Text>au</Text>
                  <Editable<string>
                    ml={1}
                    type="date"
                    value={viewModel.fieldEnd}
                    onChange={viewModel.onChangeEnd}
                    render={() => viewModel.displayEnd}
                  />
                </Flex>

                <Flex align="center">
                  <Text mr={1}>
                    {viewModel.invoice.stay.nbAdults +
                      viewModel.invoice.stay.nbChildren}{" "}
                  </Text>
                  <Text>locataire(s), dont</Text>
                  <Editable<number>
                    mx={1}
                    type="number"
                    value={viewModel.invoice.stay.nbAdults}
                    onChange={viewModel.onNbAdultsChange}
                  />
                  <Text>adulte(s) et</Text>
                  <Editable<number>
                    mx={1}
                    type="number"
                    value={viewModel.invoice.stay.nbChildren}
                    onChange={viewModel.onNbChildrenChange}
                  />
                  <Text>enfant(s)</Text>
                </Flex>
                <Text mt={4}>Adresse de la location :</Text>
                <Text fontWeight={700}>55 avenue de Juvisy</Text>
                <Text fontWeight={700}>91390 Morsang-sur-Orge</Text>
              </Box>

              <div>
                <Text fontSize={12}>
                  Date d&apos;émission : {viewModel.formattedIssueDate}
                </Text>

                <Text fontSize={12} as="strong">
                  Délai de paiement : {viewModel.formattedDueDate}
                </Text>
              </div>
            </Flex>

            <TableContainer mt={10}>
              <Table size="sm" variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th minWidth={120}>Nom</Th>
                    <Th isNumeric>Prix UHT</Th>
                    <Th isNumeric>Qté</Th>
                    <Th isNumeric>Prix HT</Th>
                    <Th isNumeric>TVA (0%)</Th>
                    <Th isNumeric>Prix TTC</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {viewModel.invoice.lineItems.map((item, id) => (
                    <Tr key={id}>
                      <Td fontSize={12}>
                        <Text maxW={430} display="block" whiteSpace="normal">
                          {NAME_MAPPER[item.name as keyof typeof NAME_MAPPER]}
                        </Text>
                      </Td>
                      <Td fontSize={12} isNumeric>
                        <EditablePrice
                          price={item.unitPrice}
                          onChange={bindings?.[item.name]}
                          disabled={bindings?.[item.name] === undefined}
                        />
                      </Td>
                      <Td fontSize={12} isNumeric>
                        {item.quantity}
                      </Td>
                      <Td fontSize={12} isNumeric>
                        {formatPrice(item.totalPrice ?? 0)}
                      </Td>
                      <Td fontSize={12} isNumeric>
                        0,00 €
                      </Td>
                      <Td fontSize={12} isNumeric>
                        {formatPrice(item.totalPrice ?? 0)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Flex w="100%" direction="column" align="end" my={8} fontSize={12}>
              <Flex mt={5}>
                <Text>TOTAL</Text>
                <Text w={200} ml={4} textAlign="right">
                  {viewModel.formattedTotalPrice}
                </Text>
              </Flex>
              <Flex>
                <Text>TVA</Text>
                <Text w={200} ml={4} textAlign="right">
                  0,00 €
                </Text>
              </Flex>
              <Flex>
                <Text as="strong">Prix total TTC</Text>
                <Text as="strong" ml={4} w={200} textAlign="right">
                  {viewModel.formattedTotalPrice}
                </Text>
              </Flex>
            </Flex>

            <Text fontSize={10} mb={5}>
              Si paiement par virement bancaire :
            </Text>
            <Flex>
              <Text fontSize={10} as="strong">
                IBAN :
              </Text>
              <Text fontSize={10} marginLeft={2}>
                FR76 4061 8803 8400 0405 0327 482
              </Text>
            </Flex>
            <Flex>
              <Text fontSize={10} as="strong">
                BIC :
              </Text>
              <Text fontSize={10} marginLeft={2}>
                BOUS FRPP XXX
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export const SmartInvoiceScreen = observer(InvoiceScreen);
