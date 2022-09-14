import axios from "axios";

export class PokemonService  {

    private static serverUrl: string | any = process.env.REACT_APP_API_ENDPOINT;


 public static getAllPokemons(): Promise<any> {
        let dataUrl: string = `${this.serverUrl}/get-pokemons`;

        return axios.get(dataUrl, { withCredentials: true });

    }

}