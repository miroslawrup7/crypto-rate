import React from 'react';
import './CryptoList.css'

let lastTrend = [];

const CryptoList = (props) => {
 
    let checkRefresh = false;

    props.cryptoList.forEach(function(cryptoObj) {

        let newCurrencyObj = cryptoObj;
        let oldCurrencyObj = props.oldCryptoList.find(el => el.symbol === newCurrencyObj.symbol);

        if (oldCurrencyObj !== undefined) {
            if (newCurrencyObj.last !== oldCurrencyObj.last) {
                checkRefresh = true;
                lastTrend = [];
            }
        }
    });

    let liElements = props.cryptoList.map((cryptoObj) => {

        let newCurrencyObj = cryptoObj;
        
        let trendSymbol = "";
        let trendClass = "";

        if (checkRefresh === true) {

            let oldCurrencyObj = props.oldCryptoList.find(el => el.symbol === newCurrencyObj.symbol);

            if (oldCurrencyObj !== undefined) {
                if (newCurrencyObj.last > oldCurrencyObj.last) {
                    trendSymbol = " " + String.fromCharCode(8593);
                    trendClass = "rate-up";
                    checkRefresh = true;
                    lastTrend.push({'symbol': newCurrencyObj.symbol, 'trendSymbol': trendSymbol, 'trendClass': trendClass})
                } else if (newCurrencyObj.last < oldCurrencyObj.last) {
                    trendSymbol = " " + String.fromCharCode(8595);
                    trendClass = "rate-down";
                    checkRefresh = true;
                    lastTrend.push({'symbol': newCurrencyObj.symbol, 'trendSymbol': trendSymbol, 'trendClass': trendClass})
                } else if (newCurrencyObj.last === oldCurrencyObj.last) {
                    trendSymbol = " " + String.fromCharCode(8596);
                    trendClass = "rate-nochange";
                    lastTrend.push({'symbol': newCurrencyObj.symbol, 'trendSymbol': trendSymbol, 'trendClass': trendClass})
                }
            }

        } else {
            
            if (lastTrend.length > 0) {

                let oldCurrencyObj = lastTrend.find(el => el.symbol === newCurrencyObj.symbol);

                if (oldCurrencyObj !== undefined) {
                    trendSymbol = oldCurrencyObj.trendSymbol;
                    trendClass = oldCurrencyObj.trendClass;
                }
            }
        }

        return (
            <li key={cryptoObj.symbol}>
                <span className="crypto-label">Last rate:</span>
                <span className={"crypto-rate " + trendClass}>{newCurrencyObj.last}{trendSymbol}</span>
                <span className="currency-ticker">{newCurrencyObj.symbol}</span>
            </li>
        );
    });

    return (
        <div className="crypto-list">
            <ul className="list">
                {liElements}
            </ul>
        </div>
    );
}

export default CryptoList;