import HttpError from "../init/http-error.js";
import Product from "../model/produk.js";

export const createProduk = async (req, res, next) => {
  try {
    const { title, price, imageUrl, description } = req.body;

    const data = await Product.create({ title, price, imageUrl, description });

    await res.status(200).json({
      pesan: "sukses bikin data",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const findAllData = async (req, res, next) => {
  try {
    const getData = await Product.findAll();

    await res.status(200).json({
      pesan: "sukses ambil  data",
      getData,
    });
  } catch (err) {
    next(err);
  }
};

export const findGetId = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const getData = await Product.findAll({ where: { title: "Baju" } });
    const getData = await Product.findByPk(id);
    if (!getData) throw new HttpError("Data Tidak ada ", 404);
    await res.status(200).json({
      pesan: "sukses ambil  data",
      getData,
    });
  } catch (err) {
    next(err);
  }
};

export const postEdit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, price, imageUrl, description } = req.body;
    const data = await Product.findByPk(id);
    data.title = title;
    data.price = price;
    data.imageUrl = imageUrl;
    data.description = description;
    await data.save();
    await res.status(200).json({
      pesan: "berhasil edit  data",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProduk = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Product.findByPk(id);

    await data.destroy();
    await res.status(200).json({
      pesan: "berhasil delete  data",
      data,
    });
  } catch (err) {
    next(err);
  }
};
