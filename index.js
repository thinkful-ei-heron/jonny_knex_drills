require('dotenv').config();
const knex = require('knex');

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
//searchItembyName('Fish tricks');
//paginateProducts(2);
//itemsAfterDate(2);
totalCostofCategories();