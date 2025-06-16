"use client"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import type { Ingredient } from "@/@types/ingredient"
import PortionsNumberInput from "@/components/molecules/PortionsNumberInput"

interface IngredientsTableProps {
	ingredients: Ingredient[]
	basePortions: number
	portions: number
	setPortions: (value: number) => void
}

export default function IngredientsTable({ ingredients, basePortions, portions, setPortions }: IngredientsTableProps) {
	const calculateAdjustedQuantity = (quantity: number) => {
		return ((quantity * portions) / basePortions).toFixed(2).replace(/\.00$/, "")
	}

	return (
		<div className="w-full border-r border-border px-4">
			<PortionsNumberInput portions={portions} setPortions={setPortions} basePortions={basePortions} />
			<div className="[&>div]:max-h-screen">
				<Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
					<TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
						<TableRow className="hover:bg-transparent text-lg">
							<TableHead>Ingrédient</TableHead>
							<TableHead className="text-right">Quantité</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ingredients.map((item) => (
							<TableRow key={item.id}>
								<TableCell className="font-medium">{item.name}</TableCell>
								<TableCell className="text-right">
									{calculateAdjustedQuantity(item.quantity)}
									{item.unit && ` ${item.unit}`}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
