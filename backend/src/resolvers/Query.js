const { forwardTo } = require('prisma-binding');
/* https://www.prisma.io/docs/1.15/use-prisma-api/prisma-bindings/forwarding-to-prisma-onq1/
when one of the resolvers in yoga doesn't add any functionaly extra in comparison with the prisma
counterpart, we can use forwardTo
*/
const Query = {
    hi(parent, args, ctx, info) {
        return "Hello"
    },
    // async items(parent, args, ctx, info) {
    //     const items = await ctx.db.query.items();
    //     return items;
    // }
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db'),
    me(parent, args, ctx, info) {
        if(!ctx.request.userId) {
            return null;
        }
        return ctx.db.query.user({
            where: { id: ctx.request.userId },
        }, info);
    }
}

module.exports = Query;