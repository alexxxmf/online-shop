const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');
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
    },
    async users(parent, args, ctx, info) {
        // does user have the permissions to query?
        if(!ctx.request.userId) {
            throw new Error('You must be logged in')
        }
        // if they do, query all users
        hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])
        return ctx.db.query.users({}, info);
    },
    async order(parent, args, ctx, info) {
        if(!ctx.request.userId) {
            throw new Error('You must be logged in')
        }
        
        const order = await ctx.db.query.order({
            where: { id: args.id }
        }, info);

        const ownsOrder = order.user.id === ctx.request.userId;
        const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');

        if (!ownsOrder || !hasPermission) {
            throw new Error('You don\'t have the right permissions!')
        }
        console.log(order)
        return order;
    },
    async orders(parent, args, ctx, info) {
        const { userId } = ctx.request;
        if (!userId) {
            throw new Error('you must be signed in!');
        }
        return ctx.db.query.orders(
            {
                where: {
                    user: { id: userId }
                },
            },
            info
        )
    }
}

module.exports = Query;