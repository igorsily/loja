"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Produto extends Model {
  image() {
    return this.belongsTo("App/Models/Image");
  }
}

module.exports = Produto;
