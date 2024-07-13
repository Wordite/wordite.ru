import { useState } from "react"


function useIsAnimating(block, value) {
    const [blocks, setBlocks] = useState({})
    setBlocks(blocks => ({...blocks, [block]: value }))

    return blocks[block]
}


export { useIsAnimating }
