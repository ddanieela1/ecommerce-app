import db from '../utils/db';

const getError = (err) => {
  return err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;
};

const onError = async (err, req, res, next) => {
  await db.disconnect();
  res.status(500).send({ message: getError(err) });
};

export { getError, onError };
