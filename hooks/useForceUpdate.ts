import { useState } from "react";

export default function useForceUpdate(){
    const [value, setValue] = useState<number>(1);
    return { forceValue: value, forceUpdate: () => setValue(value => value + 1)};
}
