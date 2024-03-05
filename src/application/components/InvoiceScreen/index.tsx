import { observer } from "mobx-react-lite";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { InvoiceScreenViewModel } from "./view-model";

import { Field } from "../Field";
import { InvoiceCard } from "../InvoiceCard";

export interface InvoiceScreenProps {
  viewModel: InvoiceScreenViewModel;
}

const InvoiceScreen = ({ viewModel }: InvoiceScreenProps) => {
  return (
    <Container maxW="container.lg">
      <Flex justify="space-between" marginY={5} gap={5}>
        <Card flex={1}>
          <CardHeader>
            <Heading size="md">Séjour</Heading>
          </CardHeader>
          <CardBody>
            <Field
              label="Prix total TTC"
              value={viewModel.wantedTotalPrice}
              onChange={viewModel.onWantedTotalPriceChange}
            />

            <Field
              label="Nb adultes"
              value={viewModel.nbAdults}
              onChange={viewModel.onNbAdultsChange}
            />

            <Field
              label="Nb enfants"
              type="number"
              value={viewModel.nbChildren}
              onChange={viewModel.onNbChildrenChange}
            />

            <Field
              label="Start date"
              type="date"
              value={viewModel.formattedStartDate}
              onChange={viewModel.onStartDateChange}
            />

            <Field
              label="End date"
              type="date"
              value={viewModel.formattedEndDate}
              onChange={viewModel.onEndDateChange}
            />
          </CardBody>
        </Card>

        <Card flex={1}>
          <CardHeader>
            <Heading size="md">Client</Heading>
          </CardHeader>
          <CardBody>
            <Field
              label="Prénom"
              value={viewModel.firstName}
              onChange={viewModel.onFirstNameChange}
            />

            <Field
              label="Nom"
              value={viewModel.lastName}
              onChange={viewModel.onLastNameChange}
            />

            <Field
              label="Rue"
              value={viewModel.address.street}
              onChange={viewModel.onAddressStreetChange}
            />

            <Field
              label="Code postal"
              value={viewModel.address.zipCode}
              onChange={viewModel.onAddressZipCodeChange}
            />

            <Field
              label="Ville"
              value={viewModel.address.city}
              onChange={viewModel.onAddressCityChange}
            />
          </CardBody>
        </Card>
      </Flex>

      {viewModel.invoice && <InvoiceCard invoice={viewModel.invoice} />}
    </Container>
  );
};

export const SmartInvoiceScreen = observer(InvoiceScreen);
