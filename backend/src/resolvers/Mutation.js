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
    }
}

module.exports = Mutation;