const { body } = require('express-validator');

exports.validateOrder = [
  body('items')
    .isArray({ min: 1 }).withMessage('Debe incluir al menos un producto.')
    .custom(items => items.every(i => i.product && i.quantity > 0))
    .withMessage('Cada ítem debe tener un producto y una cantidad válida.'),
  body('total')
    .isNumeric().withMessage('Total debe ser un número.')
    .custom(value => value > 0).withMessage('Total debe ser mayor a 0.')
];