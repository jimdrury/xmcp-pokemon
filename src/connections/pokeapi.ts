import axios, { type AxiosInstance } from "axios";
import { type Pokemon, SimplePokemonSchema } from "./pokeapi.interface";

export class PokeApi {
	api: AxiosInstance;

	constructor() {
		this.api = axios.create({
			baseURL: "https://pokeapi.co/api/v2",
		});
	}

	async getPokemon(name: string) {
		try {
			const response = await this.api.get<Pokemon>(`/pokemon/${name}`);
			const { data } = SimplePokemonSchema.safeParse(response.data);
			return {
				success: true,
				data,
			};
		} catch {
			return {
				success: false,
				data: {
					name,
				},
			};
		}
	}
}

export const pokeApi = new PokeApi();
