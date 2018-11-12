import React, { Component } from 'react';
import ReactStars from 'react-stars';

import { getUnits } from '../../services/unitsService';
import MarsCircleHeader from '../MarsCircleHeader/MarsCircleHeader';

const cardStyle = { width: '30rem', border: '0px' };
const cardBodyStyle = { padding: '0' };

class Browse extends Component {
    state = {
        units: []
    }

    async componentDidMount() {
        const { data: units } = await getUnits();
        this.setState({ units: units.data });
        console.log(this.state.units);
    }

    render() { 
        return ( 
            <div className="container-fluid">
                <div className="d-flex justify-content-between m-2">
                    <div>
                        <MarsCircleHeader 
                            background="white" 
                            color="black" />
                    </div>
                    <div>
                        User name
                    </div>
                </div>
                <div className="card-deck d-flex justify-content-center mt-4">
                    {this.state.units.map(({id, name, description, cancellation, price, rating}) => {
                        return (
                            <div key={id}>
                                <div 
                                    className="card mb-4" 
                                    style={cardStyle}>
                                    <img 
                                        className="card-img-top" 
                                        src="https://via.placeholder.com/800x600"
                                        alt="https://via.placeholder.com/800x600" />
                                    <div 
                                        className="card-body" 
                                        style={cardBodyStyle}>
                                        <b>{name}</b> 
                                        <div className="card-text">
                                            {`${description.substring(0,60)}...`}
                                        </div>
                                        <div>{cancellation}</div> 
                                        <div className="card-text">
                                            <b>{(price / 5600).toFixed(2)} BTC</b>
                                        </div>
                                        <ReactStars
                                            count={5}
                                            value={rating}
                                            size={24}
                                            color1={'#DCDCDC'}
                                            color2={'#000000'} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
 
export default Browse;