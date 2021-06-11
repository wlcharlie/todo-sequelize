'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'passwrod', 'password')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'password', 'passwrod')
  }
};
