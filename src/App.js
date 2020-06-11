import React, {useState,useEffect,useContext,useReducer} from 'react';
import { useRef } from 'react';


const MyContext = React.createContext()

// CONSUMIR CONTEXT DE FORMA TRADICIONAL
// const Nieto=()=>{

//   return(
//     <MyContext.Consumer>
//       {(context)=>(
//         <div>
//           NIETO {context.num}
//           <button onClick={context.addNumber}>ADD DISPATCHER</button>
//         </div>
//       )}
//     </MyContext.Consumer>
//   )
// }


const Nieto=()=>{

  const {num,addNumber} = useContext(MyContext)

  return(
    <div>
      NIETO {num}
      <button onClick={addNumber}>ADD DISPATCHER</button>
    </div>
      
  )
}

const Hijo=()=>{
  return (
    <div>
      HIJO
      <Nieto/>
    </div>
  )
}

const reducer = (state,action ) => {
  switch(action.type){
    case "INCREMENT":
      return {
        count:state.count+1
      }
    case "DECREMENT":
      return {
        count:state.count-1
      }
    default:
      return state
  }
}

function App() {
  // const [num,setNum] = useState(0)
  const [state,dispatch] = useReducer(reducer,{
    count:0,
    title:"hola"
  })

  const input = useRef()


  const addNumber=()=> {
    dispatch({type:"INCREMENT"})
  }

  const difNumber= ()=>{
    dispatch({type:"DECREMENT"})
  }

  return (
    <MyContext.Provider value={{
      count:state.count,
      addNumber
    }}>
      <div>
        <button onClick={addNumber}>ADD {state.count}</button>
        <br/>
        <button onClick={difNumber}>DIF {state.count}</button>
        <input
        type="text"
        placeholder="ingresa texto"
        ref={input}
        />
        <button onClick={()=>console.log(input.current)}>INPUT ENTRADA</button>
      </div>

      <Hijo/>
    </MyContext.Provider>
  );
}

export default App;
