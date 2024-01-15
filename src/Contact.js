import React, { useContext } from 'react';
import { DataContext } from './DataProvider';
import "./Basket.css"
import "./TrackOrder.css"

export const generateTimeList = (timeList) => {
  return Object.keys(timeList).map((districtKey, index) => {
    const districtItem = timeList[districtKey];
    let info;

    if (districtItem.Info) {
      info = districtItem.Info;
    } else {
      const keys = Object.keys(districtItem);
      if (keys.length > 0) {
        const firstItemId = keys[0];
        info = districtItem[firstItemId];
      }
    }

    if (info) {
      const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
      };

      return {
        district: info.district,
        startTime: formatTime(info.start),
        endTime: formatTime(info.close),
      };
    }
    return null;
  }).filter(item => item !== null);
};

const Contact = () =>{
  const {timeList} = useContext(DataContext);
  const timeListResult = timeList ? generateTimeList(timeList) : [];

  return(
    <div>
      <div className='fullBasket'>
        <h4 className='basketTitle'>Lista naszych lokali i godziny otwarcia:</h4>
        <div className='basketText'>
        {timeListResult.map((item, index) => (
            <div className='times' key={index}>
              <span>{item.district}: {item.startTime} - {item.endTime}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;

