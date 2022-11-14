import { TextField } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

type ProfesionalWizardStepProps = {
  matricula?: string;
  onMatriculaUpdate: (matricula: string) => void;
};

export default function ProfesionalWizardStep({
  matricula,
  onMatriculaUpdate,
}: ProfesionalWizardStepProps) {
  const [internalData, setInternalData] = useState<string | undefined>(
    matricula
  );
  const handleMatriculaChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInternalData(event.target.value);
      onMatriculaUpdate(event.target.value);
    },
    [setInternalData, onMatriculaUpdate]
  );

  return (
    <TextField
      fullWidth
      required
      id="profesional-matricula"
      label="Número de Matricula"
      value={internalData}
      onChange={handleMatriculaChange}
    />
  );
}
