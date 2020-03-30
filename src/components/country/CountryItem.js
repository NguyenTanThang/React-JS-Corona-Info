import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class CountryItem extends Component {
    render() {
        const {countrySummaryItem} = this.props;

        return (
            <div className="col-lg-6 col-md-12 col-sm-12 country-summary-item">
                <Link to={`/details/${countrySummaryItem.Slug}`}>
                    <h3>{countrySummaryItem.Country}</h3>
                </Link>
                <div className="row justify-content-around">
                    <div className="col-lg-4 col-md-4 col-sm-12 detail-box confirmed">
                        <h5>Total Confirmed</h5>
                        <p>{countrySummaryItem.TotalConfirmed}</p>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 detail-box recovered">
                        <h5>Total Recovered</h5>
                        <p>{countrySummaryItem.TotalRecovered}</p>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 detail-box deaths">
                        <h5>Total Deaths</h5>
                        <p>{countrySummaryItem.TotalDeaths}</p>
                    </div>
                </div>
            </div>
        )
    }
}
