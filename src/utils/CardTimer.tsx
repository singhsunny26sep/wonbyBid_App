import React, { useEffect, useState } from 'react';
import { differenceInSeconds, formatDate } from 'date-fns';
import { Text } from '@gluestack-ui/themed';

interface GameTimerProps {
  endTime: string; // ISO string for the end time
  color: string;
  startTime: string;
}

const CardTimer: React.FC<GameTimerProps> = ({ endTime, color, startTime }) => {
  // console.log("endTime: ", endTime);
  // console.log("startTime: ", startTime);

  // console.log("endTime: ", formatDate(endTime, "MM:HH dd/mm/yy"));
  
  const [timeLeft, setTimeLeft] = useState<string>('00:00:00');
  const [calculatedTime, setCalculatedTime] = useState<string>()
  const [isGreater, setIsGreater] = useState<boolean>(false)

  useEffect(() => {
    const calculatedTime = () => {
      const now = new Date();
      const end = new Date(endTime);
      const categoryTime = new Date(startTime)
      // const totalSeconds = differenceInSeconds(end, now);
      const categoryDefTime = differenceInSeconds(end, categoryTime);

      // console.log("categoryDefTime :", categoryDefTime);
      // console.log("totalSeconds :", totalSeconds);


      if (categoryDefTime > 0) {
        const hours = Math.floor(categoryDefTime / 3600);
        const minutes = Math.floor((categoryDefTime % 3600) / 60);
        const seconds = categoryDefTime % 60;
        // Format time
        if (hours > 0) {
          setCalculatedTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          setCalculatedTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
      } else {
        setCalculatedTime('00:00'); // Game has ended
      }
    };

    calculatedTime(); // Initial calculation
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(endTime);
      const categoryTime = new Date(startTime)
      const totalSeconds = differenceInSeconds(end, now);
      const categoryDefTime = differenceInSeconds(end, categoryTime);

      // console.log("categoryDefTime :", categoryDefTime);
      // console.log("totalSeconds :", totalSeconds);

      if (categoryDefTime < totalSeconds) {
        setIsGreater(true)
      } else {
        setIsGreater(false)
      }

      if (totalSeconds > 0) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        // Format time
        if (hours > 0) {
          setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
      } else {
        setTimeLeft('00:00'); // Game has ended
      }
    };

    calculateTimeLeft(); // Initial calculation
    const interval = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [endTime]);

  /* 
  <>
        {endTime && startTime ? <>{isGreater ? calculatedTime : timeLeft}</> : <>{timeLeft}</>}
      </>
  */
  return (
    <Text lineHeight={26} color={color} numberOfLines={1} textAlign="center">
      {isGreater ? calculatedTime : timeLeft}
    </Text>
  );
};

export default CardTimer;
