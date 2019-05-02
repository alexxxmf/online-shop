const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutation = {
    async createItem(parent, args, ctx, info) {
        const item = await ctx.db.mutation.createItem({
            data: { ...args }
        }, info); 
        return item;
    },
    updateItem(parent, args, ctx, info) {
        const updates = { ...args };
        // removes the id from updates because we want to avoid
        // updating it
        delete updates.id;
        return ctx.db.mutation.updateItem(
            {
                data: updates,
                where: {
                    id: args.id
                }
            },
            info
        );
    },
    async deleteItem(parent, args, ctx, info) {
        const where = { id: args.id };
        // 1. find the item
        const item = await ctx.db.query.item({ where }, `{ id title user { id }}`);
        // 2. Check if they own that item, or have the permissions
        const ownsItem = item.user.id === ctx.request.userId;
        const hasPermissions = ctx.request.user.permissions.some(permission =>
          ['ADMIN', 'ITEMDELETE'].includes(permission)
        );
    
        if (!ownsItem && !hasPermissions) {
          throw new Error("You don't have permission to do that!");
        }
    
        // 3. Delete it!
        return ctx.db.mutation.deleteItem({ where }, info);
      },
      async signup(parent, args, ctx, info) {
        // lowercase their email
        args.email = args.email.toLowerCase();
        // hash their password
        const password = await bcrypt.hash(args.password, 10);
        // create the user in the database
        const user = await ctx.db.mutation.createUser(
          {
            data: {
              ...args,
              password,
              permissions: { set: ['USER'] },
            },
          },
          info
        );
        // create the JWT token for them
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // We set the jwt as a cookie on the response
        ctx.response.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });
        return user;
      },
}

module.exports = Mutation;