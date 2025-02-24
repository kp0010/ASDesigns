import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef(({ className, values, setValues, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
    >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[#808080]">
            <SliderPrimitive.Range className="absolute h-full bg-[#262626]" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="relative group block h-4 w-4 rounded-full border-2 border-[#262626] bg-background ring-offset-background transition-all duration-200 ease-in-out cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-105 disabled:pointer-events-none disabled:opacity-50">
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-black px-2 py-1 text-xs text-white transition-all duration-200 ease-in-out opacity-0 group-hover:scale-100 group-hover:opacity-100">
                50 {/* {props.value?.[0] ?? 0} or {props.value} */}
            </span>
        </SliderPrimitive.Thumb>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-[#262626] bg-background ring-offset-background transition-all duration-200 ease-in-out cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-105 disabled:pointer-events-none disabled:opacity-50">
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-black px-2 py-1 text-xs text-white transition-all duration-200 ease-in-out opacity-0 group-hover:scale-100 group-hover:opacity-100">
                {props.value?.[1] ?? 0}
            </span>
        </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
