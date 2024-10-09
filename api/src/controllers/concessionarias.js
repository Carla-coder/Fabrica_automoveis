const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const Concessionarias = {
  
  // 1. Criar uma nova concessionária
  create: async (req, res) => {
    try {
      const { nome, endereco, telefone } = req.body;

      // Validação simples dos dados
      if (!nome || !endereco || !telefone) {
        return res.status(400).json({ error: 'Nome, endereço e telefone são obrigatórios.' });
      }

      const novaConcessionaria = await prisma.concessionaria.create({
        data: {
          nome,
          endereco,
          telefone,
        },
      });

      res.status(201).json(novaConcessionaria); // Retorna a concessionária criada
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar concessionária' });
    }
  },

  // 2. Listar todas as concessionárias
  read: async (req, res) => {
    try {
      const concessionarias = await prisma.concessionaria.findMany();

      res.status(200).json(concessionarias); // Retorna todas as concessionárias
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar concessionárias' });
    }
  },

  // 3. Ler uma concessionária por ID
  readById: async (req, res) => {
    try {
      const { id } = req.params; // ID da concessionária passado como parâmetro de rota

      const concessionaria = await prisma.concessionaria.findUnique({
        where: { id: parseInt(id) },
      });

      if (!concessionaria) {
        return res.status(404).json({ error: 'Concessionária não encontrada.' });
      }

      res.status(200).json(concessionaria); // Retorna a concessionária encontrada
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar concessionária' });
    }
  },

  // 4. Atualizar uma concessionária existente
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, endereco, telefone } = req.body;

      const concessionariaAtualizada = await prisma.concessionaria.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          endereco,
          telefone,
        },
      });

      res.status(200).json(concessionariaAtualizada); // Retorna a concessionária atualizada
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar concessionária' });
    }
  },

  // 5. Deletar uma concessionária
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.concessionaria.delete({
        where: { id: parseInt(id) },
      });

      res.status(204).send(); // Retorna código 204 sem conteúdo, indicando sucesso
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar concessionária' });
    }
  }
};

module.exports = Concessionarias;
