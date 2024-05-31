import { Client } from "domain/invoice/entities/Client";
import { Editable } from "../Editable";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

export type ClientAddressDisplayProps = {
  client: Client;
  onChange?: (client: Client) => void;
  disableEdit?: boolean;
};

export const ClientAddressDisplay = ({
  client,
  onChange,
  disableEdit,
}: ClientAddressDisplayProps) => {
  const onNameChange = (name: string) => {
    onChange?.({ ...client, name });
  };

  const onAddressChange = (address: string) => {
    onChange?.({ ...client, address });
  };

  const onPhoneChange = (phone: string) => {
    onChange?.({ ...client, phone });
  };

  return (
    <Box fontSize={12}>
      <Text as="strong">
        <Editable<string>
          value={client.name}
          onChange={onNameChange}
          disabled={disableEdit}
        />
      </Text>
      <Editable<string>
        value={client.address}
        onChange={onAddressChange}
        disabled={disableEdit}
        type="textarea"
        render={(value) =>
          value.split(`\n`).map((addressPart, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {addressPart}
              <br />
            </React.Fragment>
          ))
        }
      />
      <Text display="flex">
        <Text as="strong" alignContent="center" mr={1}>
          Tél:
        </Text>
        <Editable<string>
          value={client.phone ?? ""}
          onChange={onPhoneChange}
          disabled={disableEdit}
        />
      </Text>
    </Box>
  );
};
