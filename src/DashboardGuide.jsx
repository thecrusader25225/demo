import Joyride, { STATUS } from 'react-joyride';

const steps = [
  {
    target: '.status-badge',
    content: 'This shows the AI-assessed condition of the inspected item.',
  },
  {
    target: '.coordinates',
    content: 'Here are the latitude and longitude coordinates of the inspection',
  },
  {
    target: '.report-text',
    content: 'AI Report provides a detailed summary of the inspection. Click the down arrow to elongate the view.',
  }, {
    target: ".image",
    content: "The AI-curated image of the inspection"
  },
  {
    target: '.map',
    content: 'Clicking on the map makes it appear on a bigger window.'
  },
  {
    target: '.expand',
    content: 'Click on it to expand the card to get full view of the AI report'
  },
  {
    target: '.confidence',
    content: 'COnfidence meter shows the confidence level of the AI model inference'
  }
  // {
  //   target: '.map-all',
  //   content: 'This map contains the locations of all inspections of the session marked with different color labels.'
  // },
  // {
  //   target: '.pie',
  //   content: 'A pie chart for visual representation of statuses of inspections.'
  // }
];

export default function DashboardGuide({ run, onFinish, setGuideDone, guideDone }) {
  function handleCallback(data) {
    const { status } = data
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // setGuideDone(prev => ({ ...prev, 1: true }))
      console.log("setguidedone", guideDone)
    }
  }
  return <Joyride steps={steps} continuous={true} showSkipButton={true} run={run} disableScrolling={true} callback={handleCallback} />;
}
