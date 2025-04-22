import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

dotenv.config();


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/usuarios', async (req, res) => {
try {
    const {name, age, mail} = req.query;

    const usuarios = await prisma.user.findMany({
      where: {
          name: req.query.name,
          age: req.query.age,
          mail: req.query.mail
    },
  });

  res.status(200).json(usuarios);
} catch (erro) {
    res.status(500).json({erro:'Erro ao buscar usuários.'})
}
});


app.post('/usuarios', async (req, res) => {
  const { name, age, mail } = req.body;

  try {
    const novoUsuario = await prisma.user.create({
      data: { name, age, mail },
    });

    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhe: err });
  }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const {id, name, age, mail} = req.body;

    const usuarioAtualizado = await prisma.user.update ({
        where: {
            id: req.params.id
    },
    data: {
        name: req.body.name,
        age: req.body.age,
        mail: req.body.mail
    }
});
        res.status(200).json(usuarioAtualizado);
    } catch (erro) {
        res.status(500).json({erro: 'Erro atualizar usúario.'})
    }
});

app.delete('/usuarios/:id', async(req, res) => {
  try {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
    
  res.status(200).json({message: 'Usuário deletado com sucesso!'});
} catch (erro) {
  res.status(500).json({erro:'Erro ao deletar o usuário'});
}
});

  
  





app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
});
