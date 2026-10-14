import type { InferSchema, ToolMetadata } from "xmcp";
import { z } from "zod";
import { pokeApi } from "~/connections/pokeapi";

export const schema = {
	names: z
		.array(z.string().regex(/^[a-z]+(?:-[a-z]+)*$/i))
		.min(1)
		.describe("Ability names to retrieve information for"),
};

export const metadata: ToolMetadata = {
	name: "get-ability",
	description:
		"Retrieve detailed information about one or more Pokémon abilities by name.",
	annotations: {
		title: "Get Ability",
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: true,
	},
};

export default async function getAbility({
	names,
}: InferSchema<typeof schema>) {
	const abilities = await Promise.all(
		names.map((name) => pokeApi.getAbility(name.toLowerCase())),
	);

	const found = abilities
		.filter((ability) => ability.success)
		.map((ability) => ability.data);
	const notFound = abilities
		.filter((ability) => !ability.success)
		.map((ability) => ability.data);

	return {
		structuredContent: {
			abilities: {
				found,
				notFound,
			},
		},
	};
}
