import React, { useEffect, useReducer, useRef, useState } from "react";
import { IPokemon } from "../../models/Pokemon";
import '../PokemonTable/PokemonTable.css';
import { PokemonService } from "../../services/PokemonService";
import { Toast, ToastSeverityType } from "primereact/toast";
import Item from "./PokemonItem";
import { Dialog } from 'primereact/dialog';
import BattleDialogContent from "../BattleDialog/BattleDialogContent";
import { BattleResults } from "../../models/BattleResults";


const init: any = (initialState: IState) => initialState;

interface IState {
    results: IPokemon[]
    loading: boolean;
    students: IPokemon[];
    errorMessage: string;
    totalRecords: number;
  
  }
  interface IProps {
   
  }

  //OJO: action deconstruido automaticamente en type y payload
const reducer = (state: IState, { type, payload }: string | any) => {

  switch (type) {
    case "onPage":

      return { ...state, loading: true, first: payload.first };
    case "dataLoaded":
      return { ...state, results: payload, loading: false };
    default:
      throw new Error();
  }
};


  const PokemonTable: React.FC<IProps> = () => {

    const initialState = {
      results: [] as IPokemon[],
      loading: true,
      first: 0,
      rows: 5,
      totalRecords: 10,
      sortOrder: 1
    };

    const [state, dispatch] = useReducer(reducer, initialState, init);
    const { results, loading, totalRecords } = state;

    useEffect(() => {
      loadData();
    }, []);


const loadData = (): void => {


    let data: IPokemon[] = [];
    PokemonService.getAllPokemons().then((response): void => {
      if (response.status === 200) {
        data = response.data.data;
        state.totalRecords = response.data.totalRecords;
      } else {
        showDialog('error', 'Data wasnt loaded!', 'Server error!')
      }
    }).then((): void => {
      dispatch({ type: "dataLoaded", payload: data });
    })
  }

   //TOAST HELPER METHODS
   const toast = useRef<Toast>(null);

   const showDialog = (type: ToastSeverityType, summary: string, detail: string): void => {
     if (toast.current) {
       toast.current.show({ severity: type, summary: summary, detail: detail, life: 3000 });
     }
   }

   //BATTLE DIALOG
   const [displayBasic, setDisplayBasic] = useState(false);
   const [position, setPosition] = useState('center');


   const dialogFuncMap : any = {
    'displayBasic': setDisplayBasic,
}

const onClick = (name: string, position: string) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
        setPosition(position);
    }
}

const onHide = (name: string, battleResults: BattleResults | undefined) => {

if(battleResults){
  let strongerPokemonId = battleResults.pokemon_1_power > battleResults.pokemon_2_power 
  ? battleResults.pokemon_1_id : battleResults.pokemon_2_id;
  const strongerPokemonIndex = results.findIndex((x : IPokemon) => x.id === strongerPokemonId);
  results[strongerPokemonIndex].score++;
}

    dialogFuncMap[`${name}`](false);
}



    return( 
        <React.Fragment>
           <Toast ref={toast} />
<div className="container d-flex align-items-center justify-content-center flex-column">
           <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">
        Name
      </th>
      <th scope="col">Score</th>
      
    </tr>
  </thead>
  <tbody>
  {results
      .sort((a: IPokemon, b: IPokemon) => a.score > b.score ? -1 : 1)
      .map((row: IPokemon, i: number) => (
        <Item row={row} index={i} key={row.id} />
      ))}
  </tbody>
</table>


<button className="btn btn-danger mt-4" onClick={() => onClick('displayBasic', 'center')}>Start a random battle!</button>
</div>

<Dialog  header="Get ready for a battle!" visible={displayBasic} style={{ width: '50vw' }} footer={''}
 onHide={() => onHide('displayBasic', undefined)}>
<BattleDialogContent onHide={onHide} pokemon1={results[~~(results.length * Math.random())]} pokemon2={results[~~(results.length * Math.random())]} />
</Dialog>

        </React.Fragment>
    );
    
  }


  export default PokemonTable;