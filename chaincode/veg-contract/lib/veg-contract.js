'use strict';
const { Contract } = require('fabric-contract-api');

class VegContract extends Contract {
    async addVegetable(ctx, vegId, name, farmer, location) {
        // Fabric ရဲ့ တသမတ်တည်းဖြစ်သော Transaction Timestamp ကို ယူသုံးခြင်း
        const txTimestamp = ctx.stub.getTxTimestamp();
        const timestamp = new Date(Number(txTimestamp.seconds) * 1000).toISOString();

        const veg = {
            id: vegId,
            name: name,
            farmer: farmer,
            location: location,
            owner: farmer,
            timestamp: timestamp
        };
        await ctx.stub.putState(vegId, Buffer.from(JSON.stringify(veg)));
        return JSON.stringify(veg);
    }

    async queryVegetable(ctx, vegId) {
        const vegBytes = await ctx.stub.getState(vegId);
        if (!vegBytes || vegBytes.length === 0) {
            throw new Error(`ID: ${vegId} ဖြင့် ဟင်းသီးဟင်းရွက်ကို မတွေ့ရှိပါ။`);
        }
        return vegBytes.toString();
    }

    async transferVegetable(ctx, vegId, newOwner) {
        const vegBytes = await ctx.stub.getState(vegId);
        if (!vegBytes || vegBytes.length === 0) {
            throw new Error(`ID: ${vegId} ဖြင့် ဟင်းသီးဟင်းရွက်ကို မတွေ့ရှိပါ။`);
        }
        const veg = JSON.parse(vegBytes.toString());
        veg.owner = newOwner;
        await ctx.stub.putState(vegId, Buffer.from(JSON.stringify(veg)));
        return JSON.stringify(veg);
    }
}
module.exports = VegContract;
