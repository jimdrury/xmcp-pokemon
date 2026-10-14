import axios, { type AxiosInstance } from "axios";
import {
	type Ability,
	type Move,
	type Pokemon,
	SimpleAbilitySchema,
	SimpleMoveSchema,
	SimplePokemonSchema,
} from "./pokeapi.interface";

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

	async getAbility(name: string) {
		try {
			const response = await this.api.get<Ability>(`/ability/${name}`);
			const { data } = SimpleAbilitySchema.safeParse(response.data);
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

	async getMove(name: string) {
		try {
			const response = await this.api.get<Move>(`/move/${name}`);
			const { data } = SimpleMoveSchema.safeParse(response.data);
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
