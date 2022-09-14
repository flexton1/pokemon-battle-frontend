import React, { useState } from "react";
import { IPokemon } from "../../models/Pokemon";
import { InputNumber } from 'primereact/inputnumber';
import '../BattleDialog/BattleDialogContent.css';
import {Button} from 'primereact/button';
import { BattleResults } from "../../models/BattleResults";



interface IState {
  
  }
  interface IProps {
   pokemon1: IPokemon;
   pokemon2: IPokemon;
   onHide: any;
  }

  const BattleDialogContent: React.FC<IProps> = ({pokemon1, pokemon2,  onHide }) => {

    let [state, setState] = useState({
        battlePower: {
          pokemon1_power: 0,
          pokemon2_power: 0
        }
      });

      let updateInput = (event: any): void => {

        setState({
          battlePower: {
            ...state.battlePower,
            [event.target.name]: event.target.value
          }
        });
    
      };

      const battleResults = (): BattleResults => {
        const results1: BattleResults = {
            pokemon_1_id: pokemon1.id,
            pokemon_2_id: pokemon2.id,
            pokemon_1_power: state.battlePower.pokemon1_power,
            pokemon_2_power: state.battlePower.pokemon2_power
        }

        return results1;
      }


return (
    <>

    
    
    <div className="input-container d-flex flex-column">
          <label>Pokemon 1 is {pokemon1.name}, enter his attack strength </label>
          <InputNumber type="tel" min={0} name="pokemon1_power" required
            value={state.battlePower.pokemon1_power}
            onValueChange={updateInput}/>
            </div>


            <div className="input-container d-flex flex-column">
          <label>Pokemon 2 is {pokemon2.name}, enter his attack strength </label>
          <InputNumber type="tel" min={0} name="pokemon2_power" required
            value={state.battlePower.pokemon2_power}
            onValueChange={updateInput}/>
            </div>


            <Button label='Showdown!' className='p-button-info mt-5' onClick={() => onHide('displayBasic', battleResults())}/>
    </>
);


  }


  export default BattleDialogContent;