import { Client } from "domain/invoice/entities/Client";
import { Editable } from "../Editable";
import { Text } from "@chakra-ui/react";
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
  const onAddressChange = (address: string) => {
    onChange?.({
      ...client,
      address,
    });
  };

  return (
    <div>
      <Text as="strong">{client.name}</Text>
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
    </div>
  );
};
