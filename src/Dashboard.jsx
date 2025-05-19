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
    const [selectInspection, setSelectInspection] = useState(inspections[0])
    const [hasOpenedInspection, setHasOpenedInspection] = useState(true)
    const [statusCounts, setStatusCounts] = useState([])
    const [expand, setExpand] = useState([[false, false, false, false], [false, false, false, false]])
    const [runTour, setRunTour] = useState(false);
    const [selectedValue, setSelectedValue] = useState("grm");
    const [isMapOpened, setIsMapOpened] = useState(false)

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
            <span>
                {!hasOpenedInspection && <select id="dropdown" value={selectedValue} onChange={e => { setSelectedValue(e.target.value); setSelectInspection(inspections[i]) }} className="bg-black bg-opacity-30 rounded-xl cursor-pointer px-4 py-2">
                    <option value="grm" className="bg-zinc-900 cursor-pointer">Gauge Reading Model</option>
                    <option value="ifd" className="bg-zinc-900 cursor-pointer">Insulator Fault Detection Model</option>
                </select>}
            </span>
            {hasOpenedInspection && <p className="underline cursor-pointer" onClick={() => setHasOpenedInspection(false)}>Back</p>}
        </span>
        <div className="h-bar" />
        {selectedValue == "grm" ? <span className="w-full h-full flex flex-col">

            {hasOpenedInspection ? <div className={`relative w-full h-full overflow-auto flex flex-col px-8 `}>

                {!visibleIndex.includes(0) && <p className={`self-center`}>Fetching inspection data...</p>}
                {selectInspection.data.map((r, i) =>
                    <div className={`w-full ${!expand[selectInspection.name[selectInspection.name.length - 1]][i] && `max-h-64`} transition-all  backdrop-blur-md basic p-8 my-4 flex justify-center duration-1000 ease-in-out ${visibleIndex.includes(i) ? "opacity-100" : "opacity-0"} `}>

                        <div className="w-1/3 h-full"><img src={r.image} alt={r.coords} className="w-full h-full object-cover rounded-3xl image" /></div>
                        <div className="w-3/4 h-full flex items-center justify-between px-4">
                            <div className="flex flex-col justify-around w-full h-full items-center">
                                <div className="flex w-full gap-5 justify-around">

                                    <span className="flex flex-col  items-center status-badge">
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
                            <span className="flex flex-col items-center gap-2 confidence">
                                <p className="text-xs">CONFIDENCE</p>
                                <ConfidenceMeter value={r.confidence} />
                            </span>
                        </div>
                    </div>)
                }
            </div> :
                <div className="w-full h-full overflow-auto flex flex-col px-8 relative">

                    {inspections.map(
                        (inspection, i) => i < 2 && <div className="w-full flex justify-between basic p-8 my-4 text-lg ">
                            <div className="flex flex-col justify-between w-1/3 h-full">
                                <span className="text-start flex gap-x-2 items-center "><p className="text-xl font-bold">SESSION ID: </p>{inspection.name}</span>
                                <span className="flex gap-x-2">
                                    <p className="text-start font-bold">DATE & TIME:</p>
                                    <p> 10.03.2025 || 12:48</p>
                                </span>

                                <button onClick={() => { setHasOpenedInspection(true); setSelectInspection(inspections[i]) }} className="button bg-white bg-opacity-5">View Details</button>
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
        </span> ://///////////////////////////////////////IFD////////////////////////////////////////////////
            hasOpenedInspection ? <div className={`relative w-full h-full ${!isMapOpened[0] && "overflow-auto"} flex flex-col px-8 `}>
                {
                    isMapOpened[0] && <div className="absolute w-full h-full top-0 left-0 ">
                        <div className="w-full h-[calc(85%)] relative z-10">
                            <MiniMap locations={[{ lat: isMapOpened[1], lon: isMapOpened[2], status: isMapOpened[3] }]} />
                        </div>
                        <button className="absolute z-50 top-0 right-0 text-black" onClick={() => setIsMapOpened([false, 0, 0])}>
                            <CgClose className="text-5xl bg-black rounded-full p-4 bg-opacity-30" />
                        </button>
                    </div>
                }
                {!visibleIndex.includes(0) && <p className={`self-center`}>Fetching inspection data...</p>}
                {selectInspection.data.map((r, i) =>
                    <div className={`w-full ${!expand[selectInspection.name[selectInspection.name.length - 1]][i] && `max-h-64`} transition-all  backdrop-blur-md basic p-8 my-4 flex flex-col justify-center duration-1000 ease-in-out ${visibleIndex.includes(i) ? "opacity-100" : "opacity-0"} `}>
                        <div className="w-full h-5/6 flex items-center">
                            <div className="w-1/4 h-full"><img src={r.image} alt={r.coords} className="w-full h-full object-cover rounded-3xl image" /></div>
                            <div className="w-3/4 h-full flex flex-col  justify-between px-4">
                                <div className="flex justify-around w-full h-full items-center">
                                    <span className="flex flex-col h-full gap-5 justify-center">
                                        <span className="flex flex-col status-badge">
                                            <p className="text-xs">STATUS</p>
                                            <p className={`text-5xl ${r.status == "ANOMALY" ? "text-orange-500" : "text-green-500"}`}>{r.status}</p>
                                        </span>
                                        <span className="flex flex-col coordinates">
                                            <p className="text-xs">COORDINATES</p>
                                            <p className={`text-3xl`}>{r.coords.lat} , {r.coords.lon}</p>
                                        </span>
                                    </span>
                                    <span className="flex flex-col items-center gap-2 confidence">
                                        <p className="text-xs">CONFIDENCE</p>
                                        <ConfidenceMeter value={r.confidence} />
                                    </span>
                                    <div className="w-1/3 h-full map" onClick={() => setIsMapOpened([true, r.coords.lat, r.coords.lon, r.status])}>
                                        <MiniMap locations={[{ lat: r.coords.lat, lon: r.coords.lon, status: r.status }]} />
                                    </div>
                                    <button className=" bg-white bg-opacity-10 rounded-full p-2 expand" onClick={() => updateExpand(i, selectInspection.name)}>
                                        {expand[selectInspection.name[selectInspection.name.length - 1]][i] ? <BsArrowUp /> : <BsArrowDown />}
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="w-full flex flex-col report-text">
                            <p className="text-lg font-bold">REPORT</p>
                            <p>{r.text}</p>
                        </div>

                    </div>)
                }
            </div> :
                <div className="w-full h-full overflow-auto flex flex-col px-8 relative">
                    {
                        isMapOpened[0] && <div className="absolute w-full h-full bottom-0 left-0 ">
                            <div className="w-full h-[calc(95%)] relative z-40 bottom-0">
                                <MiniMap locations={[{ lat: 20.0123, lon: 79.9810, status: "ANOMALY" },
                                { lat: 20.0256, lon: 79.9754, status: "SAFE" },
                                { lat: 20.0194, lon: 79.9927, status: "ANOMALY" },
                                { lat: 20.0081, lon: 80.0049, status: "ANOMALY" }]} />
                            </div>
                            <button className="absolute z-50 top-0 right-0 text-black" onClick={() => setIsMapOpened([false, 0, 0])}>
                                <CgClose className="text-5xl bg-black rounded-full p-4 bg-opacity-30" />
                            </button>
                        </div>
                    }
                    {inspections.map(
                        (inspection, i) => i > 1 && <div className="w-full flex justify-between basic p-8 my-4 text-lg ">
                            <div className="flex flex-col justify-between w-1/3 h-full">
                                <span className="text-start flex gap-2"><p className="text-xl font-bold">Session name/id: </p>{inspection.name}</span>
                                <p className="text-start">Date & Time: 10.03.2025 || 10:40</p>
                                <p className="text-start">No. of inspections: 4</p>
                                <button onClick={() => { setHasOpenedInspection(true); setSelectInspection(inspections[i]) }} className="button bg-white bg-opacity-5">View Details</button>
                            </div>
                            <div className=" h-full flex flex-col items-end">
                                <span className="flex items-center gap-2"><p className=" text-green-500">SAFE:</p> {statusCounts[i].SAFE}</span>
                                <span className="flex items-center gap-2"><p className=" text-orange-500">ANOMALY:</p> {statusCounts[i].ANOMALY}</span>

                            </div>
                            <div className="w-1/4 h-full pie">
                                <Charts warningCount={statusCounts[i].ANOMALY} safeCount={statusCounts[i].SAFE} />
                            </div>
                            <div className="w-1/3 h-full z-0 map-all" onClick={() => setIsMapOpened([true, 0, 0])}>
                                <MiniMap locations={[{ lat: 20.0123, lon: 79.9810, status: "ANOMALY" },
                                { lat: 20.0256, lon: 79.9754, status: "SAFE" },
                                { lat: 20.0194, lon: 79.9927, status: "ANOMALY" },
                                { lat: 20.0081, lon: 80.0049, status: "ANOMALY" }]} />
                            </div>
                        </div>
                    )}

                </div>


        }
    </div >
}