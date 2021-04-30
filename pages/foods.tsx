import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import foodsActions from "../store/actions/foods.action";

const Foods = (props) => {

    useEffect(()=>{
        (async()=>{
            const allFoods = await props.getAllFoods();
            console.log(allFoods);
        })();
    }, []);

    return (
        <>

        </>
    );
}

function mapStateToProps(state) {
  return { allState:state };
}

export default connect(mapStateToProps, foodsActions)(Foods);