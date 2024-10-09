const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const Alocacao = {
  
  // 1. Criar uma nova alocação
  create: async (req, res) => {
    try {
      const { area, automovelId } = req.body;

      // Validação simples dos dados
      if (!area || !automovelId) {
        return res.status(400).json({ error: 'Área e automóvel são obrigatórios.' });
      }

      const novaAlocacao = await prisma.alocacao.create({
        data: {
          area,
          automovelId,
        },
      });

      res.status(201).json(novaAlocacao); // Retorna o objeto criado
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar alocação' });
    }
  },

  // 2. Listar todas as alocações
  readAll: async (req, res) => {
    try {
      const alocacoes = await prisma.alocacao.findMany({
        include: {
          automovel: true, // Inclui informações do automóvel alocado
        },
      });

      res.status(200).json(alocacoes); // Retorna todas as alocações
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar alocações' });
    }
  },

  // 3. Listar alocações por área específica
  readArea: async (req, res) => {
    try {
      const { area } = req.query; // A área pode vir via query params

      const alocacoes = await prisma.alocacao.findMany({
        where: { area },
        include: {
          automovel: true,
        },
      });

      if (alocacoes.length === 0) {
        return res.status(404).json({ error: 'Nenhuma alocação encontrada para a área especificada.' });
      }

      res.status(200).json(alocacoes); // Retorna as alocações da área
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar alocações da área' });
    }
  },

  // 4. Atualizar uma alocação existente
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { area, automovelId } = req.body;

      const alocacaoAtualizada = await prisma.alocacao.update({
        where: { id: parseInt(id) },
        data: {
          area,
          automovelId,
        },
      });

      res.status(200).json(alocacaoAtualizada); // Retorna a alocação atualizada
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar alocação' });
    }
  },

  // 5. Deletar uma alocação
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.alocacao.delete({
        where: { id: parseInt(id) },
      });

      res.status(204).send(); // Retorna código 204, sem conteúdo, indicando sucesso
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar alocação' });
    }
  }
};

module.exports = Alocacao;
