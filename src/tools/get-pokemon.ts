import type { InferSchema, ToolMetadata } from "xmcp";
import { z } from "zod";
import { pokeApi } from "~/connections/pokeapi";

export const schema = {
	names: z
		.array(z.string().regex(/^[a-z]+(?:-[a-z]+)*$/i))
		.min(1)
		.describe("Pokémon names to retrieve information for"),
};

export const metadata: ToolMetadata = {
	name: "get-pokemon",
	description:
		"Retrieve detailed information about one or more Pokémon by name.",
	annotations: {
		title: "Get Pokémon",
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: true,
	},
};

export default async function getPokemon({
	names,
}: InferSchema<typeof schema>) {
	const pokemon = await Promise.all(
		names.map((name) => pokeApi.getPokemon(name.toLowerCase())),
	);

	const found = pokemon.filter((p) => p.success).map((p) => p.data);
	const notFound = pokemon.filter((p) => !p.success).map((p) => p.data);

	return {
		structuredContent: {
			pokemon: {
				found,
				notFound,
			},
		},
	};
}
