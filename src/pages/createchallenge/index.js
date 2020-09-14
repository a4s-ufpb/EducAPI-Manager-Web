import React from 'react'
import Navigation from '../../components/Navigation/Navigation'
import ChallengeFormCreate from '../../components/ChallengeForm/create/index'
import './style.css'
import Footer from '../../components/Footer/index'

export default function CreateChallenge(){
    return (
        <div> 
            <Navigation/>
            <div className="createchallenge-box">
                <h2>Criando Um Desafio</h2>
                <ChallengeFormCreate/>
            </div>
            <Footer/>
        </div>
    );
}