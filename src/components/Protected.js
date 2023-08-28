import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Protected(props) {
    const {Component} = props;
    const navigate = useNavigate();

    useEffect(() => {
        var data = window.sessionStorage.getItem("userName");
        if(data === null){
            navigate("/");
        }

    },[]);
    return (<Component/>)
}