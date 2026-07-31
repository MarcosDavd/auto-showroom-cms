import { useEffect,useState,useRef } from "react"

export function ObserverComp(){
    const refContent = useRef(null);
    const [elementShowing, setElementShowing] = useState(false);
    useEffect(()=> {
        const observer = new IntersectionObserver(
            ([entry]) =>{
                if(entry.isIntersecting){
                    setElementShowing(true);
                    observer.disconnect();
                }
            },
            {threshold:0.8}
        );
        observer.observe(refContent.current);

        return () => observer.disconnect();

    },[])
    return {
            refContent: refContent,
            elementShowing: elementShowing
        };
}