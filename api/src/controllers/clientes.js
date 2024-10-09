const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const Clientes = {
  
  // 1. Criar um novo cliente
  create: async (req, res) => {
    try {
      const { nome, email, telefone, cpf } = req.body;

      // Validação simples dos dados
      if (!nome || !email || !telefone || !cpf) {
        return res.status(400).json({ error: 'Nome, email, telefone e CPF são obrigatórios.' });
      }

      const novoCliente = await prisma.cliente.create({
        data: {
          nome,
          email,
          telefone,
          cpf,
        },
      });

      res.status(201).json(novoCliente); // Retorna o cliente criado
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  },

  // 2. Listar todos os clientes
  read: async (req, res) => {
    try {
      const clientes = await prisma.cliente.findMany();

      res.status(200).json(clientes); // Retorna todos os clientes
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar clientes' });
    }
  },

  // 3. Ler um cliente por ID
  readById: async (req, res) => {
    try {
      const { id } = req.params; // ID do cliente é passado como parâmetro de rota

      const cliente = await prisma.cliente.findUnique({
        where: { id: parseInt(id) },
      });

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado.' });
      }

      res.status(200).json(cliente); // Retorna o cliente encontrado
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  },

  // 4. Atualizar um cliente existente
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email, telefone, cpf } = req.body;

      const clienteAtualizado = await prisma.cliente.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          email,
          telefone,
          cpf,
        },
      });

      res.status(200).json(clienteAtualizado); // Retorna o cliente atualizado
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  },

  // 5. Deletar um cliente
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.cliente.delete({
        where: { id: parseInt(id) },
      });

      res.status(204).send(); // Retorna código 204, sem conteúdo, indicando sucesso
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
  }
};

module.exports = Clientes;
