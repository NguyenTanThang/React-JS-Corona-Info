import React, { Component } from 'react';
import axios from "axios";
import {countriesURL, summaryURL} from "../../config/config";
import paginate from "../../utils/paginate";

import CountryItem from "./CountryItem";
import Pagination from "../partial/Pagination";

export default class CountryList extends Component {
    state = {
        countriesList: [],
        countriesSummaryList: [],
        constantCountriesSummaryList: [],
        countrySearchString: '',
        currentPage: 1
    }

    changeCurrentPage = (pageNum) => {
        this.setState({
            currentPage: pageNum
        })
    }

    onSearchCountriesName = (e) => {
        console.log(e)

        this.setState({
            countrySearchString: e.target.value.replace(/\s/g, ""),
            countriesSummaryList: this.state.constantCountriesSummaryList.filter((constantCountriesSummaryItem) => {
                return constantCountriesSummaryItem.Country.replace(/\s/g, "").toLowerCase().includes(e.target.value.replace(/\s/g, "").toLowerCase())
            })
        })
    }

    async componentDidMount(){
        try {
            
            let res = await axios.get(countriesURL);
            let countriesList = res.data;
            res = await axios.get(summaryURL);
            let countriesSummaryList = res.data.Countries;

            countriesSummaryList = countriesSummaryList.sort((oldObject, newObject) => {
                if (newObject.TotalConfirmed > oldObject.TotalConfirmed) return 1;
                if (newObject.TotalConfirmed < oldObject.TotalConfirmed) return -1;

                return 0
            })

            this.setState({
                countriesList,
                countriesSummaryList,
                constantCountriesSummaryList: countriesSummaryList
            }, () => {
                console.log(this.state.countriesList)
                console.log(this.state.countriesSummaryList)
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const pageObject = paginate(this.state.countriesSummaryList.length, this.state.currentPage, 6, 5)

        const countrySummaryList = this.state.countriesSummaryList.slice(pageObject.startIndex, pageObject.endIndex + 1).map(countrySummaryItem => {
            return <CountryItem key={countrySummaryItem.Country} countrySummaryItem={countrySummaryItem}/>
        })

        return (
            <div className="container">
                <div className="search-form-container">
                    <form>
                        <label>Your Countries Name:</label>
                        <input type="text" placeholder="Your Countries Name" value={this.state.countrySearchString} onChange={this.onSearchCountriesName} className="form-control"/>                    
                    </form>
                </div>

                <div className="row justify-content-around">
                    {countrySummaryList}
                </div>

                <div className="container pagination-container">
                    <Pagination pageObject={pageObject} changeCurrentPage={this.changeCurrentPage}/>
                </div>
            </div>
        )
    }
}
