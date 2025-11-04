import * as Tooltip from '@radix-ui/react-tooltip'

const CoffeeTooltip = ({ children, text, side, align }) => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side={side}
          align={align}
          avoidCollisions={false}
          sideOffset={2}
          className=" font-opensans tracking-wide text-[0.80rem] font-semibold bg-[#8c6244] text-white px-2 py-1 rounded-md shadow-lg border border-[#6b4423] z-50"
          style={{
            fontVariant: "small-caps",
        }}
        >
          {text}
          <Tooltip.Arrow className="fill-[#8c6244]" /> 
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}

export default CoffeeTooltip
