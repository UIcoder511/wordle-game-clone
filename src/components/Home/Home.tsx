import React, { FC } from 'react'
import "./Home.css";
import GridRowCell from '../GridRow/GridRowCell/GridRowCell';
import Button from '../../ui/Button/Button';


export type WordLevelType = 4 | 5 | 6;

interface LevelCardProps{
    remainingWords:number;
    totalWords:number;
    wordLevel:WordLevelType;
    color:'#ff500f' | '#00a91a' | '#f338bd'; //hex
    onClick:(wordLevel:WordLevelType)=>void;
}

type HomeProps={
    setLevel:React.Dispatch<React.SetStateAction<number>>;
}

interface LevelCardsProps{

    onClick:(wordLevel:WordLevelType)=>void;
}



const Home:FC<HomeProps> = ({setLevel}) => {
  return (
    <div className='homescreen'>
        <Logo />
        <LevelCards onClick={(level)=>setLevel(level)} />
        <footer>
            Design and Developed with 3 by Umang
        </footer>
        {/* <Button btnType='try' onClick={()=>setIsStarted(true)}>Start</Button> */}
    </div>
  )
  }

const Logo=()=>{

    return (
        <div className='grid-home'>
            <GridRowCell value='W' filled />
            <GridRowCell value='O' filled  />
            <GridRowCell value='R' filled  />
            <GridRowCell value='D' filled status="incorrect" />
            <GridRowCell value='L' filled status="correct"  />
            <GridRowCell value='E' filled status="wrong-position"  />
        </div>
    )

}


const LevelCard:FC<LevelCardProps>=({remainingWords,totalWords,wordLevel,color,onClick})=>{
    return(
        <div className='level-card word-font' onClick={()=>onClick(wordLevel)} style={{
            borderTop:"6px solid "+color,
            background:'linear-gradient(180deg, rgba(255,255,255,1) 0%, '+color+' 40%)'
        
        }}>
            <span className='top-design-card' style={{
                backgroundColor:color
            
            }}> 
            {/* <span className='left-corner'></span>  */}
            </span>
            <span className='number'  style={{color:color, WebkitTextStroke: "1px #fff"}}>{wordLevel}</span>
            <div style={{color:'#fff', WebkitTextStroke: "1px "+color}}>Words</div>
            <div style={{color:'#fff', WebkitTextStroke: "1px "+color}}>
                <span className='reaming-word'>{remainingWords}</span>
                <span>/</span>
                <span className='total-word'>{totalWords}</span>
            </div>
        </div>
    )
}

const LevelCards:FC<LevelCardsProps>=({onClick})=>{
    return(
        <div className='flex'>
            <LevelCard remainingWords={10} totalWords={20} wordLevel={4} color="#ff500f" onClick={onClick} />
            <LevelCard remainingWords={10} totalWords={20} wordLevel={5} color="#00a91a" onClick={onClick} />
            <LevelCard remainingWords={10} totalWords={20} wordLevel={6} color="#f338bd" onClick={onClick} />
        </div>
    )
}

export default Home