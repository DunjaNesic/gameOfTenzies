import './App.css';
import React from "react"
import Die from './components/Die/Die.jsx';
import { useState, useEffect } from 'react';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {

   const allNewDice = () => {
      const diceArray = [];
      for (let i = 0; i < 10; i++) {
         diceArray.push({id: nanoid(), valuee: Math.ceil(Math.random()*6), isHeld: false});
      }
      return diceArray;
   }
   
   const [faces, setDiceFaces] = useState(allNewDice);
   const [tenzies, setTenzies] = useState(false);

   useEffect(()=>{
      if (faces.every(face => face.isHeld) && faces.every(face => face.valuee === faces[0].valuee)) {
         setTenzies(true);
      }
   }, [faces]);

   const rollDice = () => {
      if (!tenzies){
     setDiceFaces(prevFaces => prevFaces.map(face => {
      return face.isHeld ? face : {id: nanoid(), valuee: Math.ceil(Math.random()*6), isHeld: false}
     }))   } else {
      setTenzies(false)
      setDiceFaces(allNewDice)
     } 
   }   

   const holdDice = (id) => {
     setDiceFaces(prevFaces => prevFaces.map(face => {
      return face.id === id ? {...face, isHeld: !face.isHeld} : face
     } ))
   }

   return ( 
   <main className='parent-container'>
      {tenzies && <Confetti/>}
      <h1 className='title'>Tenzies</h1>
      <div className='box'>
         {faces.map(face => 
         <Die
         key={face.id}
         value={face.valuee}
         isHeld={face.isHeld}
         holding={()=>holdDice(face.id)}
         />)}
         </div> 
         <button className='rollBtn' onClick={rollDice}>{tenzies ? "NEW GAME" : "ROLL"}</button>
    </main>
   )
}