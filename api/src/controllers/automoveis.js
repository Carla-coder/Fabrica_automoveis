const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const Automoveis = {
  
  // 1. Criar um novo automóvel
  create: async (req, res) => {
    try {
      const { modelo, marca, ano, cor, areaId } = req.body;

      // Validação simples dos dados
      if (!modelo || !marca || !ano || !cor) {
        return res.status(400).json({ error: 'Modelo, marca, ano e cor são obrigatórios.' });
      }

      const novoAutomovel = await prisma.automovel.create({
        data: {
          modelo,
          marca,
          ano: parseInt(ano),
          cor,
          areaId: areaId ? parseInt(areaId) : null, // Relaciona o automóvel com uma área, se for fornecido
        },
      });

      res.status(201).json(novoAutomovel); // Retorna o objeto criado
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar automóvel' });
    }
  },

  // 2. Listar todos os automóveis
  read: async (req, res) => {
    try {
      const automoveis = await prisma.automovel.findMany({
        include: {
          area: true, // Inclui informações da área onde o automóvel está alocado
        },
      });

      res.status(200).json(automoveis); // Retorna todos os automóveis
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar automóveis' });
    }
  },

  // 3. Listar automóveis por área específica
  readArea: async (req, res) => {
    try {
      const { area } = req.params; // A área é passada como parâmetro de rota

      const automoveis = await prisma.automovel.findMany({
        where: { areaId: parseInt(area) }, // Filtra por área
        include: {
          area: true, // Inclui informações da área
        },
      });

      if (automoveis.length === 0) {
        return res.status(404).json({ error: 'Nenhum automóvel encontrado para a área especificada.' });
      }

      res.status(200).json(automoveis); // Retorna os automóveis da área
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar automóveis da área' });
    }
  },

  // 4. Atualizar um automóvel existente
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { modelo, marca, ano, cor, areaId } = req.body;

      const automovelAtualizado = await prisma.automovel.update({
        where: { id: parseInt(id) },
        data: {
          modelo,
          marca,
          ano: parseInt(ano),
          cor,
          areaId: areaId ? parseInt(areaId) : null,
        },
      });

      res.status(200).json(automovelAtualizado); // Retorna o automóvel atualizado
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar automóvel' });
    }
  },

  // 5. Deletar um automóvel
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.automovel.delete({
        where: { id: parseInt(id) },
      });

      res.status(204).send(); // Retorna código 204, sem conteúdo, indicando sucesso
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar automóvel' });
    }
  }
};

module.exports = Automoveis;
