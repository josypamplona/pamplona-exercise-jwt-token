module.exports = (req, res, next) => {
    const { user } = req.locals;

    if (!user) {
        res.status(401).json({ error: { message: 'The endpoint requires authentication' } });
      }
      if (!user) {
        res.status(401).json({ error: { message: 'Restricted access' } });
      }
      next();
};