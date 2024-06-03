const { Op } = require("sequelize");
const { Product } = require("../models");

class ProductController {
  static async getProducts(req, res, next) {
    try {
      const { order, sort, search, page } = req.query;
      const option = {
        where: {},
        order: [["createdAt", "DESC"]],
        limit: 15,
      };

      if (sort == "ASC") {
        option.order[0][1] = "ASC";
      }
      let orderByList = ["name", "createdAt", "updatedAt"];
      if (orderByList.includes(order)) {
        option.order[0][0] = order;
      }

      if (search) {
        option.where.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      let limit = 15;
      let pageNumber = 1;
      if (page) {
        if (page.size) {
          limit = page.size;
          option.limit = limit;
        }
        if (page.number) {
          pageNumber = page.number;
          option.offset = limit * (pageNumber - 1);
        }
      }

      const { count, rows } = await Product.findAndCountAll(option);

      const data = {
        page: +pageNumber,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: +limit,
        data: rows,
      };

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        throw { name: "NotFound", message: "Product not found" };
      }

      res.status(200).json({ data: product });
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const newProduct = await Product.create(req.body);

      res
        .status(201)
        .json({ message: "Success add product", data: newProduct });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        throw { name: "NotFound", message: "Product not found" };
      }

      // remove forbiden field
      delete req.body.id;
      console.log(req.body, "<<<< update");
      await product.update(req.body);

      res
        .status(200)
        .json({ message: "Success update product", data: product });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        throw { name: "NotFound", message: "Product not found" };
      }

      await product.destroy();

      res
        .status(200)
        .json({ message: "Success delete product", data: product });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
