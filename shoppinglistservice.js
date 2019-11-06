const ShoppinglistService = {
    getAllObjs(knex) {
        return knex.select('*').from('shopping_list')
    },
    insertProduct(knex, newProduct) {
        return knex
            .insert(newProduct)
            .into('shopping_list')
            .returning('*')
            .then(rows => rows[0])
    },
    getById(knex, id) {
        return knex.from('shopping_list').select('*').where('id', id).first()
    },
    deleteProduct(knex, id) {
        return knex('shopping_list')
            .where({ id })
            .delete()
    },
    updateProduct(knex, id, newProductFields) {
        return knex('shopping_list')
            .where({ id })
            .update(newProductFields)
    },
};

module.exports = ShoppinglistService;