import { m } from "framer-motion"
import { useEffect, useState } from "react"
import { BsArrowDown, BsArrowRight, BsArrowUp } from "react-icons/bs";
import { FcRight } from "react-icons/fc";
import { GiClick } from "react-icons/gi";
import { SiClickup, SiGooglemaps } from "react-icons/si";
import ConfidenceMeter from "./ConfidenceMeter"
import MiniMap from "./MiniMap";
import DashboardGuide from "./DashboardGuide";
import Charts from "./Charts";
import { CgClose } from "react-icons/cg";

export default function Dashboard({ isClicked, inspections, setGuideDone, setHasLoaded, guideDone }) {
    const [visibleIndex, setVisibleIndex] = useState([])
    const [selectInspection, setSelectInspection] = useState(inspections[1])
    const [hasOpenedInspection, setHasOpenedInspection] = useState(true)
    const [statusCounts, setStatusCounts] = useState([])
    const [expand, setExpand] = useState([[false, false, false, false], [false, false, false, false]])
    const [runTour, setRunTour] = useState(false);
    const [isMapOpened, setIsMapOpened] = useState([false, 0, 0])

    function visibility() {
        const delays = [2000, 1000, 1000, 500];
        let totalDelay = 0;
        selectInspection.data.forEach(
            (_, i) => {
                totalDelay += delays[i]
                setTimeout(() => {
                    setVisibleIndex(prev => [...prev, i])
                }, totalDelay);
            }
        )
    }
    useEffect(() => {
        const counts = inspections.map(({ data }) => {
            return data.reduce(
                (acc, item) => {
                    acc[item.status] = (acc[item.status] || 0) + 1;
                    return acc;
                },
                { SAFE: 0, ANOMALY: 0 }
            );
        });

        setStatusCounts(counts);
    }, []);

    useEffect(() => {
        if (isClicked) {
            visibility();

        }
    }, [isClicked]);

    useEffect(() => {
        let timer;

        if (isClicked) {
            timer = setTimeout(() => {
                setRunTour(true); // ✅ start the Joyride tour
            }, 4000); // 5.5 seconds
        }

        return () => clearTimeout(timer); // clean up if component unmounts
    }, [isClicked]);

    useEffect(() => {
        if (isClicked)
            setTimeout(() => {
                setHasLoaded(true)
                console.log(isClicked)
            }, 2000);
    }, [isClicked])

    function updateExpand(i, name) {
        const char = name[name.length - 1]
        const updated = [...expand]
        updated[char] = [...updated[char]]
        updated[char][i] = !updated[char][i]
        setExpand(updated)
        console.log(expand[1])
    }
    return <div className={`w-[calc(78%)] min-w-[calc(770px)] h-full flex flex-col backdrop-blur-md basic p-8 mx-8 transform-gpu transition-transform duration-[calc(1500ms)] absolute -right-[calc(78%)] ${isClicked && "-translate-x-[calc(100%)]"} `}>
        <DashboardGuide run={runTour} setGuideDone={setGuideDone} guideDone={guideDone} />

        <span className="flex justify-between items-center">
            <span className="flex">
                <button className="text-3xl hover:underline" onClick={() => { setHasOpenedInspection(false); setGuideDone(prev => ({ ...prev, 2: true, 1: true })) }}>Dashboard</button>
                {hasOpenedInspection && <p className="text-3xl">{">"} {selectInspection.name}</p>}
            </span>
            {hasOpenedInspection && <p className="underline cursor-pointer" onClick={() => setHasOpenedInspection(false)}>Back</p>}
        </span>
        <div className="h-bar" />

        {hasOpenedInspection ? <div className={`relative w-full h-full ${!isMapOpened[0] && "overflow-auto"} flex flex-col px-8 `}>

            {!visibleIndex.includes(0) && <p className={`self-center`}>Fetching inspection data...</p>}
            {selectInspection.data.map((r, i) =>
                <div className={`w-full ${!expand[selectInspection.name[selectInspection.name.length - 1]][i] && `max-h-64`} transition-all  backdrop-blur-md basic p-8 my-4 flex justify-center duration-1000 ease-in-out ${visibleIndex.includes(i) ? "opacity-100" : "opacity-0"} `}>

                    <div className="w-1/3 h-full"><img src={r.image} alt={r.coords} className="w-full h-full object-cover rounded-3xl image" /></div>
                    <div className="w-3/4 h-full flex items-center justify-between px-4">
                        <div className="flex flex-col justify-around w-full h-full items-center">
                            <div className="flex w-full gap-5 justify-around">

                                <span className="flex flex-col  items-center">
                                    <p className="text-xs">STATUS</p>
                                    <p className={`text-5xl ${r.status == "SAFE" ? "text-green-500" : "text-orange-500"}`}>{r.status}</p>
                                </span>


                                <span className="flex flex-col items-center">
                                    <p className="text-xs">READING</p>
                                    <p className={`text-xl`}>{r.reading}</p>
                                </span>



                                <span className="flex flex-col gap-5 justify-center">

                                    <span className="flex flex-col  items-center">
                                        <p className="text-xs">REQUIRED READING</p>
                                        <p className={`text-xl`}>{r.req}</p>
                                    </span>
                                    <span className="flex flex-col  items-center">
                                        <p className="text-xs">TIMESTAMP</p>
                                        <p className={`text-xl`}>{r.ts}</p>
                                    </span>
                                </span>
                            </div>
                            <div className="w-full flex flex-col report-text">
                                <p className="text-lg font-bold">REPORT</p>
                                <p>{r.text}
                                </p>
                            </div>
                        </div>
                        <span className="flex flex-col items-center gap-2">
                            <p className="text-xs">CONFIDENCE</p>
                            <ConfidenceMeter value={r.confidence} />
                        </span>
                    </div>
                </div>)
            }
        </div> :
            <div className="w-full h-full overflow-auto flex flex-col px-8 relative">

                {inspections.map(
                    (inspection, i) => <div className="w-full flex justify-between basic p-8 my-4 text-lg ">
                        <div className="flex flex-col justify-between w-1/3 h-full">
                            <span className="text-start flex gap-x-2 items-center "><p className="text-xl font-bold">SESSION ID: </p>{inspection.name}</span>
                            <span className="flex gap-x-2">
                                <p className="text-start font-bold">DATE & TIME:</p>
                                <p> 10.03.2025 || 12:48</p>
                            </span>

                            <button onClick={() => setHasOpenedInspection(true)} className="button bg-white bg-opacity-5">View Details</button>
                        </div>
                        <div className=" h-full flex flex-col justify-around items-end font-bold">
                            <span className="flex items-center gap-2"><p className=" text-green-500">SAFE:</p> {statusCounts[i].SAFE}</span>
                            <span className="flex items-center gap-2"><p className=" text-orange-500">ANOMALY:</p> {statusCounts[i].ANOMALY}</span>
                            <p className="text-start">No. of inspections: 4</p>
                        </div>
                        <div className="w-1/4 h-full pie">
                            <Charts warningCount={statusCounts[i].ANOMALY} safeCount={statusCounts[i].SAFE} />
                        </div>

                    </div>
                )}

            </div>
        }
    </div >
}