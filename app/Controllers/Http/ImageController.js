const Produto = use("App/Models/Produto");
const Helpers = use("Helpers");

class ImageController {
  /**
   * Create/save a new image.
   * POST images
   */
  async store({ params, request }) {
    const produto = await Produto.findOrFail(params.id);

    const image = request.file("image", {
      types: ["image"],
      size: "10mb"
    });

    await image.move(Helpers.tmpPath("uploads"), file => {
      name: `${produto.nome}-${file.clientName}`;
    });

    if (!image.moved()) {
      console.log("entoru no erro");
      return image.error();
    }

    await Promise.all(
      image
        .movedList()
        .map(image => produto.image().create({ path: image.fileName }))
    );
  }
}
module.exports = ImageController;
