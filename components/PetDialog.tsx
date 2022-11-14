import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { Pet, PetType } from "@prisma/client";
import useCreatePet, { InputPet } from "../hooks/useCreatePet";
import { LoadingButton } from "@mui/lab";
import { EditSharp, SaveAlt } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import useUpdatePet, { updateInputPet } from "../hooks/useUpdatePet";
import { petsCacheKey } from "../hooks/usePets";

type NewPetDialog = {
    isOpen: boolean,
    isEdit?: boolean,
    defaultValue?: Pet,
    onClose: () => void
};

const PetFormControl = styled(FormControl)`
    margin: .5rem 0;
`;

export default function PetDialog ({ isOpen, isEdit, defaultValue, onClose }: NewPetDialog) {
    const queryClient = useQueryClient();
    const [name, setName] = useState<string>("");
    const [petType, setPetType] = useState<PetType>(PetType.Felino);
    const [race, setRace] = useState<string>("");
    const [details, setDetails] = useState<string>("");
    const [birthDate, setBirthDate] = useState<Date>(new Date);
    const createPetMutation = useCreatePet(() => {
        queryClient.invalidateQueries([petsCacheKey]);
    });
    const updatePetMutation = useUpdatePet(() => {
        queryClient.invalidateQueries([petsCacheKey]);
    });

    const clearForm = useCallback(() => {
        setName("");
        setPetType(PetType.Felino);
        setRace("");
        setDetails("");
        setBirthDate(new Date);
    }, [setName, setPetType, setRace, setDetails, setBirthDate]);

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEdit) {
            const pet: updateInputPet = {
                id: defaultValue?.id!,
                name,
                details,
                race,
                type: petType,
                birthDate
            }
            updatePetMutation.mutate(pet);
        } else {
            const newPet: InputPet = {
                name,
                details,
                race,
                type: petType,
                birthDate
            };
            createPetMutation.mutate(newPet);
        }
        
        clearForm();
        onClose();
    }, [name, details, race, petType, birthDate, clearForm, createPetMutation, defaultValue?.id, isEdit, onClose, updatePetMutation]);

    const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    const handlePetTypeChange = useCallback((event: ChangeEvent<HTMLInputElement> , value: string) => {
        setPetType(value as PetType);
    }, []);

    const handleRaceChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setRace(event.target.value);
    }, []);

    const handleDetailsChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setDetails(event.target.value);
    }, []);
    const handleBirthDateChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setBirthDate(new Date(event.target.value));
    }, []);

    const petTypeOptions = useMemo(() => (
        Object.values(PetType).map((type, index) => (
          <FormControlLabel
            key={index}
            value={type}
            control={<Radio />}
            label={type}
          />
        ))
      ), []);

    useEffect(() => {
        if (isEdit && defaultValue?.id) {
            setName(defaultValue.name);
            setPetType(defaultValue.type);
            setRace(defaultValue.race);
            setDetails(defaultValue.details);
            setBirthDate(new Date(defaultValue.birthDate));
        } else {
            clearForm();
        }
    }, [isEdit, defaultValue?.id, defaultValue?.name, defaultValue?.type, defaultValue?.race, defaultValue?.details, defaultValue?.birthDate, clearForm]);

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth
            scroll="paper"
        >
            <DialogTitle>{isEdit ? "Editá" : "Agregá"} tu Mascota</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                        
                        {isEdit ? "Editá" : "Agregá"} tu mascota.
                    </DialogContentText>
                    <Box
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        <PetFormControl>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                label="Nombre"
                                fullWidth
                                variant="standard"
                                value={name}
                                onChange={handleNameChange}
                                helperText="No puede estar en blanco."
                            />
                        </PetFormControl>

                        <PetFormControl>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={PetType.Canino}
                                name="radio-buttons-group"
                                onChange={handlePetTypeChange}
                                value={petType}
                                sx={{ marginLeft: "1rem" }}
                            >
                                {petTypeOptions}
                            </RadioGroup>
                        </PetFormControl>

                        <PetFormControl>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="race"
                                label="Raza"
                                fullWidth
                                variant="standard"
                                value={race}
                                onChange={handleRaceChange}
                                helperText="No puede estar en blanco."
                            />
                        </PetFormControl>

                        <PetFormControl>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="details"
                                label="Detalles"
                                fullWidth
                                multiline
                                rows={2}
                                variant="standard"
                                value={details}
                                onChange={handleDetailsChange}
                                helperText="No puede estar en blanco."
                            />
                        </PetFormControl>

                        <PetFormControl>
                            <FormLabel>Fecha de Nacimiento</FormLabel>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="birthdate"
                                type="date"
                                fullWidth
                                value={birthDate.toISOString().substring(0, 10)}
                                onChange={handleBirthDateChange}
                                helperText="No puede estar en blanco."
                            />
                        </PetFormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                        <LoadingButton
                            loading={createPetMutation.isLoading || updatePetMutation.isLoading}
                            type="submit"
                            loadingPosition="end"
                            endIcon={isEdit ? <EditSharp /> : <SaveAlt />}
                            variant="contained"
                        >
                        {isEdit ? "Editar" : "Agregar"}
                        </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
}
