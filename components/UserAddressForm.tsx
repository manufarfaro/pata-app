import { Box, MenuItem, TextField } from "@mui/material";
import { AddressType } from "@prisma/client";
import { ChangeEvent, useCallback, createRef, useMemo, ReactNode } from "react";
import AutocompleteSearchInput from "./AutocompleteSearchInput";

export type UserAddressFormData = {
  street: string,
  streetDetails: string,
  addressType: AddressType,
};

type UserInfoFormProps = UserAddressFormData & {
  onStreetUpdate: (street: string) => void,
  onStreetDetailsUpdate: (streetDetails: string) => void,
  onAddressLatitudeUpdate: (addressLatitude: string) => void,
  onAddressLongitudeUpdate: (addressLongitude: string) => void,
  onAddressTypeUpdate: (addressType: AddressType) => void
};

export default function UserInfoForm({
  street,
  streetDetails,
  addressType,
  onStreetUpdate,
  onStreetDetailsUpdate,
  onAddressLatitudeUpdate,
  onAddressLongitudeUpdate,
  onAddressTypeUpdate,
}: UserInfoFormProps) {

  const handleStreetChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onStreetUpdate(event.target.value);
  }, [onStreetUpdate]);

  const handleStreetDetailsChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onStreetDetailsUpdate(event.target.value);
  }, [onStreetDetailsUpdate]);

  const handleAddressTypeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onAddressTypeUpdate(event.target.value as AddressType);
  }, [onAddressTypeUpdate]);

  const menuItems = useMemo<ReactNode[]>(() => Object.values(AddressType).map((type, index) => (
      <MenuItem key={index} value={AddressType[type]}>
        {AddressType[type]}
      </MenuItem>
    ))
  ,[]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
      <AutocompleteSearchInput
        street={street}
        onStreetUpdate={handleStreetChange}
        onLatitudeUpdate={onAddressLatitudeUpdate}
        onLongitudeUpdate={onAddressLongitudeUpdate}
      />
      <TextField
        fullWidth
        label="Dirección 2da linea"
        id="direccion-linea-2"
        sx={{ m: 2 }}
        defaultValue={streetDetails}
        onChange={handleStreetDetailsChange}
      />
      <TextField
        fullWidth
        id="tipo-direccion"
        select
        label="Tipo de Dirección"
        value={addressType}
        sx={{ m: 2 }}
        onChange={handleAddressTypeChange}
        helperText="Seleccioná el tipo de dirección"
      >
        {menuItems}
      </TextField>
    </Box>
  );
}
