// Helper functions

// Converts a javascript date object into a human readable time of "until" or "since"
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

// Takes an array of items and adds a date_due_string to them
const updateTimeStrings = (items) => {
  return items.map(item => {
    return {
      ...item,
      date_due_string: getTimeString("until", new Date(item.date_due))
    }
  });
};

// Adds properties we'll need that the API doesn't serve
const addAdditionalProperties = (projects, tasks) => {

  // Adds type of projects, how many tasks exist for the project, and the tasks for the project to the projects array
  let projectsModifier = projects.map(cur => {

    return {
        ...cur,
        date_due_string: getTimeString("until", new Date(cur.date_due)),
        tasks: tasks.filter(task => {
          return task.project_id === cur.id;
        }),
        task_count: tasks.filter(task => {
          return task.project_id === cur.id;
        }).length,
        type: 'projects'
      }

  });

  // Adds a type of tasks and the project's name to the tasks array
  let tasksModifier = tasks.map(cur => {

    return  {
        ...cur,
        date_due_string: getTimeString("until", new Date(cur.date_due)),
        project_name: cur.project_id
          ? projects.find(p => p.id === cur.project_id).title
          : null,
        type: 'tasks'
      }

  });

  // Sorts the combination of projects and tasks for the dashboard view by when they're due
  let allModifier = projectsModifier.concat(tasksModifier)
    .sort((a, b) => {
      return new Date(a.date_due) - new Date(b.date_due);
    });

  return {
    projects: projectsModifier,
    tasks: tasksModifier,
    all: allModifier
  }
};

export {
  getTimeString,
  updateTimeStrings,
  addAdditionalProperties
};