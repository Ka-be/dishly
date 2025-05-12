import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Ingredient } from "@/@types/ingredient"

interface IngredientsTableProps {
  ingredients: Ingredient[]
}

export default function IngredientsTable({ ingredients }: IngredientsTableProps) {
  return (
    <div className="w-full">
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
                  {item.quantity}
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
