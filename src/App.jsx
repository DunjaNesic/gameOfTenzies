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
   const [start, setStart] = useState(0);
   const [seconds, setSeconds] = useState(0);
   const [minutes, setMinutes] = useState(0);
   const [hours, setHours] = useState(0);

   if (seconds > 59)
   setSeconds(0);
   if (minutes > 59)
   setMinutes(0);
   if (hours > 23)
   setHours(0);

   useEffect(() => {
      const timer = setInterval(()=>{
         if (!start) return
         if (tenzies) return
         setSeconds(prevSecond => prevSecond + 1)
      },1000)

      return() => clearInterval(timer)
   }, [start, !tenzies])


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
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setStart(0);
      setTenzies(false)
      setDiceFaces(allNewDice)
     } 
   }   

   const holdDice = (id) => {
      setStart(true);
     setDiceFaces(prevFaces => prevFaces.map(face => {
      return face.id === id ? {...face, isHeld: !face.isHeld} : face
     } ))
   }

   return ( 
   <main className='parent-container'>
      {tenzies && <Confetti/>}
      <h1 className='title'>Tenzies</h1>
      <h1>Time: {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</h1>
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