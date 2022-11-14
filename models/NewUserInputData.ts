import { AddressType, UserType } from "@prisma/client";

export type NewUserInputData = {
    type: UserType;
    street: string;
    streetDetails: string;
    addressLatitude: string;
    addressLongitude: string;
    addressType: AddressType;
    matricula?: string;
};
