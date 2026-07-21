'use strict';
const { Contract } = require('fabric-contract-api');

class VegContract extends Contract {
    async addVegetable(ctx, vegId, name, farmer, location) {
        const txTimestamp = ctx.stub.getTxTimestamp();
        const timestamp = new Date(Number(txTimestamp.seconds) * 1000).toISOString();
        const veg = { id: vegId, name: name, farmer: farmer, location: location, owner: farmer, timestamp: timestamp };
        await ctx.stub.putState(vegId, Buffer.from(JSON.stringify(veg)));
        return JSON.stringify(veg);
    }

    async queryVegetable(ctx, vegId) {
        const vegBytes = await ctx.stub.getState(vegId);
        if (!vegBytes || vegBytes.length === 0) { throw new Error(`ID: ${vegId} ဖြင့် ဟင်းသီးဟင်းရွက်ကို မတွေ့ရှိပါ။`); }
        return vegBytes.toString();
    }

    async transferVegetable(ctx, vegId, newOwner) {
        const vegBytes = await ctx.stub.getState(vegId);
        if (!vegBytes || vegBytes.length === 0) { throw new Error(`ID: ${vegId} ဖြင့် ဟင်းသီးဟင်းရွက်ကို မတွေ့ရှိပါ။`); }
        const veg = JSON.parse(vegBytes.toString());
        veg.owner = newOwner;
        
        const txTimestamp = ctx.stub.getTxTimestamp();
        veg.timestamp = new Date(Number(txTimestamp.seconds) * 1000).toISOString();
        
        await ctx.stub.putState(vegId, Buffer.from(JSON.stringify(veg)));
        return JSON.stringify(veg);
    }

    // --- New History Function ---
    async getVegetableHistory(ctx, vegId) {
        const iterator = await ctx.stub.getHistoryForKey(vegId);
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                let record = JSON.parse(res.value.value.toString('utf8'));
                allResults.push({
                    txId: res.value.txId,
                    timestamp: new Date(Number(res.value.timestamp.seconds) * 1000).toISOString(),
                    record: record
                });
            }
            if (res.done) {
                await iterator.close();
                return JSON.stringify(allResults);
            }
        }
    }
}
module.exports = VegContract;
