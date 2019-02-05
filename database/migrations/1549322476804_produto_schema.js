"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProdutoSchema extends Schema {
  up() {
    this.create("produtos", table => {
      table.increments();
      table.string("nome", 120).notNullable();
      table.float("preco").notNullable();
      table.string("descricao", 240);
      table.string("image");
      table.timestamps();
    });
  }

  down() {
    this.drop("produtos");
  }
}

module.exports = ProdutoSchema;
