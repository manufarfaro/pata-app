import { Prisma } from "@prisma/client";

export type Profesional = Prisma.ProfesionalGetPayload<{
    include: {
        user: true
    }
}>;

export type ProfesionalNearMe = Profesional & {
    distance: string;
}