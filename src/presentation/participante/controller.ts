import { Request, Response } from "express";
import { prisma } from "../../data";
import { parse } from 'url';

export class ParticipanteController{

    constructor(){

        this.getParticipante=this.getParticipante.bind(this);
        this.deleteParticipanteOne=this.deleteParticipanteOne.bind(this);
        this.deleteParticipanteFull=this.deleteParticipanteFull.bind(this);

    }

    async getParticipante(req:Request,res:Response){
        const { query } = parse(req.url || '', true);

        const take = Number(query.take ?? '10');
        const skip = Number(query.skip ?? '0');

        if (isNaN(take)) {
            return res.status(400).json({ message: "Take debe ser un numero" });
        }

        if (isNaN(skip)) {
            return res.status(400).json({ message: "Skip debe ser un numero" });
        }

        const participantes = await prisma.participante.findMany({
            take: take,
            skip: skip,
        });

        return res.status(200).json(participantes);
    }

    async deleteParticipanteOne(req:Request,res:Response){
        const { id } = req.params;

        try {
            const deleteParticipante = await prisma.participante.delete({
            where: {
                id: id,
            },
            });

            return res.status(200).json(deleteParticipante);
        } catch (error) {
            return res.status(400).json({ message: "El id del participante no existe" });
        }
    }

    async deleteParticipanteFull(req:Request,res:Response){
        const deleteParticipantes = await prisma.participante.deleteMany();

        return res.status(200).json({ message: "Todos los participantes fueron borrados" });
    }
}