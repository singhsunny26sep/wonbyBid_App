// import React, { useEffect, useState } from 'react';
// import { differenceInSeconds } from 'date-fns';
// import { Text } from '@gluestack-ui/themed';

// interface GameTimerProps {
//   endTime: string; // ISO string for the end time
//   color: string
// }

// const GameTimer: React.FC<GameTimerProps> = ({ endTime, color }) => {
//   const [timeLeft, setTimeLeft] = useState<string>('00:00:00');

//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const now = new Date();
//       const end = new Date(endTime);
//       const totalSeconds = differenceInSeconds(end, now);

//       if (totalSeconds > 0) {
//         const hours = Math.floor(totalSeconds / 3600);
//         const minutes = Math.floor((totalSeconds % 3600) / 60);
//         const seconds = totalSeconds % 60;

//         // Format time
//         if (hours > 0) {
//           setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
//         } else {
//           setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
//         }
//       } else {
//         setTimeLeft('00:00'); // Game has ended
//       }
//     };

//     calculateTimeLeft(); // Initial calculation
//     const interval = setInterval(calculateTimeLeft, 1000); // Update every second

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [endTime]);

//   // return <Text style={{ ...style }}>{timeLeft} left to end this game</Text>;
//   return <Text fontFamily={'$robotoBold'} fontSize={24} lineHeight={26} color={color} numberOfLines={1} textAlign='center'>{timeLeft}</Text>;
// };

// export default GameTimer;
import React, { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NavigationString } from '../navigation/navigationStrings';

interface GameTimerProps {
  endTime: string; // ISO string for the end time
  color: string;
  contestId: string;  // Extra data to pass
  slotId: string; // Extra data to pass
  onRoomLeft:()=>void
}

const GameTimer: React.FC<GameTimerProps> = ({ endTime, color, contestId, slotId,onRoomLeft }) => {
  const [timeLeft, setTimeLeft] = useState<string>('00:00');
  const navigation = useNavigation<any>(); // Navigation hookconsole.log(contestId, slotId)


  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(endTime);
      const totalSeconds = differenceInSeconds(end, now);

      if ((typeof totalSeconds === "number" && (!isNaN(totalSeconds)) && totalSeconds <= 0) &&endTime&& contestId) {
        setTimeLeft('00:00'); // Ensure final state update
        

           navigation.navigate(NavigationString.ViewHomeContest,{
                  flexible:true,
                  cardFrom:"wining",
                  slotId,
                  isUserJoinContest:true,
                  contestId,
                  isDeclare:true
                 })
           if(onRoomLeft){
            onRoomLeft()
           }      
        return;
      }
      
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      let formattedTime = '';

      if (hours > 0) {
        formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`;
      }

      setTimeLeft(formattedTime);
    };

    calculateTimeLeft(); // Initial calculation

    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [endTime, navigation]);

  return (
    <Text 
      fontFamily={'$robotoBold'} 
      fontSize={24} 
      lineHeight={26} 
      color={color} 
      numberOfLines={1} 
      textAlign='center'
    >
      {timeLeft}
    </Text>
  );
};

export default GameTimer;
