import React, { Component, useState, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './tabpanel';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { connect, getTokenBalance, getAmountsIn, swapContract, getEthBalance, addLiquidityContract, getQuota, removeLiquidityContract } from '../Utils/utils';
const wethAbi = require('../Utils/abis/Weth.json');
const maskAbi = require('../Utils/abis/MASK.json');
const pairAbi = require('../Utils/abis/UPair.json');

function Tabse() {
   const [value, setValue] = useState(0);
   const [inputSEValue, setInputSEValue] = useState(0);
   const [inputSESWAPValue, setInputSESWAPValue] = useState(0);
   const [inputSMValue, setInputSMValue] = useState(0);
   const [inputSMSWAPValue, setInputSMSWAPValue] = useState(0);
   const [inputAEValue, setInputAEValue] = useState(0);
   const [inputAESWAPValue, setInputAESWAPValue] = useState(0);
   const [inputAMValue, setInputAMValue] = useState(0);
   const [inputAMSWAPValue, setInputAMSWAPValue] = useState(0);
   const [inputREValue, setInputREValue] = useState(0);
   const [inputRMValue, setInputRMValue] = useState(0);
   const pow = 1000000000000000000;

   const [balanceETHToken, setBalanceETHToken] = useState(0);
   const [balanceMaskToken, setBalanceMaskToken] = useState(0);
   const [balanceLiquidityToken, setBalanceLiquidityToken] = useState(0);
useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const [
        ethBalance,
        maskBalance,
        balLiquidity
      ] = await Promise.all([
        getEthBalance(),
        getTokenBalance("0x554c84c3b44b26d365bb43f9f689b68d5a9edcd5" ,maskAbi),
        getTokenBalance("0x53d7833ac8a9610e1ef38a3961ab6860b6f591a1" ,pairAbi)
      ]);

       setBalanceETHToken(ethBalance);
       setBalanceMaskToken(maskBalance);
        setBalanceLiquidityToken(balLiquidity);
    }
    updateUserInfo();
    const id = setInterval(updateUserInfo, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, []);

     
     const handleChange = (event, value)=> {
    setValue(value);
  };

   const onHandleChangesEthAmount = async (event, value)=> {
    let ethAmount = event.target.value;
        var rgx = /^[0-9]*\.?[0-9]*$/;
        if((ethAmount.match(rgx) == null))
        {
         setInputSEValue(0);
         setInputSESWAPValue(0);
        }else {
            setInputSEValue(ethAmount);
            let aa = Math.round(ethAmount * 1000000000000000000);
            setInputSESWAPValue(ethAmount);
            let amount1 = await getAmountsIns(ethAmount, 1);
            let amount = amount1[1] / pow;
            setInputSMValue(amount.toFixed(18));
            // console.log(amount1);
            setInputSMSWAPValue(amount1[1]);
        }
    };

    const onHandleChangeSMAmount = async (event, value)=> {
    let ethAmount = event.target.value;
        var rgx = /^[0-9]*\.?[0-9]*$/;
        if((ethAmount.match(rgx) == null))
        {
         setInputSMValue(0);
         setInputSMSWAPValue(0);
        }else {
            setInputSMValue(ethAmount);
            let aa = Math.round(ethAmount * 1000000000000000000);
            setInputSMSWAPValue(ethAmount);
            let amount2 = await getAmountsIns(ethAmount, 2);
    let amount = amount2[0] / pow;
            setInputSEValue(amount.toFixed(18));
            // console.log(amount2);
            setInputSESWAPValue(amount2[0]);
        }
    };

    const onHandleChangeAEAmount = async (event, value)=> {
       let ethAmount = event.target.value;
        var rgx = /^[0-9]*\.?[0-9]*$/;
        if((ethAmount.match(rgx) == null))
        {
         setInputAEValue(0);
          setInputAESWAPValue(0);
        }else {
            setInputAEValue(ethAmount);
            let aa = Math.round(ethAmount * 1000000000000000000);
             setInputAESWAPValue(aa);
            let AMAmount = await getQuotas(ethAmount, 1);
            let main = AMAmount;
            AMAmount = AMAmount / pow;
            setInputAMValue(AMAmount.toFixed(18));
            setInputAMSWAPValue(main);
        }
    };

    const onHandleChangeAMAmount = async (event, value)=> {
       let ethAmount = event.target.value;
       var rgx = /^[0-9]*\.?[0-9]*$/;
        if((ethAmount.match(rgx) == null))
        {
    setInputAMValue(0);
     setInputAMSWAPValue(0);
    }else {
         setInputAMValue(ethAmount);
         let aa = Math.round(ethAmount * 1000000000000000000);
          setInputAMSWAPValue(aa);
        let AEAmount = await getQuotas(ethAmount, 2);
           
            let main = AEAmount;
            AEAmount = AEAmount / pow;
             setInputAEValue(AEAmount.toFixed(18));
 setInputAESWAPValue(main);
        }
    };

    const onHandleChangeRMAmount = (event, value)=> {
       let ethAmount = event.target.value;
       if(balanceLiquidityToken < (ethAmount * pow))
       {
           alert("Invalid Liquidity Amount");
       } else {
           setInputRMValue(ethAmount);
       }

    };

 const addLiquidity = async () => {
   let inputAESWAPValue1 = inputAESWAPValue;
   let inputAMSWAPValue1 = inputAMSWAPValue;
    if(inputAESWAPValue.toString().indexOf('.') !== -1)
    inputAESWAPValue1 = Math.round(inputAESWAPValue * 1000000000000000000);
    if(inputAMSWAPValue.toString().indexOf('.') !== -1)
    inputAMSWAPValue1 = Math.round(inputAMSWAPValue * 1000000000000000000);
     console.log(inputAESWAPValue);
    console.log(inputAESWAPValue1);
    console.log(inputAMSWAPValue);
    console.log(inputAMSWAPValue1);
    const liquidity = await addLiquidityContract(inputAESWAPValue1, inputAMSWAPValue1);
  };

   const swapLiquidity = async () => {
    let inputSESWAPValue1 = inputSESWAPValue;
    let inputSMSWAPValue1 = inputSMSWAPValue;
    if(inputSESWAPValue.toString().indexOf('.') !== -1)
    inputSESWAPValue1 = Math.round(inputSESWAPValue * 1000000000000000000);
    if(inputSMSWAPValue.toString().indexOf('.') !== -1)
    inputSMSWAPValue1 = Math.round(inputSMSWAPValue * 1000000000000000000);

    console.log(inputSESWAPValue);
    console.log(inputSESWAPValue1);
    console.log(inputSMSWAPValue);
    console.log(inputSMSWAPValue1);
    const liquidity = await swapContract(inputSESWAPValue1, inputSMSWAPValue1);
  };

   const removeLiquidity = async () => {
    const removeLiquidity = await removeLiquidityContract(inputRMValue);
  };

  const getQuotas = async (inputValue, status) => {
    let quota = await getQuota(inputValue, status);
    console.log(quota);
    return quota;
  };

  const getAmountsIns = async (inputValue, status) => {
    let amount = await getAmountsIn(inputValue, status);
    console.log("amountIn "+ amount);
    return amount;
  };

  const onHandleChangeREAmount = (event, value)=> {
       let ethAmount = event.target.value;
    setInputREValue(ethAmount);
  };

        return (
            <div>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                 >
                    <Tab label="Swap" value = {0} index = {0}/>
                    <Tab label="Add Liquidity" value = {1} index = {1}/>
                    <Tab label="Remove Liquidity" value = {2} index = {2}/>
                </Tabs>
                <TabPanel value = {value} index = {0}>
                <label style={{color: "black"}}> Eth Amount :- {balanceETHToken} </label>
                    <input placeholder = 'Swap ETH Amount' className = 'form-control' value={inputSEValue}
                    onChange={onHandleChangesEthAmount}/>
                    <br/>
                    <label style={{color: "black"}}> Mask Amount :- {balanceMaskToken / pow} </label>
                    <input placeholder = 'Swap MASK Amount' className = 'form-control' value={inputSMValue}
                    onChange={onHandleChangeSMAmount}/>
                    <br/>
                    <button className = 'btn btn-primary btn-lg btn-block' onClick={swapLiquidity}>Swap</button>
                </TabPanel>
                <TabPanel value = {value} index = {1}>
                <label style={{color: "black"}}> Eth Amount :- {balanceETHToken} </label>
                <input placeholder = 'Add ETH Amount' className = 'form-control' value={inputAEValue}
                    onChange={onHandleChangeAEAmount}/>
                    <br/>
                    <label style={{color: "black"}}> Mask Amount :- {balanceMaskToken / pow} </label>
                    <input placeholder = 'Add MASK Amount' className = 'form-control' value={inputAMValue}
                    onChange={onHandleChangeAMAmount}/>
                    <br/>
                    <button className = 'btn btn-primary btn-lg btn-block' onClick={addLiquidity}>Add Liquidity</button>
                    <br/>
                    <label style={{color: "black"}}> Liquidity Amount :- {balanceLiquidityToken / pow} </label>
                </TabPanel>
                <TabPanel value = {value} index = {2}>
                    <input placeholder = 'Remove Liquidity Amount' className = 'form-control' value={inputRMValue}
                    onChange={onHandleChangeRMAmount}/>
                    <br/>
                    <button className = 'btn btn-primary btn-lg btn-block' onClick={removeLiquidity}>Remove Liquidity</button>
                    <br/>
                    <label style={{color: "black"}}> Liquidity Amount :- {balanceLiquidityToken / pow} </label>
                </TabPanel>
            </div>
          );
    
}
 
export default Tabse;