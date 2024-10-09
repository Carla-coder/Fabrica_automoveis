const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const Vendas = {

  // 1. Criar uma nova venda
  create: async (req, res) => {
    try {
      const { clienteId, automovelId, concessionariaId, valorVenda, dataVenda } = req.body;

      // Validação simples dos dados
      if (!clienteId || !automovelId || !concessionariaId || !valorVenda || !dataVenda) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      const novaVenda = await prisma.venda.create({
        data: {
          clienteId: parseInt(clienteId),
          automovelId: parseInt(automovelId),
          concessionariaId: parseInt(concessionariaId),
          valorVenda: parseFloat(valorVenda),
          dataVenda: new Date(dataVenda),
        },
      });

      res.status(201).json(novaVenda); // Retorna a venda criada
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar venda' });
    }
  },

  // 2. Listar todas as vendas
  read: async (req, res) => {
    try {
      const vendas = await prisma.venda.findMany({
        include: {
          cliente: true, // Incluir dados do cliente relacionado à venda
          automovel: true, // Incluir dados do automóvel relacionado à venda
          concessionaria: true // Incluir dados da concessionária relacionada à venda
        },
      });

      res.status(200).json(vendas); // Retorna todas as vendas
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar vendas' });
    }
  },

  // 3. Ler uma venda por ID
  readById: async (req, res) => {
    try {
      const { id } = req.params; // ID da venda passado como parâmetro de rota

      const venda = await prisma.venda.findUnique({
        where: { id: parseInt(id) },
        include: {
          cliente: true,
          automovel: true,
          concessionaria: true
        },
      });

      if (!venda) {
        return res.status(404).json({ error: 'Venda não encontrada.' });
      }

      res.status(200).json(venda); // Retorna a venda encontrada
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar venda' });
    }
  },

  // 4. Atualizar uma venda existente
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { clienteId, automovelId, concessionariaId, valorVenda, dataVenda } = req.body;

      const vendaAtualizada = await prisma.venda.update({
        where: { id: parseInt(id) },
        data: {
          clienteId: parseInt(clienteId),
          automovelId: parseInt(automovelId),
          concessionariaId: parseInt(concessionariaId),
          valorVenda: parseFloat(valorVenda),
          dataVenda: new Date(dataVenda),
        },
      });

      res.status(200).json(vendaAtualizada); // Retorna a venda atualizada
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar venda' });
    }
  },

  // 5. Deletar uma venda
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.venda.delete({
        where: { id: parseInt(id) },
      });

      res.status(204).send(); // Retorna código 204 sem conteúdo, indicando sucesso
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar venda' });
    }
  }
};

module.exports = Vendas;












