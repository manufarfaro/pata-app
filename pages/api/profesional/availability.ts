// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Profesional } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import prisma from "../../../lib/prismadb";
import { authOptions } from "../auth/[...nextauth]";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profesional>
) {
    const session = await unstable_getServerSession(req, res, authOptions);

    // Signed in
    if (session) {
        if(req.method === "POST") {
            if (typeof req.body.isOnline !== "boolean") res.status(422).end();

            const userByEmail = await prisma.user.findUnique({
                where: {
                    email: session.user?.email!,
                },
            });
    
            const profesional = await prisma.profesional.update({
                where: {
                    userId: userByEmail?.id
                },
                data: {
                    isOnline: req.body.isOnline
                }
            });

            res.status(200).json(profesional);
        }
        
        
    }
    res.end()
}
