import Web3 from 'web3';
import BigNumber from 'bignumber.js';
const pairAbi = require('./abis/UPair.json');
const routerAbi = require('./abis/URouter.json');
const factoryAbi = require('./abis/UFactory.json');
const wethAbi = require('./abis/Weth.json');
const maskAbi = require('./abis/MASK.json');

let account = '';

export const connect = async () => {
  window.web3 = new Web3(window.ethereum);
  let addresses = await window.web3.eth.getAccounts();
  if (!addresses.length) {
    try {
      addresses = await window.ethereum.enable();
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  if(addresses.length > 0)
  {
    account = addresses[0].toLowerCase();
  }
  return addresses.length ? addresses[0].toLowerCase() : null;
};

let web3;
// eslint-disable-next-line no-undef
if (window.ethereum !== undefined) {
  // eslint-disable-next-line no-undef
  web3 = new Web3(ethereum);
}

// eslint-disable-next-line consistent-return
export const checkConnectedAndGetAddress = async () => {
  let addresses = await window.web3.eth.getAccounts();
  if (!addresses.length) {
    try {
      addresses = await window.ethereum.enable();
      // eslint-disable-next-line no-empty
    } catch (e) { }
  }

  return addresses[0];
};

export const getEthBalance = async() => {
  if (account === '') return '0';
  let balanceEth = 0;
await web3.eth.getBalance(account, (err, balance) => {balanceEth = web3.utils.fromWei(balance)});
return balanceEth;
}

/**
 *
 * @param {string} token address
 * @param {string} account address
 * @return {Promise<string>}
 */
export const getTokenBalance = async (token, abi) => {
  if (account === '') return '0';
  const tokenContract = new web3.eth.Contract(abi, token);
   console.log("inputAEValue");
  return tokenContract.methods.balanceOf(account).call();
};

/**
 *
 * @param {string} token
 * @param {string} account
 * @param {string} spender
 * @return {Promise<string>}
 */
export const getTokenAllowance = async (token, account, spender, abi) => {
  const tokenContract = new web3.eth.Contract(abi, token);
  return tokenContract.methods.allowance(account, spender).call();
};

export const getQuota = async (inputAEValue, status) => {
  var rgx = /^[0-9]*\.?[0-9]*$/; 
  if((inputAEValue.match(rgx) == null || inputAEValue == 0))
  return '0';
  inputAEValue = inputAEValue * 1000000000000000000;
  inputAEValue = Math.round(inputAEValue);
  const tokenContract1 = new web3.eth.Contract(factoryAbi, "0x4a3D2a766817c1498051F7ceB0D8fcfa7fedCD6f");
  const pair = await tokenContract1.methods.getPair("0x554c84c3b44b26d365bb43f9f689b68d5a9edcd5", "0xd0A1E359811322d97991E03f863a0C30C2cF029C").call();
  if(pair == "0x0000000000000000000000000000000000000000")
  return '0';
  const tokenContract2 = new web3.eth.Contract(pairAbi, "0x53d7833ac8a9610e1ef38a3961ab6860b6f591a1");
  const reserve = await tokenContract2.methods.getReserves().call();
  const tokenContract = new web3.eth.Contract(routerAbi, "0x44da2893eB4AEf2ed28fE2a333f4e9BF7949d92C");
  const reserve1 = reserve._reserve1;
  const reserve0 = reserve._reserve0;
  console.log(inputAEValue);
  if(status == 1)
  return tokenContract.methods.quote(inputAEValue.toString(), new BigNumber(reserve1), new BigNumber(reserve0)).call();
  if(status == 2)
  return tokenContract.methods.quote(new BigNumber(inputAEValue), new BigNumber(reserve0), new BigNumber(reserve1)).call();
};

export const getAmountsIn = async (inputAEValue, status) => {
  var rgx = /^[0-9]*\.?[0-9]*$/; 
  if((inputAEValue.match(rgx) == null || inputAEValue == 0))
  return '0';
  inputAEValue = inputAEValue * 1000000000000000000;
  inputAEValue = Math.round(inputAEValue);
  const tokenContract1 = new web3.eth.Contract(factoryAbi, "0x4a3D2a766817c1498051F7ceB0D8fcfa7fedCD6f");
  const pair = await tokenContract1.methods.getPair("0x554c84c3b44b26d365bb43f9f689b68d5a9edcd5", "0xd0A1E359811322d97991E03f863a0C30C2cF029C").call();
  if(pair == "0x0000000000000000000000000000000000000000")
  return '0';
  const tokenContract = new web3.eth.Contract(routerAbi, "0x44da2893eB4AEf2ed28fE2a333f4e9BF7949d92C");
  
  if(status == 1)
  return tokenContract.methods.getAmountsOut( new BigNumber(inputAEValue), ["0xd0a1e359811322d97991e03f863a0c30c2cf029c", "0x554c84c3b44b26d365bb43f9f689b68d5a9edcd5"]).call();
  if(status == 2)
  return tokenContract.methods.getAmountsIn( new BigNumber(inputAEValue), ["0xd0a1e359811322d97991e03f863a0c30c2cf029c", "0x554c84c3b44b26d365bb43f9f689b68d5a9edcd5"]).call();
};

export const addLiquidityContract = async (inputAEValue, inputAMValue) => {
  var rgx = /^[0-9]*\.?[0-9]*$/; 
  if((inputAEValue == null))
  return '0';
  if (account === '') return '0';
  const maskAllowance = await getTokenAllowance("0x554c84c3b44b26d365bb43f9f689b68d5a9edcd5", account, "0x44da2893eB4AEf2ed28fE2a333f4e9BF7949d92C", maskAbi);
  if(maskAllowance < inputAMValue)
  {
    const oToken = new window.web3.eth.Contract(maskAbi, "0x554c84c3b44b26d365bb43f9f689b68d5a9edcd5");
    await oToken.methods
    .approve("0x44da2893eB4AEf2ed28fE2a333f4e9BF7949d92C", "100000000000000000000000000000000")
    .send({ from: account })
    .on('transactionHash', (hash) => {
      console.log(hash);
    });
  }

  let mainMask = await nonExpon(inputAMValue);
  let main95Mask = await nonExpon(Math.round(inputAMValue * 95 / 100));
  let mainEth = await nonExpon(inputAEValue);
  let main95Eth = await nonExpon(Math.round(inputAEValue * 95 / 100));

  const oToken1 = new window.web3.eth.Contract(routerAbi, "0x44da2893eB4AEf2ed28fE2a333f4e9BF7949d92C");
  await oToken1.methods
    .addLiquidityETH("0x554c84c3b44b26d365bb43f9f689b68d5a9edcd5", mainMask.toString(), main95Mask.toString(), main95Eth.toString(), account, Math.round((new Date()).getTime() / 1000)+1000)
    .send({ from: account, value:   new BigNumber(mainEth) })
    .on('transactionHash', (hash) => {
      console.log(hash);
    });
};


export const removeLiquidityContract = async (inputAEValue) => {
  var rgx = /^[0-9]*\.?[0-9]*$/; 
  if((inputAEValue.match(rgx) == null))
  return '0';
  inputAEValue = inputAEValue * 1000000000000000000;
  inputAEValue = Math.round(inputAEValue);
  if (account === '') return '0';
  const maskAllowance = await getTokenAllowance("0x53d7833ac8a9610e1ef38a3961ab6860b6f591a1", account, "0x44da2893eB4AEf2ed28fE2a333f4e9BF7949d92C", pairAbi);
  if(maskAllowance < inputAEValue)
  {
    const oToken = new window.web3.eth.Contract(pairAbi, "0x53d7833ac8a9610e1ef38a3961ab6860b6f591a1");
    await oToken.methods
    .approve("0x44da2893eB4AEf2ed28fE2a333f4e9BF7949d92C", "100000000000000000000000000000000")
    .send({ from: account })
    .on('transactionHash', (hash) => {
      console.log(hash);
    });
  }

   let mainEth = await nonExpon(inputAEValue);
  console.log(mainEth);
  const oToken1 = new window.web3.eth.Contract(routerAbi, "0x44da2893eB4AEf2ed28fE2a333f4e9BF7949d92C");
  await oToken1.methods
    .removeLiquidityETH("0x554c84c3b44b26d365bb43f9f689b68d5a9edcd5", mainEth.toString(), (new BigNumber(0)), (new BigNumber(0)), account, Math.round((new Date()).getTime() / 1000)+1000)
    .send({ from: account })
    .on('transactionHash', (hash) => {
      console.log(hash);
    });
};

export const swapContract = async (inputAEValue, inputRMValue) => {
  var rgx = /^[0-9]*\.?[0-9]*$/; 
if((inputAEValue == 0) || inputRMValue == 0)
  return '0';  
  if (account === '') return '0';
  const maskAllowance = await getTokenAllowance("0x53d7833ac8a9610e1ef38a3961ab6860b6f591a1", account, "0x44da2893eB4AEf2ed28fE2a333f4e9BF7949d92C", pairAbi);
  if(maskAllowance < inputAEValue)
  {
    const oToken = new window.web3.eth.Contract(maskAbi, "0x554c84c3b44b26d365bb43f9f689b68d5a9edcd5");
    await oToken.methods
    .approve("0x44da2893eB4AEf2ed28fE2a333f4e9BF7949d92C", "100000000000000000000000000000000")
    .send({ from: account })
    .on('transactionHash', (hash) => {
      console.log(hash);
    });
  }

  let mainMask = await nonExpon(inputRMValue);
  let mainEth = await nonExpon(inputAEValue);

  const oToken1 = new window.web3.eth.Contract(routerAbi, "0x44da2893eB4AEf2ed28fE2a333f4e9BF7949d92C");
  await oToken1.methods
    .swapExactETHForTokens(mainMask.toString(), ["0xd0a1e359811322d97991e03f863a0c30c2cf029c", "0x554c84c3b44b26d365bb43f9f689b68d5a9edcd5"], account, Math.round((new Date()).getTime() / 1000)+1000)
    .send({ from: account, value:  new BigNumber(mainEth)})
    .on('transactionHash', (hash) => {
      console.log(hash);
    });
};

export const nonExpon = async (n) => {
var sign = +n < 0 ? "-" : "",
            toStr = n.toString();
    if(n.toString().indexOf('.') !== -1)
    {
        var [lead,decimal,pow] = n.toString()
            .replace(/^-/,"")
            .replace(/^([0-9]+)(e.*)/,"$1.$2")
            .split(/e|\./);
        return  +pow < 0 
            ? sign + "0." + "0".repeat(Math.max(Math.abs(pow)-1 || 0, 0)) + lead + decimal
            : sign + lead + (+pow >= decimal.length ? (decimal + "0".repeat(Math.max(+pow-decimal.length || 0, 0))) : (decimal.slice(0,+pow)+"."+decimal.slice(+pow)))
    } else {
      return n;
    }
}

/**
 * ERC20 Utilities
 */

// export const approve = async (tokenAddr, spender, amt = UINT256_MAX) => {
//   const account = await checkConnectedAndGetAddress();
//   const oToken = new window.web3.eth.Contract(testnetUSDCAbi, tokenAddr);
//   await oToken.methods
//     .approve(spender, amt)
//     .send({ from: account })
//     .on('transactionHash', (hash) => {
//       notify.hash(hash);
//     });
// };