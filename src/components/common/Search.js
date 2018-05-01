import React from 'react';
import { API_URL} from "../../config";
import {withRouter} from 'react-router-dom'
import {helperResponse} from "./HelperResponse";
import './Search.css'
import Loading from './Loading'

class Search extends React.Component {

    constructor() {
        super();

        this.state = {
            searchQuery: '',
            searchResults: [],
            loading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleRedirect (id) {
        this.setState({
            searchQuery: '',
            searchResults: [],
        })
        this.props.history.push(`/currency/${id}`);
    }

    handleChange(event) {
        const searchQuery = event.target.value;

        this.setState({
            searchQuery
        });

        if (!searchQuery) {
            return '';
        }

        this.setState({
            loading: true,
        });

        fetch(API_URL + '/autocomplete?searchQuery=' + searchQuery)
            .then(helperResponse)
            .then((result) => {

                this.setState({
                    searchResults: result, 
                    loading: false})
            });

    }

    renderSearchResult (){
        const {searchResults, searchQuery, loading} = this.state;

        if (!searchQuery){
            return '';
        }

        if (searchResults.length > 0){
            return (
                <div className="Search-result-container">
                    {searchResults.map(result => 
                    
                    <div
                        key={result.id}
                        className="Search-result"
                        onClick= {() => this.handleRedirect(result.id)}
                        >
                        {result.name} ({result.symbol})
                    </div>)}
                </div>
            )
        }
        if (!loading){
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No results
                    </div>
                </div>
            )
        }
        
        
    }

    render() {
        const {loading, searchQuery} = this.state;
        return (
                <div className="Search">
                    <span className="Search-icon"/>
                    <input
                    className="Search-input"
                    type="text"
                    placeholder="Currency name"
                    onChange={this.handleChange}
                    value={searchQuery}
                    />
                    {loading &&
                    <div className="Search-loading">
                        <Loading
                            width='12px'
                            height='12px'
                        />
                    </div>}

                    {this.renderSearchResult()}


                </div>
        )
    }
}

export default withRouter(Search) ;