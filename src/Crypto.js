import React, {Component} from 'react';
import './Crypto.css'
import axios from 'axios';
import CryptoList from './CryptoList';

class Crypto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldCryptoList: [],
            cryptoList: [],
            filteredCryptoList: [],
        };
    }
    
    getCryptoData = () => {
        axios.get('https://blockchain.info/ticker', {mode: 'cors'})
        .then(res => {
            let newCryptoList = [];
            for (let element in res.data) {
                newCryptoList.push(res.data[element]);
            }

            this.setState((prevState) => {
    
                return({
                    oldCryptoList: prevState.cryptoList,
                    cryptoList: newCryptoList,
                })
                
            });

            this.filterCryptoList();
        });
        
    }

    componentDidMount() {
        this.getCryptoData();
        this.rateRefresh = setInterval(() => this.getCryptoData(), 5000);
    }

    
    componentWillUnmount() {
        clearInterval(this.rateRefresh);
    }

    filterCryptoList = () => {
        this.inputFilter.value = this.inputFilter.value.trim().toUpperCase();
        this.setState((prevState) => {
            
            let newFilteredCryptoList = prevState.cryptoList.filter((elem) => {
                return(elem.symbol.includes(this.inputFilter.value));
            });
           
            return({filteredCryptoList: newFilteredCryptoList});

        });
    }
    
    render() {
        return(
            <div className="crypto">
                <input ref={element => this.inputFilter = element} onChange={this.filterCryptoList} type="text" placeholder="Filter"></input>
                <CryptoList cryptoList={this.state.filteredCryptoList} oldCryptoList = {this.state.oldCryptoList} />
            </div>
        );
    }
}

export default Crypto;
