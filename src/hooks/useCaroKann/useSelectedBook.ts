import { Item } from "@/types/graphql.types";
import { playTartakower } from "caro-kann";

export const useSelectedBook = playTartakower<Omit<Item, "priceStandard" | "subInfo">>({} as Item);
