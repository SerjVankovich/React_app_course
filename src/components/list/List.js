import React from 'react';
import Table from './Table'
import { helperResponse} from "../common/HelperResponse";
import { API_URL} from "../../config";
import Loading from '../common/Loading'
import Pagination from './Pagination'

class List extends React.Component{
    constructor(){
        super();

        this.state = {
          loading: false,
          currencies: [],
          error: null,
          totalPages: 0,
          page: 1
        };
    }
    componentDidMount() {
        this.fetchCurrencies(this.state.page)
    }
    fetchCurrencies(page) {
        this.setState ({ loading: true});
        fetch( API_URL + '/cryptocurrencies?page=' + page + '&perPage=20')
            .then(helperResponse)
            .then((data) => {
                this.setState({
                    currencies: data.currencies,
                    loading: false,
                    totalPages: data.totalPages
                })
            })
            .catch((error) => {
                this.setState({
                    error: error.errorMessage,
                    loading: false
                })
            })
    }
    handlePaginationClick = (direction) => {
        let nextPage = this.state.page;

        if (direction === 'next') {
            nextPage++;
        } else if (direction === 'prev') {
            nextPage--;
        }
        this.setState({
            page: nextPage
        }, () => this.fetchCurrencies(this.state.page))

    }



    render() {
        const { loading, currencies, error, page, totalPages} = this.state;

        if (loading) {
            return <div className='loading-container'><Loading/></div>
        }
        if (error) {
            return <div className='error'>{error}</div>
        }

        return (
            <div>
                <Table
                    currencies={currencies}
                />
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>

        );
    }
}
export default List;