import React from 'react';

export default class Basket extends React.Component{
    render() {
        const {cardItems} = this.props;
        return(
            <div className='alert alert-info'>
                {cardItems.length===0?'Basket is Empet':<div>You have {cardItems.length} in your basket.</div> }
            </div>
        )
    }
}