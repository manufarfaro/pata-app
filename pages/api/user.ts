// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prismadb";
import { User, Mascotero, Profesional, UserType, AddressType } from "@prisma/client";
import { NewUserInputData } from "../../models/NewUserInputData";

async function handleGet(user: User | null, res: NextApiResponse<User | Mascotero | Profesional | null>) {
  switch (user?.type) {
    case UserType.Mascotero:
      res.status(200).json(
        await prisma.mascotero.findUnique({
          where: { userId: user.id },
          include: {
            user: true,
            pets: true
          }
        })
      );
      break;

    case UserType.Profesional:
      res.status(200).json(
        await prisma.profesional.findUnique({
          where: { userId: user.id },
          include: {
            user: true
          }
        })
      );
      break;

    default:
      res.status(200).json(user);
      break;
  }
};

async function handlePost (input: NewUserInputData, userSession: User, res: NextApiResponse<User | Mascotero | Profesional | null>) {
  switch (input?.type) {
    case UserType.Mascotero:
      const [userUpdatedMascotero, newMascotero] = await prisma.$transaction([
        prisma.user.update({
          where: { id: userSession.id },
          data: {
            addressType: input.addressType,
            street: input.street,
            streetDetails: input.streetDetails,
            addressLat: input.addressLatitude,
            addressLng: input.addressLongitude,
            type: input?.type,
            wizardDone: true
          }
        }),
        prisma.mascotero.create({
          data: {
            user: {
              connect: { id: userSession.id },
            }
          }
        })
      ]);
      res.status(200).json(newMascotero);
      break;
    case UserType.Profesional:
      const [userUpdatedProfesional, newProfesional] = await prisma.$transaction([
        prisma.user.update({
          where: { id: userSession.id },
          data: {
            addressType: input.addressType,
            street: input.street,
            streetDetails: input.streetDetails,
            addressLat: input.addressLatitude,
            addressLng: input.addressLongitude,
            type: input?.type,
            wizardDone: true
          }
        }),
        prisma.profesional.create({
          data: {
            matricula: input.matricula!,
            isOnline: false,
            user: {
              connect: { id: userSession.id },
            }
          }
        })
      ]);
      res.status(200).json(newProfesional);
      break;
    default:
      res.status(422).end("UserType is invalid or is missing");
      break;
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | Mascotero | Profesional | null>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    // Signed in
    const userByEmail = await prisma.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    });

    switch (req.method) {
      case "GET":
        handleGet(userByEmail, res);
        break;
      case "POST":
        handlePost(req.body as NewUserInputData, userByEmail!, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
    

  } else {
    // Not Signed in
    res.status(401);
  }
}
