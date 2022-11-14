import { useRef, useEffect, useCallback, ChangeEvent } from "react";
import { TextField } from "@mui/material";

const searchOptions = {
    componentRestrictions: { country: "ar" }
};

type AutocompleteSearchInputProps = {
    street: string;
    onStreetUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
    onLatitudeUpdate: (latitude: string) => void;
    onLongitudeUpdate: (longitude: string) => void; 
  };

export default function AutocompleteSearchInput({street, onStreetUpdate, onLatitudeUpdate, onLongitudeUpdate}: AutocompleteSearchInputProps) {
    const textfieldRef = useRef<HTMLInputElement>();
    const autocompleteRef = useRef<google.maps.places.Autocomplete>();

    const loadAutocompleteReferences = useCallback(() => {
        autocompleteRef.current = new google.maps.places.Autocomplete(
            textfieldRef.current!,
            searchOptions
        );            
    
        const placeChangedListener = autocompleteRef.current.addListener("place_changed", () => {
            const selectedPlace = autocompleteRef.current?.getPlace();
            if (selectedPlace) {
                onLatitudeUpdate(selectedPlace?.geometry?.location?.lat().toString()!);
                onLongitudeUpdate(selectedPlace?.geometry?.location?.lng().toString()!);
                onStreetUpdate({ target: { value: selectedPlace?.formatted_address } } as any);
            }
        });
        return placeChangedListener;
    },[autocompleteRef, textfieldRef, onLatitudeUpdate, onLongitudeUpdate, onStreetUpdate]);

    useEffect(() => {
        const placeChangedListener = loadAutocompleteReferences();

        return(() => {
            /**
             * @TODO: FIX THIS UGLY HACK, We're getting an abusive amnount of
             * duplicated pac-container instances due the high amount of renders (& the horrible behavior from google autocomplete).
             * So i'm removing all containers left after usage manually.
             * This is just a hack for the _meantime_. Pls don't tell investors :)
             */
            autocompleteRef.current?.unbindAll();
            placeChangedListener.remove();

            document.querySelectorAll('.pac-container').forEach((i, index, arr) => {
                if (index < arr.length - 1) {
                    i.remove();
                }
            });
        });
    });

    return(
        <TextField
            fullWidth
            label="Dirección"
            id="direccion-linea-1"
            sx={{ m: 2 }}
            inputRef={textfieldRef}
            value={street}
            onChange={onStreetUpdate}
        />
    );
};
