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
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import NumberFlow from "@number-flow/react"

interface IngredientsTableProps {
	ingredients: Ingredient[]
	basePortions: number
}

export default function IngredientsTable({ ingredients, basePortions }: IngredientsTableProps) {

	const [portions, setPortions] = useState(basePortions)

	const incrementPortions = () => {
		setPortions((prev) => prev + 1)
	}

	const decrementPortions = () => {
		setPortions((prev) => (prev > 1 ? prev - 1 : 1))
	}

	// Calcule la quantité ajustée en fonction du nombre de portions
	const calculateAdjustedQuantity = (quantity: number) => {
		return ((quantity * portions) / basePortions).toFixed(2).replace(/\.00$/, "")
	}


	return (
		<div className="w-full border-r border-border px-4">
			<div className="mb-4 flex flex-col items-center space-y-1">
				<h3 className="text-lg font-medium">Nombre de portions</h3>
				<div className="flex items-center space-x-2">
					<Button variant="outline" size="icon" onClick={decrementPortions} disabled={portions <= 1}>
						<Minus className="h-2 w-2" />
					</Button>
					<span className="w-8 text-center text-xl font-semibold">
						<NumberFlow value={portions} format={{ useGrouping: false }} animated />
					</span>
					<Button variant="outline" size="icon" onClick={incrementPortions}>
						<Plus className="h-2 w-2" />
					</Button>
				</div>
			</div>

			<div className="[&>div]:max-h-96">
				<Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
					<TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
						<TableRow className="hover:bg-transparent">
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
