import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

const appConfig = createTamagui(config);

export default appConfig;

export type Conf = typeof appConfig;

declare module "tamagui" {
	interface TamaguiCustomConfig extends Conf {}
}
