import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { UserType } from "@prisma/client";
import { useCallback, ChangeEvent, useMemo } from "react";

type UserTypeChooserStepProps = {
  value: UserType;
  onOptionPick: (userType: UserType) => void;
};

export default function UserTypeChooserStep({
  value,
  onOptionPick,
}: UserTypeChooserStepProps) {

  const handleOptionChange = useCallback(
    (el: ChangeEvent<HTMLInputElement>, value: string) => {
      onOptionPick(value as UserType);
    },
    [onOptionPick]
  );

  const type = value as UserType;

  const typeOptions = useMemo(() => (
    Object.values(UserType).map((type, index) => (
      <FormControlLabel
        key={index}
        value={type}
        control={<Radio />}
        label={type}
      />
    ))
  ), []);

  return (
    <FormControl>
      <FormLabel id="user-type-chooser">Team</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={UserType.Mascotero}
        name="radio-buttons-group"
        onChange={handleOptionChange}
        value={type}
      >
        {typeOptions}
      </RadioGroup>
    </FormControl>
  );
}
