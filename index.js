require('dotenv').config();
const knex = require('knex');
const ShoppingListService = require('./shoppinglistservice');
const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});
function searchItembyName(Name) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where(
            'name',
            'ILIKE',
            `${Name}`
        )
        .then(result => console.log(result));
}
function paginateProducts(page) {
    const productsPerPage = 6;
    const offset = productsPerPage * (page - 1);
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => console.log(result));
}
function itemsAfterDate(daysAgo) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
        .then(result => console.log(result));
}
function totalCostofCategories() {
    knexInstance
        .select('category')
        .from('shopping_list')
        .groupBy('category')
        .sum({total: 'price'})
        .then(result => console.log(result))
}
//
//paginateProducts(2);
//itemsAfterDate(2);
ShoppingListService.getAllObjs(knexInstance)
    .then(objs => console.log(objs))
    .then(() =>
        ShoppingListService.insertProduct(knexInstance, {
            name: 'Fish Memes',
            price: 420.69,
            checked: false,
            category: 'Main',
            date_added: new Date(),
        })
    )
    .then(newProduct => {
        return ShoppingListService.updateProduct(
            knexInstance,
            newProduct.id,
            { name: 'Fish Lemes' }
        ).then(() => ShoppingListService.getById(knexInstance, newProduct.id)).then(()=>searchItembyName('Fish Lemes'))
    });
    // .then(product => {
    //     return ShoppingListService.deleteProduct(knexInstance, product.id)
    // });

//totalCostofCategories();