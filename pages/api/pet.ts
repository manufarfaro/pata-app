// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prismadb";
import { Pet } from "@prisma/client";
import { InputPet } from "../../hooks/useCreatePet";
import { Session } from "next-auth";

const handleGet = async (session: Session, res: NextApiResponse<Pet[] | null>) => {
  const petsByUser = await prisma.user
  .findUnique({
    where: {
      email: session.user?.email!,
    },
  })
  .mascotero()
  .pets();

  res.status(200).json(petsByUser);
}

const handlePost = async (
  session: Session,
  req: NextApiRequest,
  res: NextApiResponse<Pet | null>
  ) => {
    const newPet: InputPet = req.body;

    const owner = await prisma.user
      .findUnique({
        where: {
          email: session.user?.email!,
        },
      })
      .mascotero();
    
    if (!owner) res.status(422).end();
    
    const pet = await prisma.pet.create({
      data: {
        name: newPet.name,
        race: newPet.race,
        details: newPet.details,
        type: newPet.type,
        birthDate: newPet.birthDate,
        mascotero: {
          connect: {
            id: owner?.id
          }
        }
      },
    });

    res.status(200).json(pet);

} 

const handlePut = async (
  req: NextApiRequest,
  res: NextApiResponse<Pet | null>
  ) => {
    const petToUpdate = req.body as Pet;
    const updatePet = await prisma.pet.update({
      where: {
        id: petToUpdate.id
      },
      data: petToUpdate
    });
    res.status(200).json(updatePet);
}

const handleDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<Pet | null>
  ) => {
  const deletedPet = await prisma.pet.delete({
    where: {
      id: req.body.id
    }
  });
  res.status(200).json(deletedPet);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pet | Pet[] | null>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    // Signed in
    switch (req.method) {
      case "GET":
        await handleGet(session, res);
        break;
      case "POST":
        await handlePost(session, req, res);
        break;
      case "PUT":
        await handlePut(req, res);
        break;
      case "DELETE":
        await handleDelete(req, res);
        break;
    }
    
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
