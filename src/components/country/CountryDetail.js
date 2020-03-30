import React, { Component } from 'react';
import axios from 'axios';
import {getCountrySummary, summaryURL} from "../../config/config";
import BarChartSummary from "../partial/BarChartSummary";

export default class CountryDetail extends Component {

    state = {
        countrySummaryItem: [],
        countryConfirmedCases: [],
        countryRecoveredCases: [],
        countryDeathsCases: [],
        countryConfirmedDate: [],
        countrySlug: ''
    }

    async componentDidMount() {
        const {country_slug} = this.props.match.params;

        let res = await axios.get(summaryURL)
            let countrySummaryItem = res.data.Countries.filter(item => {
                return item.Slug === country_slug;
            })[0]

            this.setState({
                countrySummaryItem
            })

        if (country_slug !== "us" || country_slug !== "china"){
            res = await axios.get(getCountrySummary(country_slug, "recovered"))
            let countryRecoveredCases = res.data;
            countryRecoveredCases = countryRecoveredCases.map(item => {
                return item.Cases
            })
    
            res = await axios.get(getCountrySummary(country_slug, "confirmed"))
            let countryConfirmedCases = res.data;
            countryConfirmedCases = countryConfirmedCases.map(item => {
                return item.Cases
            })
    
            res = await axios.get(getCountrySummary(country_slug, "deaths"))
            let countryDeathsCases = res.data;
            countryDeathsCases = countryDeathsCases.map(item => {
                return item.Cases
            })
    
            let countryConfirmedDate = res.data;
            countryConfirmedDate = countryConfirmedDate.map(item => {
                const date = new Date(item.Date)
                const dateCombindation = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
                return dateCombindation
            })
    
            this.setState({
                countrySummaryItem,
                countryConfirmedCases,
                countryConfirmedDate,
                countryRecoveredCases,
                countryDeathsCases
            })
        } 

    }

    render() {
        const {countrySummaryItem, countryConfirmedCases, countryConfirmedDate, countryRecoveredCases, countryDeathsCases} = this.state;
        const {country_slug} = this.props.match.params;

        const charts = country_slug === "us" || country_slug === "china" ? (<h1>Sorry, to much data to visualize</h1>) : (
            <div className="charts">
                <BarChartSummary datasets={countryConfirmedCases} labels={countryConfirmedDate} title={"TOTAL CASES"} backgroundColor={"#5c8d89"} dataLabel="Confirmed Cases"/>

                <BarChartSummary datasets={countryRecoveredCases} labels={countryConfirmedDate} title={"TOTAL RECOVERED CASES"} backgroundColor={"#21bf73"}  dataLabel="Recovered Cases"/>

                <BarChartSummary datasets={countryDeathsCases} labels={countryConfirmedDate} title={"TOTAL DEATHS"} backgroundColor={"#fd5e53"} dataLabel="Deaths"/>
            </div>
        )

        return (
            <div className="container country-detail-wrapper">
                <h1>{countrySummaryItem.Country}</h1>    

                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12 detail-box confirmed">
                        <h5>Total Confirmed</h5>
                        <p>{countrySummaryItem.TotalConfirmed}</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 detail-box confirmed">
                        <h5>New Confirmed</h5>
                        <p>{countrySummaryItem.NewConfirmed}</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 detail-box recovered">
                        <h5>Total Recovered</h5>
                        <p>{countrySummaryItem.TotalRecovered}</p>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 detail-box deaths">
                        <h5>Total Deaths</h5>
                        <p>{countrySummaryItem.TotalDeaths}</p>
                    </div>
                </div>

                {charts}
            </div>
        )
    }
}
