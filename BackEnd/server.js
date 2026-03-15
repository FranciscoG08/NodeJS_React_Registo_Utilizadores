import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client';

const app = express()
app.use(express.json())
app.use(cors())
const prisma = new PrismaClient();

app.get("/users", async(req, res) => {
    const { name, email, age } = req.query
    //Query Params
    const where = {}
        if(name) where.name = name
        if(email) where.email = email
        if(age) where.age = age
    
    // SEM query params retornar tudo
    const users = await prisma.user.findMany({ where })
    res.status(200).json(users)
})

app.post("/users", async(req, res) => {
    await prisma.user.create({
        data:{
                'email': req.body.email,
                'name': req.body.name,  
                'age': req.body.age,
        }
    })
    // Envie o status e o JSON e pare por aqui
    res.status(201).json(req.body)
})


app.put("/users/:id", async(req, res) => {
    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data:{
                'email': req.body.email,
                'name': req.body.name,  
                'age': req.body.age,
        }
    })
    // Envie o status e o JSON e pare por aqui
    res.status(201).json(req.body)
})


app.delete("/users/:id", async(req, res) => {
    await prisma.user.delete({
        where:{
            id: req.params.id
        },
    })
    // Envie o status e o JSON e pare por aqui
    res.status(201).json({message: "Delete efetuado com sucesso"})
})


app.listen(3000, () => console.log("Servidor rodando na porta 3000"))