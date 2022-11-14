import { Prisma } from '@prisma/client';

export type Mascotero = Prisma.MascoteroGetPayload<{
    include: {
        user: true,
        pets: true
    }
}>;


