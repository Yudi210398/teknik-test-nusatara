export const error = (req, res, next) => {
  try {
    const error = new Error(`endpoint tidak ditemukan`);
    throw error;
  } catch (err) {
    console.log(err);
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
