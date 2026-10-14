import type { InferSchema, ToolMetadata } from "xmcp";
import { z } from "zod";
import { pokeApi } from "~/connections/pokeapi";

export const schema = {
	names: z
		.array(z.string().regex(/^[a-z]+(?:-[a-z]+)*$/i))
		.min(1)
		.describe("Move names to retrieve information for"),
};

export const metadata: ToolMetadata = {
	name: "get-move",
	description:
		"Retrieve detailed information about one or more Pokémon moves by name.",
	annotations: {
		title: "Get Move",
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: true,
	},
};

export default async function getMove({ names }: InferSchema<typeof schema>) {
	const moves = await Promise.all(
		names.map((name) => pokeApi.getMove(name.toLowerCase())),
	);

	const found = moves.filter((move) => move.success).map((move) => move.data);
	const notFound = moves
		.filter((move) => !move.success)
		.map((move) => move.data);

	return {
		structuredContent: {
			moves: {
				found,
				notFound,
			},
		},
	};
}
