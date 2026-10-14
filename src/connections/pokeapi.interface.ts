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

export interface AbilityEffectEntry {
	effect: string;
	language: NamedApiResource;
	short_effect: string;
}

export interface AbilityEffectChange {
	effect_entries: Array<{
		effect: string;
		language: NamedApiResource;
	}>;
	version_group: NamedApiResource;
}

export interface AbilityFlavorText {
	flavor_text: string;
	language: NamedApiResource;
	version_group: NamedApiResource;
}

export interface AbilityName {
	language: NamedApiResource;
	name: string;
}

export interface AbilityPokemon {
	is_hidden: boolean;
	pokemon: NamedApiResource;
	slot: number;
}

export interface Ability {
	effect_changes: AbilityEffectChange[];
	effect_entries: AbilityEffectEntry[];
	flavor_text_entries: AbilityFlavorText[];
	generation: NamedApiResource;
	id: number;
	is_main_series: boolean;
	name: string;
	names: AbilityName[];
	pokemon: AbilityPokemon[];
}

export interface MoveEffectEntry {
	effect: string;
	language: NamedApiResource;
	short_effect: string;
}

export interface MoveStatChange {
	change: number;
	stat: NamedApiResource;
}

export interface Move {
	accuracy: number | null;
	damage_class: NamedApiResource;
	effect_chance: number | null;
	effect_entries: MoveEffectEntry[];
	generation: NamedApiResource;
	id: number;
	name: string;
	power: number | null;
	pp: number;
	priority: number;
	stat_changes: MoveStatChange[];
	target: NamedApiResource;
	type: NamedApiResource;
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
	moves: z.array(
		z.object({
			move: z
				.object({
					name: z.string(),
				})
				.transform((data) => data.name),
		}),
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
	abilities: z.array(
		z
			.object({
				slot: z.number(),
				ability: z.object({
					name: z.string(),
				}),
			})
			.transform((data) => ({
				slot: data.slot,
				ability: data.ability.name,
			})),
	),
});

export const SimpleAbilitySchema = z
	.object({
		id: z.number(),
		name: z.string(),
		is_main_series: z.boolean(),
		generation: z.object({
			name: z.string(),
		}),
		effect_entries: z.array(
			z.object({
				effect: z.string(),
				short_effect: z.string(),
				language: z.object({
					name: z.string(),
				}),
			}),
		),
	})
	.transform((data) => {
		const english = data.effect_entries.find(
			(entry) => entry.language.name === "en",
		);

		return {
			id: data.id,
			name: data.name,
			is_main_series: data.is_main_series,
			generation: data.generation.name,
			effect: english?.effect ?? "",
			short_effect: english?.short_effect ?? "",
		};
	});

export const SimpleMoveSchema = z
	.object({
		id: z.number(),
		name: z.string(),
		accuracy: z.number().nullable(),
		power: z.number().nullable(),
		pp: z.number(),
		priority: z.number(),
		effect_chance: z.number().nullable(),
		damage_class: z.object({
			name: z.string(),
		}),
		type: z.object({
			name: z.string(),
		}),
		target: z.object({
			name: z.string(),
		}),
		generation: z.object({
			name: z.string(),
		}),
		stat_changes: z.array(
			z.object({
				change: z.number(),
				stat: z.object({
					name: z.string(),
				}),
			}),
		),
		effect_entries: z.array(
			z.object({
				effect: z.string(),
				short_effect: z.string(),
				language: z.object({
					name: z.string(),
				}),
			}),
		),
	})
	.transform((data) => {
		const english = data.effect_entries.find(
			(entry) => entry.language.name === "en",
		);

		return {
			id: data.id,
			name: data.name,
			accuracy: data.accuracy,
			power: data.power,
			pp: data.pp,
			priority: data.priority,
			effect_chance: data.effect_chance,
			damage_class: data.damage_class.name,
			type: data.type.name,
			target: data.target.name,
			generation: data.generation.name,
			stat_changes: data.stat_changes.map((change) => ({
				change: change.change,
				stat: change.stat.name,
			})),
			effect: english?.effect ?? "",
			short_effect: english?.short_effect ?? "",
		};
	});
