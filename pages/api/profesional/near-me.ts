// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { computeDistanceBetween } from 'spherical-geometry-js';
import prisma from "../../../lib/prismadb";
import { authOptions } from "../auth/[...nextauth]";
import { Profesional, ProfesionalNearMe } from "../../../models/Profesional";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profesional[]>
) {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
        // Signed in
        const userByEmail = await prisma.user.findUnique({
            where: {
                email: session.user?.email!,
            },
        });

        const userLatLng = {
            lat: parseFloat(userByEmail?.addressLat!),
            lng: parseFloat(userByEmail?.addressLng!),
          };

          if (!userLatLng.lat || !userLatLng.lng) {
            res.status(200).json([]);
            res.end();
          }

        const profesionals = await prisma.profesional.findMany({
            where: {
                isOnline: true
            },
            include: {
                user: true
            }
        }) as ProfesionalNearMe[];

        const sortedProfesionals: ProfesionalNearMe[] = profesionals
            .filter(i => i.user.addressLat && i.user.addressLng)
            .map((profesional: ProfesionalNearMe) => {
                profesional.distance = (computeDistanceBetween(
                    userLatLng, 
                    { lat: parseFloat(profesional?.user?.addressLat!), lng: parseFloat(profesional?.user?.addressLng!)})/1000).toFixed().toString();
                    
                return profesional;
            })
            .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

        res.status(200).json(sortedProfesionals);
    };
}
