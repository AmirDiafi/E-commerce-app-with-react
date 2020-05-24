import React from 'react';

export default class Filter extends React.Component {
    render() {
        return(
            <div className='row'>
                <div className='col-md-4'>
                    {this.props.count} products Found
                </div>
                <div className='col-md-4'>
                    <label>
                        Order by
                        <select className='form-control' value={this.props.sort}
                        onChange={(e) => this.props.handleChangeSort()}>
                            <option value=''>Select</option>
                            <option value='lowest'>Lowest to heighest</option>
                            <option value='heighest'>Heighest to Lowest</option>
                        </select>
                    </label>
                </div>
                <div className='col-md-4'>
                    <label>
                        Filter size
                        <select className='form-control' value={this.props.size}
                        onChange={(e) => this.props.handleChangeSize()}>
                            <option value=''>All</option>
                            <option value='XS'>XS</option>
                            <option value='S'>S</option>
                            <option value='M'>M</option>
                            <option value='L'>L</option>
                            <option value='XL'>XL</option>
                            <option value='XXL'>XXL</option>
                        </select>
                    </label>
                </div>
            </div>
        )
    }
}