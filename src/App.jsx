import { useState } from "react"
import Sidebar from "./Sidebar"
import Dashboard from "./Dashboard"
import { FaAngleDoubleDown, FaAngleDoubleRight } from "react-icons/fa"
import { MdEmail, MdRestartAlt } from "react-icons/md"
import { BsCircleFill } from "react-icons/bs"
export default function App() {
  const [isClicked, setIsClicked] = useState(false)
  const [inspections, setInspections] = useState([
    {
      name: "inspection_00",
      data: [
        {
          status: "ANOMALY",
          image: "image2.jpg",
          coords: { lat: 22, lon: 80 },
          confidence: 87,
          ts: "12:48:55",
          reading: 12.5,
          req: 15.0,
          text: "Reading slightly below normal. Recommend recalibration or check for minor pressure loss."
        },
        {
          status: "SAFE",
          image: "image3.jpg",
          coords: { lat: 22.1231, lon: 80.3396 },
          confidence: 92,
          ts: "12:49:10",
          reading: 7.0,
          req: 7.0,
          text: "Normal reading. No action needed."
        },
        {
          status: "ANOMALY",
          image: "image1.jpg",
          coords: { lat: 19.9998, lon: 79.9991 },
          confidence: 81,
          ts: "12:49:25",
          reading: 0.0,
          req: 5.0,
          text: "Reading dropped to zero. Immediate inspection required for blockage or sensor failure."
        },
        {
          status: "ANOMALY",
          image: "image4.jpg",
          coords: { lat: 22.0101, lon: 80.011 },
          confidence: 96,
          ts: "12:49:40",
          text: "Data incomplete. Verify sensor output and inspect manually.",
          reading: 818,
          req: 800
        }
      ]
    },
    {
      name: "inspection_01",
      data: [
        {
          status: "ANOMALY",
          image: "image4.jpg",
          coords: { lat: 22, lon: 80 },
          confidence: 98,
          ts: "12:48:55",
          reading: 818,
          req: 800,
          text: "Reading above normal range. Check for overpressure or valve misconfiguration."
        },
        {
          status: "SAFE",
          image: "image1.jpg",
          coords: { lat: 22.1231, lon: 80.3396 },
          confidence: 85,
          ts: "12:49:10",
          reading: 0.0,
          req: 0.0,
          text: "Reading is stable. No action required."
        },
        {
          status: "ANOMALY",
          image: "image5.jpg",
          coords: { lat: 19.9998, lon: 79.9991 },
          confidence: 89,
          ts: "12:49:25",
          reading: 0.0,
          req: 20.0,
          text: "Zero reading detected. Likely malfunction or leakage. Immediate maintenance advised."
        },
        {
          status: "SAFE",
          image: "image1.jpg",
          coords: { lat: 22.0101, lon: 80.011 },
          confidence: 94,
          ts: "12:49:40",
          reading: 0.0,
          req: 0.0,
          text: "Expected zero reading. System is stable."
        }
      ]
    },
    {
      name: "inspection_00",
      data: [
        {
          status: "ANOMALY",
          image: "image7.jpg",
          coords: { lat: 20.0123, lon: 79.9810 },
          confidence: 93,
          ts: "12:50:00",
          text: "Detected 1 broken insulator disc; recommend immediate inspection and scheduling of maintenance."
        },
        {
          status: "SAFE",
          image: "image8.jpg",
          coords: { lat: 20.0256, lon: 79.9754 },
          confidence: 90,
          ts: "12:50:12",
          text: "No anomalies found on insulators; system is functioning within safe parameters."
        },
        {
          status: "ANOMALY",
          image: "image9.jpg",
          coords: { lat: 20.0194, lon: 79.9927 },
          confidence: 88,
          ts: "12:50:24",
          text: "Multiple broken insulator discs observed; urgent field repair required to prevent energy discharge risks."
        },
        {
          status: "ANOMALY",
          image: "image10.jpg",
          coords: { lat: 20.0081, lon: 80.0049 },
          confidence: 96,
          ts: "12:50:35",
          text: "Pollution flashover on multiple insulator discs detected; safety protocol check and component testing advised."
        },

      ]

    },
    {
      name: "inspection_01",
      data: [
        {
          status: "ANOMALY",
          image: "image11.jpg",
          coords: { lat: 20.0315, lon: 80.0120 },
          confidence: 85,
          ts: "12:50:47",
          text: "Detected 1 broken insulator disc; recommend immediate inspection and scheduling of maintenance."
        },
        {
          status: "SAFE",
          image: "image12.jpg",
          coords: { lat: 20.0456, lon: 79.9651 },
          confidence: 94,
          ts: "12:50:58",
          text: "Insulator discs appear intact and aligned; no abnormalities detected in this scan."
        },
        {
          status: "ANOMALY",
          image: "image13.jpg",
          coords: { lat: 20.0023, lon: 79.9982 },
          confidence: 89,
          ts: "12:51:10",
          text: "Detected 1 broken insulator disc; recommend immediate inspection and scheduling of maintenance."
        },
        {
          status: "ANOMALY",
          image: "image14.jpg",
          coords: { lat: 20.0178, lon: 80.0105 },
          confidence: 91,
          ts: "12:51:22",
          text: "Detected 2 broken insulator discs; recommend immediate inspection and scheduling of maintenance."
        }
      ]
    }
  ]);


  const [guideDone, setGuideDone] = useState({ 1: false, 2: false, 3: false, 4: false })
  const [hasLoaded, setHasLoaded] = useState(false)
  const [text, setText] = useState(
    ["This is the details of an inspection where you would get information such as the AI curated image, the predicted status of the structure and a generated AI report which qualifies in method of fixes.",
      "Now click on the 'Dashboard' button itself to go back to the Dashboard",
      <>Here, you can find all your inspections. You can select to view which model's inferences you want to see. We have your data arranged. You can dive into details of any sessions performed.  </>,
      "In the future, expect us to come up with a better solution for navigation for quicker responses."
    ]
  )
  console.log(guideDone)

  return <div className="w-screen h-screen overscroll-none relative text-white flex flex-col overflow-hidden">
    <div className="w-full min-h-full bg-white text-black flex justify-center items-center overflow-hidden overscroll-none">
      {!hasLoaded ? <button className="text-5xl" onClick={() => setIsClicked(true)}>Start Demo</button> :
        <div className="w-full h-full flex flex-col justify-center items-center gap-10">
          <span className="text-3xl flex flex-col items-center justify-between h-1/3  border-black">
            <span className="flex items-center h-1/2 gap-2 ">
              <img className="h-full" alt="logo" src="./logo_dark.jpg" />
              <p className="text-5xl font-bold ">AURAA</p>
            </span>
            <span className="h-1/2 w-full flex flex-col items-center justify-end">
              <p className="text-2xl ">Contact Us </p>
              <span className="flex items-center justify-center w-full">
                <a href="mailto:auraatechnologies@gmail.com">
                  <p className="hover:underline">auraatechnologies@gmail.com</p>
                </a>
              </span>
            </span>
          </span>
          <button className="text-2xl bg-black bg-opacity-30 p-4 rounded-3xl flex items-center" onClick={() => window.location.reload()}>
            <p>Reset Demo</p>
            <MdRestartAlt />
          </button>
        </div>
      }
    </div>
    <div className={`w-full min-h-[calc(88%)] rounded-t-3xl bg-zinc-900 transform-gpu transition-transform duration-1000 ${isClicked && "-translate-y-[calc(100%)] flex p-8"} shadow-[0px_-20px_18px_8px_rgba(0,_0,_0,_0.3)] `}>
      <Sidebar isClicked={isClicked} />
      <Dashboard isClicked={isClicked} inspections={inspections} setGuideDone={setGuideDone} setHasLoaded={setHasLoaded} guideDone={guideDone} />
    </div>

    {hasLoaded && isClicked && <div className="absolute px-12 text-base font-sour text-center w-full top-0 left-0 text-black">
      {
        !guideDone[1] ?
          <span className="flex flex-col items-center">
            <p>{text[0]}</p>
            <button className="flex items-center text-lg rounded-full bg-black bg-opacity-30 px-2" onClick={() => setGuideDone(prev => ({ ...prev, 1: true }))}>
              <BsCircleFill />
              <p>Next</p>
              <FaAngleDoubleRight />
            </button>
          </span>
          :
          !guideDone[2] ? <p>{text[1]}</p> :
            !guideDone[3] ?
              <span className="flex flex-col items-center">
                <p>{text[2]}</p>
                <button className="flex items-center text-lg rounded-full bg-black bg-opacity-30 px-2" onClick={() => setGuideDone(prev => ({ ...prev, 3: true }))}>
                  <BsCircleFill />
                  <p>Next</p>
                  <FaAngleDoubleRight />
                </button>
              </span> :
              <span className="flex flex-col items-center">
                <p>{text[3]}</p>
                <button className="flex flex-col justify-center items-center text-lg rounded-full bg-black bg-opacity-30 p-2" onClick={() => setIsClicked(false)}>
                  <BsCircleFill />
                  <p className="text-xs">End</p>
                  <FaAngleDoubleDown />
                </button>
              </span>


      }
    </div>}
  </div>
}