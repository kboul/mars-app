import React, { Component } from 'react';
import ReactStars from 'react-stars';
import { withRouter } from 'react-router-dom'

import { getUnits } from '../../services/unitsService';
import MarsCircleHeader from '../MarsCircleHeader/MarsCircleHeader';
import ModalComp from '../ModalComp/ModalComp';
import ModalContent from '../ModalContent/ModalContent';

const cardStyle = { border: '0px' };
const cardBodyStyle = { padding: '0' };
const clickableCard = { cursor: 'pointer' };


class Browse extends Component {
    state = {
        units: [],
        modal: false
    }

    async componentDidMount() {
        const { data: units } = await getUnits();
        this.setState({ units: units.data });
        console.log(this.state.units);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    addIdToUrl = (id) => {
        this.props.history.push(`/browse/${id}`);
    }

    handleClick = (id) => {
        this.toggle();
        this.addIdToUrl(id);
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
                <div className="row mt-4">
                    <ModalComp
                        modal={this.state.modal} 
                        toggle={this.toggle}>
                       <ModalContent />   
                    </ModalComp>  
                    {this.state.units.map(({id, name, region, description, cancellation, price, rating}) => {
                        return (
                            <div 
                                className="col-md-4" 
                                key={id}
                                onClick={() => this.handleClick(id)}
                                style={clickableCard}>   
                                <div 
                                    className="card mb-4 box-shadow" 
                                    style={cardStyle}>
                                    <img 
                                        className="card-img-top" 
                                        src="https://via.placeholder.com/362x180" 
                                        alt="https://via.placeholder.com/362x180"/>
                                    <div 
                                        className="card-body" 
                                        style={cardBodyStyle}>
                                        <b>{name}</b> 
                                        <div>{region}</div>
                                        <div className="card-text">
                                            {`${description.substring(0,60)}...`}
                                        </div>
                                        <div>{cancellation}</div> 
                                        <ReactStars
                                            count={5}
                                            value={rating}
                                            size={24}
                                            color1={'#DCDCDC'}
                                            color2={'#000000'} />
                                        <div className="card-text">
                                            <b>{(price / 5600).toFixed(2)} BTC</b>
                                        </div>      
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
 
export default withRouter(Browse);