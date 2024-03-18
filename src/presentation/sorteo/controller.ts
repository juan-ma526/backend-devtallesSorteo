import { Request, Response } from "express";
import { prisma } from "../../data";

export class SorteoController{
    constructor(){
        this.getSorteos=this.getSorteos.bind(this);
        this.getSorteosOne=this.getSorteosOne.bind(this);
        this.postSorteos=this.postSorteos.bind(this);
        this.patchSorteos=this.patchSorteos.bind(this);
        this.deleteSorteos=this.deleteSorteos.bind(this);
    }

    async getSorteos(req:Request, res:Response){

        const sorteoData = await prisma.sorteo.findMany({
            include: {
                participantes: true,
              }
          });
        
          return res.status(200).json({ sorteoData });
        

    }

    async getSorteosOne(req:Request, res:Response){

        const {id}=req.params;
        if(!id) return res.json(400).json({ error:'no enviaste un id' });

        try {
            const sorteoGetOne = await prisma.sorteo.findUnique({
            where: {
                id: id,
            },
            });
            return res.status(200).json({ sorteoGetOne });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error:'error al buscar el id' });
        }
    }

    async postSorteos(req:Request, res:Response){
        const {name,description,startDate,image, winner , status} = req.body;

        const sorteoData={
            name,
            description,
            startDate,
            image,
            winner,
            status
        }

        try {
            const sorteoPost = await prisma.sorteo.create({
                data:sorteoData
            });
            
            return res.status(200).json({ post:true,sorteoPost });
        } catch (error) {
            console.log(error);
            return res.status(400).json({error:'Error al crear el sorteo'});
        }

    }

    async patchSorteos(req:Request, res:Response){

        const {id}=req.params;
        if(!id) return res.status(400).json({ error:'no enviaste un id' });

        const {name,description,startDate,status,image,winner}=req.body;
        const sorteoBody={
            name,
            description,
            startDate,
            status,
            image,
            winner
        }

        try {

            const sorteoPatch=await prisma.sorteo.update({
                where:{
                    id:id
                },
                data:sorteoBody
            })
            return res.status(200).json({sorteoPatch });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:'ocurrio un error al momento de actualizar' });
        }

    }

    async deleteSorteos(req:Request, res:Response){

        const {id}=req.params;
        if(!id) return res.status(400).json({ error:'no enviaste un id' });

        try {


            const participantDelete=await prisma.participante.deleteMany({
                where:{
                    sorteoId:id
                }
            })


            const sorteoDelete=await prisma.sorteo.delete({
                where:{
                    id:id
                }
            })
            return res.status(200).json({ sorteoDelete});

        } catch (error) {
            console.log(error);
            return res.status(500).json({error:'ocurrio un error al momento de eliminar de bd' });
        }
    }
}