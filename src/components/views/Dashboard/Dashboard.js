import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';
import { ItemsContext } from 'contexts/ItemsContext';

import Timer from 'components/widgets/Timer/Timer';
import HydrationGauge from 'components/widgets/HydrationGauge/HydrationGauge';

import './Dashboard.scss';

import { getTimeString, combineTasksProjects } from 'helpers/helpers';

const Dashboard = () => {

  let userContext = useContext(UserContext);
  let itemsContext = useContext(ItemsContext);

  let [items, setItems] = useState([]);

  const history = useHistory();

  useEffect(() => {

    let combinedItems = combineTasksProjects(
      itemsContext.state.projects,
      itemsContext.state.tasks
    );

    setItems(
      combinedItems.map((item => {
        return { ...item, date_due_string: getTimeString("until", new Date(item.date_due)) }
      }))
    );

    let timer = null;
    timer = setInterval(() => {
      setItems(
        combinedItems.map((item => {
          return { ...item, date_due_string: getTimeString("until", new Date(item.date_due)) }
        }))
      );
    }, 1000);
    
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsContext.state.fetched]);

  return (
    <div className="Main Dashboard">
      <h2>{userContext.state.nickname}'s Dashboard</h2>
      <Timer />
      {userContext.state.hydration
        ? <HydrationGauge percent={25}/>
        : ''
      }
      <div className="Upcoming_wrapper">
        <h2>Upcoming</h2>
        <div className="Upcoming">
          { items
            .map((item) => {
              return (
                <div 
                  className={`Upcoming-item ${item.date_due_string === 'Past due' ? 'past-due' : ''}`} 
                  key={`${item.id}-${item.type}`}
                  onClick={() => {
                    history.push(`/${item.type}s/${item.id}`)
                  }}
                >
                  <div className="Upcoming-summary">
                    <span className="Upcoming-title">{item.title}</span>
                    <span className="Upcoming-type">{item.type}</span>
                  </div>
                  <div className="Upcoming-details">
                    <p 
                      className={`Upcoming-due ${item.date_due_string === 'Past due' ? 'past-due' : ''}`}
                    >
                      {item.date_due_string}</p>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
    
  );

};

export default Dashboard;