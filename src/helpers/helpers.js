const getTimeString = (direction, dateObj) => {
	let values = {};
  let difference;
	switch(direction){
  	case "since":
    	difference = new Date().getTime() - dateObj.getTime();
      break;
		case "until":
    	difference = dateObj.getTime() - new Date().getTime();
      break;
    default:
    	return "Unknown date difference"
  }

  if(difference < 0) {
    return "Past due"
  };
  
  values.days = Math.floor(difference / (1000 * 60 * 60 * 24));
  values.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  values.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  values.seconds = Math.floor((difference % (1000 * 60)) / 1000);
	
  let timeArr = [];

  if(values.days !== 0){
    timeArr.push(`${values.days}d`);
    timeArr.push(`${values.hours}h`);
    timeArr.push(`${values.minutes}m`);
    timeArr.push(`${values.seconds}s`);
  }
  else if(values.hours !== 0){
    timeArr.push(`${values.hours}h`);
    timeArr.push(`${values.minutes}m`);
    timeArr.push(`${values.seconds}s`);
  }
  else if(values.minutes !== 0) {
    timeArr.push(`${values.minutes}m`);
    timeArr.push(`${values.seconds}s`);
  }
  else if(values.seconds !== 0) {
  	timeArr.push(`${values.seconds}s`);
  }
  

  return timeArr.join(' ');
};

const combineTasksProjects = (projects, tasks) => {
  const allItems = [];
  tasks.map(task => allItems.push({...task, type: 'task' }));
  projects.map(project => allItems.push({...project, type: 'project' }));
  allItems.sort((a, b) => {
    return new Date(a.date_due) - new Date(b.date_due);
  });
  return allItems;
};

module.exports = {
  getTimeString,
  combineTasksProjects
};