module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'midas',
  database: 'midascrud',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
