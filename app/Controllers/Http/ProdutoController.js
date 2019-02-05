"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with produtos
 */

const Produto = use("App/Models/Produto");

class ProdutoController {
  /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const produtos = await Produto.query()
      .with("images")
      .fetch();

    return response.status(200).json(produtos);
  }

  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["nome", "preco", "descricao"]);

    await Produto.create({ ...data })
      .then(result => {
        return response.status(201).json(result);
      })
      .catch(err => {
        return response.status(400).json();
      });
  }

  /**
   * Display a single produto.
   * GET produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const produto = await Produto.findOrFail(params.id);

    await produto
      .load("images")
      .then(result => {
        return response.status(200).json(result);
      })
      .catch(err => {
        return response.status(404).json();
      });
  }

  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const produto = await Produto.findOrFail(params.id);

    const data = request.only(["nome", "descricao", "preco"]);

    produto.merge(data);

    await produto
      .save(produto)
      .then(() => {
        return response.status(200).json(produto);
      })
      .catch(err => {
        return response.status(400).json();
      });
  }

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const produto = await Produto.findOrFail(params.id);

    await produto.delete();
  }
}

module.exports = ProdutoController;
