import z from "zod";

export interface NamedApiResource {
	name: string;
	url: string;
}

export interface PaginatedResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

export interface PokemonAbility {
	is_hidden: boolean;
	slot: number;
	ability: NamedApiResource;
}

export interface PokemonPastAbility {
	generation: NamedApiResource;
	abilities: Array<{
		is_hidden: boolean;
		slot: number;
		ability: NamedApiResource | null;
	}>;
}

export interface PokemonGameIndex {
	game_index: number;
	version: NamedApiResource;
}

export interface PokemonHeldItem {
	item: NamedApiResource;
	version_details: Array<{
		rarity: number;
		version: NamedApiResource;
	}>;
}

export interface PokemonMove {
	move: NamedApiResource;
	version_group_details: Array<{
		level_learned_at: number;
		move_learn_method: NamedApiResource;
		version_group: NamedApiResource;
		order: number | null;
	}>;
}

export interface PokemonStat {
	base_stat: number;
	effort: number;
	stat: NamedApiResource;
}

export interface PokemonPastStat {
	generation: NamedApiResource;
	stats: PokemonStat[];
}

export interface PokemonType {
	slot: number;
	type: NamedApiResource;
}

export interface PokemonPastType {
	generation: NamedApiResource;
	types: PokemonType[];
}

export type SpriteUrl = string | null;

export interface PokemonSpriteSet {
	back_default?: SpriteUrl;
	back_female?: SpriteUrl;
	back_shiny?: SpriteUrl;
	back_shiny_female?: SpriteUrl;
	front_default?: SpriteUrl;
	front_female?: SpriteUrl;
	front_shiny?: SpriteUrl;
	front_shiny_female?: SpriteUrl;
	back_gray?: SpriteUrl;
	back_transparent?: SpriteUrl;
	back_transparent_gray?: SpriteUrl;
	back_shiny_transparent?: SpriteUrl;
	front_gray?: SpriteUrl;
	front_transparent?: SpriteUrl;
	front_transparent_gray?: SpriteUrl;
	front_shiny_transparent?: SpriteUrl;
	animated?: PokemonSpriteSet;
	icons?: PokemonSpriteSet;
	versions?: PokemonSpriteVersions;
}

export type PokemonSpriteVersions = Record<
	string,
	Record<string, PokemonSpriteSet>
>;

export interface PokemonSprites extends PokemonSpriteSet {
	other: {
		dream_world: PokemonSpriteSet;
		home: PokemonSpriteSet;
		showdown: PokemonSpriteSet;
		"official-artwork": PokemonSpriteSet;
	};
	versions: PokemonSpriteVersions;
	back_default: SpriteUrl;
	back_female: SpriteUrl;
	back_shiny: SpriteUrl;
	back_shiny_female: SpriteUrl;
	front_default: SpriteUrl;
	front_female: SpriteUrl;
	front_shiny: SpriteUrl;
	front_shiny_female: SpriteUrl;
}

export interface PokemonCries {
	latest: string;
	legacy: string;
}

export interface Pokemon {
	abilities: PokemonAbility[];
	base_experience: number;
	cries: PokemonCries;
	forms: NamedApiResource[];
	game_indices: PokemonGameIndex[];
	height: number;
	held_items: PokemonHeldItem[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: PokemonMove[];
	name: string;
	order: number;
	past_abilities: PokemonPastAbility[];
	past_stats: PokemonPastStat[];
	past_types: PokemonPastType[];
	species: NamedApiResource;
	sprites: PokemonSprites;
	stats: PokemonStat[];
	types: PokemonType[];
	weight: number;
}

export const SimplePokemonSchema = z.object({
	id: z.number(),
	name: z.string(),
	stats: z.array(
		z
			.object({
				base_stat: z.number(),
				effort: z.number(),
				stat: z.object({
					name: z.string(),
				}),
			})
			.transform((data) => ({
				base_stat: data.base_stat,
				effort: data.effort,
				stat: data.stat.name,
			})),
	),
	types: z.array(
		z
			.object({
				slot: z.number(),
				type: z.object({
					name: z.string(),
				}),
			})
			.transform((data) => ({
				slot: data.slot,
				type: data.type.name,
			})),
	),
});
