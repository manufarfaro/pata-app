import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  MobileStepper,
  Paper,
  Step,
  useTheme,
} from "@mui/material";
import { AddressType, UserType } from "@prisma/client";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { NewUserInputData } from "../models/NewUserInputData";
import ProfesionalWizardStep from "./ProfesionalWizardStep";
import UserInfoForm, { UserAddressFormData } from "./UserAddressForm";
import UserTypeChooserStep from "./UserTypeChooserStep";

type NewUserWizardProps = {
  onUpdateData: (userData: NewUserInputData) => void;
  isUpdateLoading: boolean;
};

type Step = {
  label: string;
  description: string;
  render: ReactNode;
};

export default function NewUserWizard({ onUpdateData, isUpdateLoading }: NewUserWizardProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [userType, setUserType] = useState<UserType>(UserType.Mascotero);
  const [street, setStreet] = useState<string>("");
  const [streetDetails, setStreetDetails] = useState<string>("");
  const [addressLatitude, setAddressLatitude] = useState<string>("");
  const [addressLongitude, setAddressLongitude] = useState<string>("");
  const [addressType, setAddressType] = useState<AddressType>(AddressType.Domicilio);

  const [matricula, setMatricula] = useState<string>("");

  const defaultSteps = useMemo(() => ([
    {
      label: "Tipo de Usuario",
      description: `Seleccioná si sos team mascotero o team profesional`,
      render: (
        <UserTypeChooserStep value={userType as UserType} onOptionPick={setUserType} />
      ),
    },
    {
      label: "Cargá tus datos",
      description: `Dejanos conocerte mejor. Mientras mas info completes, mas rapidos vamos a poder ser durante una urgencia. ¡${userType} prevenido vale por dos!`,
      render: (
        <UserInfoForm
          street={street}
          streetDetails={streetDetails}
          addressType={addressType}
          onStreetUpdate={setStreet}
          onStreetDetailsUpdate={setStreetDetails}
          onAddressLatitudeUpdate={setAddressLatitude}
          onAddressLongitudeUpdate={setAddressLongitude}
          onAddressTypeUpdate={setAddressType}
        />
      ),
    },
  ]), [userType, street, streetDetails, addressType]);

  const profesionalSteps = useMemo(() => ([
    ...defaultSteps,
    {
      label: "Matricula",
      description:
        "Cargá a continuación tu información profesional. (Tené en cuenta que hasta que tu información no sea validada, no vas a poder utilizar tu cuenta.)",
      render: (
        <ProfesionalWizardStep
          matricula={matricula}
          onMatriculaUpdate={setMatricula}
        />
      ),
    },
  ]), [defaultSteps, matricula]);

  const [steps, setSteps] = useState<Step[]>(defaultSteps);

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [setActiveStep]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, [setActiveStep]);

  const handleSubmit = useCallback(() => {
    const newUserData: NewUserInputData = {
      type: userType,
      street,
      streetDetails,
      addressLatitude,
      addressLongitude,
      addressType,
      matricula
    };
    onUpdateData(newUserData);
  }, [userType, street, addressLatitude, addressLongitude, addressType, streetDetails, matricula, onUpdateData]);

  useEffect(() => {

    if (UserType.Profesional == userType) {
      setSteps(profesionalSteps);
    } else {
      setSteps(defaultSteps);
      setMatricula("");
    }
  }, [defaultSteps, profesionalSteps, userType]);

  const getStepContent = useMemo(() => (
    <>
      <h4>{steps[activeStep].description}</h4>
      {steps[activeStep].render}
    </>
  ), [activeStep, steps]);

  return (
    <Box sx={{ width: "100%", flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "100vw",
          mt: 2,
          bgcolor: "background.default",
        }}
      >
        <h1>{steps[activeStep].label}</h1>
      </Paper>
      <Box sx={{ width: "100%", p: 2 }}>
        {getStepContent}
      </Box>
      <MobileStepper
        variant="text"
        steps={steps.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          activeStep === steps.length - 1 ? 
             isUpdateLoading ?
              <LoadingButton
                loading
                loadingPosition="end"
                endIcon={
                  theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )
                }
                variant="contained"
              >
                Terminar
              </LoadingButton>:
              <Button size="small" onClick={handleSubmit} variant="contained">
                Terminar
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            
            
           : (
            <Button
              size="small"
              onClick={handleNext}
              variant="outlined"
              disabled={activeStep === steps.length - 1}
            >
              Siguiente
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          )
        }
        backButton={
          <Button
            size="small"
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Atras
          </Button>
        }
      />
    </Box>
  );
}
