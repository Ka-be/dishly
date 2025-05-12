"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import NumberFlow from "@number-flow/react"

interface PortionsNumberInputProps {
    portions: number
    setPortions: (value: number) => void
    basePortions: number
}

const PortionsNumberInput = ({ portions, setPortions, basePortions }: PortionsNumberInputProps) => {
    const incrementPortions = () => setPortions(portions + 1)
    const decrementPortions = () => setPortions(portions > 1 ? portions - 1 : 1)

    return (
        <div className="w-full">
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
        </div>
    )
}

export default PortionsNumberInput